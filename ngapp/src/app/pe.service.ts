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

  constructor(
    private http: HttpClient
  ) { }

  getData() {
    return this.resultSubject;
  }

  getValidationResult() {
    return this.validationSubject;
  }

  validate(req) {
    let url = 'https://product-engine-nodejs.apps.ext.eas.pcf.manulife.com/api/v1/product/validate';

    this.http
      .post(url, req)
      .first()
      .subscribe(r =>
        {
          this.validationSubject.next(r);
        }
      );

  }

  private callPE() {
    let url = 'https://product-engine-nodejs.apps.ext.eas.pcf.manulife.com/api/v1/product/project';
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

}
