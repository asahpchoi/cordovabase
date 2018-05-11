import { Component, Inject, OnInit, OnDestroy, } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
import { isThisTypeNode } from 'typescript';

@Component({
  selector: 'app-ulinput',
  templateUrl: './ulinput.component.html',
  styleUrls: ['./ulinput.component.css']
})
export class UlinputComponent implements OnInit {
  cols = [];
 
  unitAmount;
  dataYear;
  unpaidedUnits;

  constructor(
    public dialogRef: MatDialogRef<UlinputComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.cols = data.dataColumn.data;
    this.dataYear = data.dataYear;
    this.unitAmount = +this.cols[0];
    this.data = {
      number: '',
      year:1
    }
  }

  getYearSelection() : any{
    let max = Math.floor((this.getMaxMultipler() + +this.data.year) / +this.data.year);
    let items = [0];
    for(var i = 0; i < max ; i++) {
      items.push((i + 1) * this.unitAmount);
    }
    return items;
  }

  private getMaxMultipler(): number {

     let sumOfPaid = this.cols.filter((d, i) => i < this.dataYear - 1).reduce((p,v) => +p + +v, 0);
     let sum = (this.dataYear - 1) * this.unitAmount;

     return (sum - sumOfPaid) / this.unitAmount;
  }

 


  ngOnInit() {
  }



}
