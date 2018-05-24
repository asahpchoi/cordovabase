import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  users : any;
  arr;
  char;
  selected;
  
  constructor(private http: HttpClient) { }

  userFilterd() {
    if(!this.users) return;
    return this.users.filter(d => {
      if(this.char) {            
        return d.name.first.substring(0, 1).toUpperCase() == this.char;
      }
      else {
        return true;
      }
    }
    )
  }

  ngOnInit() {
    this.http.get('https://randomuser.me/api/?results=100').subscribe(
      d => {
        let t:any = d;
        this.users =        _.sortBy(
          t.results, 'name.first'
        );
      }
    );
    this.arr = Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i));


  }
}
