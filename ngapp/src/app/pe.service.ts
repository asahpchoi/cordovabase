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
  request = null;
  productType = null;
  endpoint = 'https://product-engine-service.apps.ext.eas.pcf.manulife.com';

  calculateFaceAmountRange007(plannedPremium, insuredAge, paymentMode) {
    let url = this.endpoint + '/product/functions/CalculateFaceAmountRangeUL007';

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

    console.log(this.request);
    //keep initial regular Payment and term settings
    let initialSetting = this.request.fundActivities.fundActivity.filter(
      fa => (fa["regularPayment"]) || (fa["regularPayment"] == 0)
    );
    console.log(initialSetting);
    this.request.fundActivities.fundActivity = [...initialSetting, ...acts];



    //this.request.fundActivities = acts;
    //this.adhocFundActivities = acts;
  }

  getFundActivities() {
    return JSON.parse(JSON.stringify(this.request.fundActivities.fundActivity));
  }

  validate(req) {
    let url = this.endpoint + '/product/validate';

    this.http
      .post(url, req)
      .first()
      .subscribe(r => {
        this.validationSubject.next(r);
      }
      );

  }

  callPE() {
    let url = this.endpoint + '/product/project';

    this.http
      .post(url, this.request)
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
    this.callPE();
  }

  premiumCalculation(req) {
    let url = this.endpoint + '/product/calculatePremiums';
    return this.http
      .post(url, req)
      .first();
  }
}
