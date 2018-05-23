import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
import { PeService } from '../pe.service';

@Component({
  selector: 'app-fundactivity',
  templateUrl: './fundactivity.component.html',
  styleUrls: ['./fundactivity.component.css']
})
export class FundactivityComponent {
  validated = false;
  error = null;
  ds;
  FA: any = [];
  input: any = [];

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public pe: PeService) {
    
    
    this.FA = data.FA;
    this.ds = data.ds;
    
    console.log(this.ds)
    let ages = this.ds.dataSets.find(x => x.label = "columnAge").data;
    console.log(ages)
    ages.forEach(
      age => {
        this.input.push(
          new FAItem(age)
        )
      }
    )

    console.log(this.input)

    this.pe.validationSubject.subscribe(
      x => {
        this.error = x;
        this.validated = (x == []);
        
      }
    );
  }

/*
  input = {
    type: 'plannedPremium',
    amount: 0,
    attainAge: 30,
    duration: 1
  }
*/
  delFA(attainAge) {
    this.FA = this.FA.filter(x => x.attainAge != attainAge);
  }

  validate() {
    this.pe.updateFundActivities(this.FA, this.pe.validationRequest);
    this.pe.validate();
  }

  cancel() {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close(this.FA);
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
        item[this.input.type] = +this.input.amount;
        this.FA.push(item);
      }
    }
    this.FA = _.sortBy(this.FA, "attainAge");
  }
}

class FAItem {
  public attainAge;
  public withdrawal;
  public regularPayment;
  public plannedPremium;
  public faceAmount;

  constructor(attainAge) {
    this.attainAge = attainAge;
  }
}