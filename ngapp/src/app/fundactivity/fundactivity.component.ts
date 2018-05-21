import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';

@Component({
  selector: 'app-fundactivity',
  templateUrl: './fundactivity.component.html',
  styleUrls: ['./fundactivity.component.css']
})
export class FundactivityComponent {


  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  FA: any = [
    {
      attainAge: 15,
      regularPayment: 150000,
      faceAmount: 200000,
      plannedPremium: 50000,
      withdrawal: 15000
    },
    {
      attainAge: 25,
      regularPayment: 150000,
      faceAmount: 200000,
      plannedPremium: 50000,
      withdrawal: 15000
    }
  ]

  input = {
    type: 'plannedPremium',
    amount: 0,
    attainAge: 30,
    duration: 1
  }

  delFA(attainAge) {
    this.FA = this.FA.filter(x => x.attainAge != attainAge);
  }

  addFA() {
    if (this.input.type != 'withdrawal') {
      this.input.duration = 1;
    }
    for (var i = 0; i < this.input.duration; i++) {
      let attainAge = +this.input.attainAge + i;
      let addedItem = this.FA.find(x => x.attainAge == attainAge);
      if (addedItem) {
        if (addedItem[this.input.type]) {
          addedItem[this.input.type] = +addedItem[this.input.type] + +this.input.amount;
        }
        else {
          addedItem[this.input.type] = +this.input.amount;
        }
      }
      else {
        let item = {
          attainAge: attainAge
        }
        item[this.input.type] = this.input.amount;
        this.FA.push(item);
      }
    }
    this.FA = _.sortBy(this.FA,"attainAge");
    
  }
}
