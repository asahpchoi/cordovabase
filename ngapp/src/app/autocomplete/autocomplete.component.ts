import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {
  items = [];
  searchText;
  selectItem;
  selectItems = [];
  searchingOccupation = false;
  labels;
  fullList;
  searching = false;

  onEnter(e) {
    console.log(e)
  }
  sel = {
    searchText: ''
  };

  addressmaster = {};

  getMatchItems() {
   if(!this.fullList || this.sel.searchText == '') return;
 
    return this.fullList.filter(
      x => x.display.toLowerCase().includes(this.sel["searchText"].toLowerCase())
    ).filter((x,i) => i<10)
  }

  getPDisplay(code) {
    return this.addressmaster["provinces"].find(
      x => x.value == code
    ).display
  }

  getDDisplay(code, provinceId) {
    return this.addressmaster["districts"].find(
      x => x.value == code && provinceId == x.provinceId
    ).display
  }

  getdistricts() {
    if(!this.addressmaster["districts"]) return;
    return this.addressmaster["districts"].filter(
      x => x.provinceId == this.sel["p"]
    );

  }


  getwards() {
    if(!this.addressmaster["wards"]) return;
    return this.addressmaster["wards"].filter(
      x => x.provinceId == this.sel["p"] && x.districtId == this.sel["d"]
    );
  }
  delete(i) {
    let idx = this.selectItems.indexOf(i);
    this.selectItems.splice(idx, 1);
  }
  pick(i) {

    this.selectItems.push(i);
    this.searchingOccupation = false;

  }

  searchOccupation(e) {
    console.log(e)
    if(e.screenX == 0) return;
    this.selectItem = null;
    this.searchText = "";
    this.searchingOccupation = true;
    setTimeout(
      () => {
        document.getElementById('searchText').focus();
      }, 100, true
    )
  }

  constructor(private http: HttpClient) {

  }

  loaditems() {
    if(!this.labels) return;
    return Object.keys(this.labels)
      .filter(x => !this.selectItems.includes(x)
      )
      .filter(x => this.labels[x].toLowerCase().includes(this.searchText.toLowerCase()))
      .filter(
        (x, i) => i < 5
      )
  }

  ngOnInit() {
    this.load();
  }

  load() {
    console.log('start app')
    this.http.get('assets/address.json').subscribe(
      d => {
        console.log(d)
        this.addressmaster = d;
        this.fullList = [...this.addressmaster["provinces"], ...this.addressmaster["districts"], ...this.addressmaster["wards"]];
      }
    )

    this.http.get('assets/occupation.json').subscribe(
      d=> {
        this.labels = d;
      }
    )
 
  }

  search2() {
    this.searching=true;
    setTimeout(
      ()=>{
        document.getElementById('searchText2').focus();
      }, 100, true
    )
    
  }



}
