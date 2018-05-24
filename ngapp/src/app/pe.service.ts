import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/observable/from';

import 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

@Injectable()
export class PeService {
  resultSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  validationSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  premiumSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  projectionRequest = null;
  premiumCalRequest = null;
  validationRequest = null;
  productType = null;
  riders = [];
  proposals = [];
  t0 = performance.now();
  t1 = performance.now();

  endpoint = 'https://product-engine-service.apps.ext.eas.pcf.manulife.com';
  //endpoint = 'https://product-engine-nodejs.apps.ext.eas.pcf.manulife.com/api/v1';
  //endpoint = 'https://pe-nodejs-dev.apps.ext.eas.pcf.manulife.com/api/v1';
 
  //mock services
  getDurationRange(
    basePlanID,
    insuredAge
  ): any {
    let limit = 99;

    return {
      min: 4,
      max: +limit - +insuredAge
    }
  }


  calculateRiderFaceAmount(insuredAge, bpFaceAmount, termRiderId, productId): Observable<any> {
    let url = this.endpoint + '/product/functions/CalculateFaceAmountRange';

    let payload = {
      "productId": termRiderId,//"TRI07",
      "associateProductId": productId,//"UL007",
      "location": "Vietnam",
      "channel": "Agency",
      "insuredAge": insuredAge,
      "currencyId": "VND",
      "bpFaceAmount": bpFaceAmount
    }
    
    return this.http
      .post(url, payload)
      .first();
  }


  calculateFaceAmountRange(plannedPremium, insuredAge, paymentMode, productId): Observable<any> {
    let url = this.endpoint + '/product/functions/CalculateFaceAmountRange';

    let payload = {
      "productId": productId,//"UL007",
      "location": "Vietnam",
      "channel": "Agency",
      "insuredAge": insuredAge,
      "plannedPremium": +plannedPremium,
      "paymentMode": paymentMode,
      "extraRating": null,
      "currencyId": "VND"
    }
    return this.http
      .post(url, payload)
      .first();
  }

  calculatePlannedPremiumRange(faceAmount, insuredAge, paymentMode, productId): Observable<any> {
    console.log('CP', paymentMode)
    let url = this.endpoint + '/product/functions/CalculatePlannedPremiumRangeUL007';

    let payload = {
      "productId": productId,//"UL007",
      "location": "Vietnam",
      "channel": "Agency",
      "insuredAge": insuredAge,
      "faceAmount": faceAmount,
      "paymentMode": paymentMode,
      "extraRating": null,
      "currencyId": "VND"
    }
    return this.http
      .post(url, payload)
      .do(x=>{
        console.log('CPResult', x)
      })
      .first();
  }

  getRequestCopy(): any {
    return JSON.parse(JSON.stringify(this.projectionRequest));
  }

  constructor(
    private http: HttpClient
  ) { }

  getData(): BehaviorSubject<any> {
    return this.resultSubject;
  }

  getValidationResult(): BehaviorSubject<any> {
    return this.validationSubject;
  }

  private getFundActs() {

  }

  updateFundActivities(acts, req:any): void {
 
    let initialSetting = req.fundActivities.fundActivity.filter(
      fa => (fa["regularPayment"]) || (fa["regularPayment"] == 0)
    );

    let tempfunds : any = [...initialSetting, ...acts];
    let key: any = tempfunds.map(x => x.attainAge).filter((v, i, a) => a.indexOf(v) === i); 
    let results = [];
    key.forEach(
      k => {
        let objs : any = tempfunds.filter(x=> x.attainAge == k);
        let result = {};
        objs.forEach(
          o => {
            result = Object.assign(result, o)
          }
        )
        results.push(result);
      }
    ) 
    req.fundActivities.fundActivity = _.sortBy(results,"attainAge");
  }

  getFundActivities(): any {
    return JSON.parse(JSON.stringify(this.projectionRequest.fundActivities.fundActivity));
  }

  validate(req?): void {    
    if (req) this.validationRequest = req;
    console.log('V', this.validationRequest)
    if(!this.validationRequest) return;
    this.validationSubject.next(null);

    this.makeValidationRequest(this.validationRequest).subscribe(r => { this.validationSubject.next(r); });

  }

  private makeValidationRequest(req): Observable<any> {
    let url = this.endpoint + '/product/validate';
    if (!req) return Observable.from(null);
    let reqCopy = JSON.parse(JSON.stringify(req));


    if (this.riders.length > 0) {
      reqCopy.riders.coverageInfo = [...reqCopy.riders.coverageInfo, ...this.riders]
      console.log('add Rider', reqCopy, this.riders)
    }

    console.log('Validation:',  reqCopy)
    return this.http
      .post(url, reqCopy)
      .first();
  }

  updateRiders(riders): void {
    this.riders = riders;
  }

  callPEProjection(): void {
    let url = this.endpoint + '/product/project';
    let reqCopy = JSON.parse(JSON.stringify(this.projectionRequest));
    if (!reqCopy) return null;


    if (this.riders.length > 0) {
      reqCopy.riders.coverageInfo = [...reqCopy.riders.coverageInfo, ...this.riders]
      console.log('add Rider', reqCopy, this.riders)
    }
    console.log('callPE', url, reqCopy)
    this.http
      .post(url, reqCopy)
      .subscribe(
        x => {
          console.log(x)
          let rs = x['projections'][0]['columns'].map(
            c => {
              return {
                label: c['Name'],
                data: c['Values'].map(
                  d => d.value
                )
              }
            }
          );

          let projectionResult = 
          {
            labels: rs.filter(x => x.label == 'columnYear')[0].data.map(
              (year, index) => {
                return year + '/' + rs.filter(x => x.label == 'columnAge')[0].data[index];
              }
            ),
            dataSets: rs,
            validationResult: x['projections'][0].validationResult
          };

          this.proposals.push(projectionResult);

          this.resultSubject.next(
            projectionResult
          )
        }
      );
  }

  calculate(req, productType): void {
    if (!req) return null;

    this.projectionRequest = req;
    this.productType = productType;

    this.makeValidationRequest(req).first().subscribe(
      r => {
        let result: any = r;
        if (result && result.length == 0) {
          this.callPEProjection();
        }
        this.validationSubject.next(r);
      }
    );

  }

  premiumCalculation(req?): void {
    let url = this.endpoint + '/product/calculatePremiums';
    if (req) this.premiumCalRequest = req;
    if (!req) req = this.premiumCalRequest;

    if (!req) return null;


    let reqCopy = JSON.parse(JSON.stringify(req));

    if (this.riders.length > 0) {
      reqCopy.riders.coverageInfo = [...reqCopy.riders.coverageInfo, ...this.riders]
      console.log('add Rider', reqCopy, this.riders)
    }
    this.http
      .post(url, reqCopy)
      .first()
      .subscribe(
        x => this.premiumSubject.next(x)
      );
  }
}
