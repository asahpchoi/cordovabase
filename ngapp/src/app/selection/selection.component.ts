import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import * as d3 from 'd3';
import * as _ from "lodash";

import { Http } from '@angular/http';

import { DataService } from '../data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent {
  items;
  searchText = '';
  suggested;
  list = ''

  @Input() selection: any;
  @Input() limit = 1;
  @Output() selected = new EventEmitter<boolean>();



  constructor(
    public dialogRef: MatDialogRef<SelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public ds: DataService
  ) {
    this.selection = data.input.value;
    this.limit = data.input.limit;
    this.list = data.input.list;
    this.suggested = data.input.suggestions;
    
    ds.loadData(this.list).then(
      x => {
        this.items = ds.getData(this.list);
console.log(this.items)
      }
    )
  }

  remove(s) {
    const index = this.selection.indexOf(s);
    if (index >= 0) {
      this.selection.splice(index, 1);
    }
  }

  add(s) {
    this.selection.push(s);
    this.searchText = "";
    if (!this.canAdd()) {
      this.dialogRef.close();
      //this.selected.emit(true);
    }
  }

  getSuggestion() {
    let results = [];

    results = this.suggested.filter(
      x => !this.selection.includes(x)
    )

    return results;
  }
  hl(text) {
    return text.replace(this.searchText, "<b>" + this.searchText + "</b>")
  }
  canAdd() {
    return this.limit > this.selection.length;
  }

  showName(code) {

    return this.ds.getValue(code, this.list);
  }
  getItems() {
    if (!this.items) return;
    return this.items.filter(
      x => {
        if (!this.searchText) return true;
        return x.name.toLowerCase().includes(this.searchText.toLowerCase())
      }
    )
  }


}
