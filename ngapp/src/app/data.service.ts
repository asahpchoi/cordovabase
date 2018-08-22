import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PromiseObservable } from 'rxjs/observable/PromiseObservable';
import { resolve } from 'dns';

@Injectable()
export class DataService {

  cache = [];

  constructor(private http: HttpClient) {


  }

  async loadData(type) {
    return new Promise(
      resolve => {

        this.http.get('assets/' + type + '.json').subscribe(
          x => {
            this.cache.push(
              {
                type: type,
                data: this.transform(type, x)
              }
            )
            resolve(true);
          }
        )
      }
    )
  }

  transform(type, data) {
    //debugger
    switch (type) {
      case 'occupation': {
        return Object.keys(data).map(
          key => {
            return {
              code: key,
              name: data[key]
            }
          }
        )
      }
      default: return data;
    }
  }

  getData(type) {
    let c = this.cache.find(x => x.type == type);
    return c ? c.data : null;
  }

  getValue(key, type) {
    let d = this.getData(type);
    if (!d) return;

    let item = d.find(x => x.code == key);
    return item ? item.name : null;
  }


}
