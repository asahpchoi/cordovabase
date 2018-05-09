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

  getMaxMulitpier() : any{
    let max = Math.floor((this.getStopPayment() + +this.data.year) / +this.data.year);
    let items = [0];
    for(var i = 0; i < max ; i++) {
      items.push((i + 1) * this.unitAmount);
    }
    return items;
  }

  private getStopPayment() : number {
    let stopPaymentYear = 0;
    for(var i = this.dataYear - 2; this.cols[i] == 0; i--) {
      stopPaymentYear ++;
    }
    return stopPaymentYear
  }



  ngOnInit() {
  }



}
