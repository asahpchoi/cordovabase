import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PeService {
  resultSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  validationSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  premiumSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  request = null;
  premiumCalRequest = null;
  productType = null;
  riders = [];
  endpoint = 'https://product-engine-service.apps.ext.eas.pcf.manulife.com';
  //endpoint = 'https://product-engine-nodejs.apps.ext.eas.pcf.manulife.com/api/v1';
  //endpoint = 'https://pe-nodejs-dev.apps.ext.eas.pcf.manulife.com/api/v1';


  calculateRiderFaceAmountRange(
    basePlanID,
    riderID,
    basePlanFaceAmount,
    basePlanInsuredAge,
    riderInsuredAge
  ) {
    return {
      min: 100000,
      max: Math.min(...[basePlanFaceAmount * 5, 10000000])
    }
    //100M
    //10B

  }

  //mock services
  getDurationRange(
    basePlanID,
    insuredAge
  ) {
    let limit = 99;

    return {
      min: 4,
      max: +limit - +insuredAge
    }
  }

  //mock services
  calculateTermRiderFaceAmount(insuredAge, bpFaceAmount) {
    let url = this.endpoint + '/product/functions/CalculateFaceAmountRange';

    let payload = {
      "productId": "TRI07", 
      "associateProductId": "UL007",
      "location": "Vietnam",
      "channel": "Agency",
      "insuredAge" : insuredAge,
      "currencyId": "VND",
      "bpFaceAmount": bpFaceAmount
    }

    console.log(payload)
    return this.http
      .post(url, payload)
      .first();
  }
  calculateFaceAmountRange(plannedPremium, insuredAge, paymentMode) {
    let url = this.endpoint + '/product/functions/CalculateFaceAmountRange';

    let payload = {
      "productId": "UL007",
      "location": "Vietnam",
      "channel": "Agency",
      "insuredAge": insuredAge,
      "plannedPremium": plannedPremium,
      "paymentMode": paymentMode,
      "extraRating": null,
      "currencyId": "VND"
    }
    return this.http
      .post(url, payload)
      .first();
  }

  calculatePlannedPremiumRange007(faceAmount, insuredAge, paymentMode) {
    let url = this.endpoint + '/product/functions/CalculatePlannedPremiumRangeUL007';

    let payload = {
      "productId": "UL007",
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
      .first();
  }

  getRequestCopy() {
    return JSON.parse(JSON.stringify(this.request));
  }

  constructor(
    private http: HttpClient
  ) { }

  getData() {
    return this.resultSubject;
  }

  getValidationResult() {
    return this.validationSubject;
  }

  updateFundActivities(acts) {
    let initialSetting = this.request.fundActivities.fundActivity.filter(
      fa => (fa["regularPayment"]) || (fa["regularPayment"] == 0)
    );
    this.request.fundActivities.fundActivity = [...initialSetting, ...acts];
  }

  getFundActivities() {
    return JSON.parse(JSON.stringify(this.request.fundActivities.fundActivity));
  }

  validate(req) {    
    if(req) this.premiumCalRequest = req;
    this.makeValidationRequest(req).subscribe(r => { this.validationSubject.next(r); });
  }

  private makeValidationRequest(req) {
    let url = this.endpoint + '/product/validate';
    let reqCopy = JSON.parse(JSON.stringify(req));

    if(this.riders.length > 0) {
      
      reqCopy.riders.coverageInfo = [...reqCopy.riders.coverageInfo, ...this.riders]
      console.log('add Rider', reqCopy, this.riders)
    }


    return this.http
      .post(url, reqCopy)
      .first();        
  }

  updateRiders(riders) {
    this.riders = riders;
  }

  callPE() {
    let url = this.endpoint + '/product/project';
    let reqCopy = JSON.parse(JSON.stringify(this.request));


    if(this.riders.length > 0) {      
      reqCopy.riders.coverageInfo = [...reqCopy.riders.coverageInfo, ...this.riders]
      console.log('add Rider', reqCopy, this.riders)
    }

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

          this.resultSubject.next(
            {
              labels: rs.filter(x => x.label == 'Year')[0].data.map(
                (year, index) => {
                  return year + '/' + rs.filter(x => x.label == 'Age')[0].data[index];
                }
              ),
              dataSets: rs,
              validationResult: x['projections'][0].validationResult
            }
          )
        }
      );
  }

  calculate(req, productType) {
    this.request = req;
    this.productType = productType;

    this.makeValidationRequest(req).first().subscribe(
      r => {
        let result : any = r;
        if (result && result.length == 0) {          
          this.callPE();
        }        
        this.validationSubject.next(r);        
      }
    );

  }

  premiumCalculation(req?) {
    let url = this.endpoint + '/product/calculatePremiums';
    if(req) this.premiumCalRequest = req;
    if(!req) req = this.premiumCalRequest;
    

    let reqCopy = JSON.parse(JSON.stringify(req));

    if(this.riders.length > 0) {      
      reqCopy.riders.coverageInfo = [...reqCopy.riders.coverageInfo, ...this.riders]
      console.log('add Rider', reqCopy, this.riders)
    }    
    return this.http
      .post(url, reqCopy)
      .first()
      .subscribe(
        x=>this.premiumSubject.next(x)
      );
  }
}
