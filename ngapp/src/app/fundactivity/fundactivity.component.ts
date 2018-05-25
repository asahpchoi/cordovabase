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
  closeClick = false;
  errorYears = [];

  getFA() {
    let fa = this.input.filter(
      fa => {
        return fa.faceAmount || fa.regularPayment || fa.plannedPremium || fa.withdrawal
      }
    );
    fa.forEach(
      f => {
        if(!fa.faceAmount) delete fa.faceAmount;
        if(!fa.regularPayment) delete fa.regularPayment;
        if(!fa.plannedPremium) delete fa.plannedPremium;
        if(!fa.withdrawal) delete fa.withdrawal;

      }
    )

    return fa;

  }

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public pe: PeService) {
    

    this.FA = data.FA;
    this.ds = data.ds;


    let ages = this.ds.dataSets.find(x => x.label == "columnAge").data;

    ages.forEach(
      age => {
        let currentFA = this.FA.find(f => f.attainAge == age);
        if (currentFA) {
          this.input.push(JSON.parse(JSON.stringify(currentFA)));
        }
        else {
          this.input.push(
            new FAItem(age)
          )
        }
      }
    )

    

    this.pe.validationSubject.subscribe(
      x => {
        this.error = x;
        if (!this.error) {
          
          return;
        }
        if (this.error.length == 0 && this.closeClick) {
          this.dialogRef.close(this.getFA());
        }
        else {
          this.errorYears = this.error.map(e => +e.parameters["%POLICY_YEAR%"]);
          console.log(this.errorYears)
          this.closeClick = false;
        }
      }
    );
  }

  delFA(attainAge) {
    this.FA = this.FA.filter(x => x.attainAge != attainAge);
  }

  cancel() {
    this.dialogRef.close();
  }

  close() {
    this.closeClick = true;
    this.pe.updateFundActivities(this.getFA(), this.pe.validationRequest);
    this.pe.validate();
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