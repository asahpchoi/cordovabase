import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
import { PeService } from '../pe.service';
import { NumpadComponent } from '../components/numpad/numpad.component';
import { withModule } from '@angular/core/testing';

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
  defVals = [];
  fundAct = [];
  initFA = [];
  redolist = [];

  convertFA() {
    this.fundAct = [];
    this.FA.forEach(
      f => {
        let existingFA = this.fundAct.find(
          fa => fa.attainAge == f.attainAge
        )
        if (existingFA) {
          existingFA[f.field] = f.value;
        }
        else {
          let newFA = {
            attainAge: f.attainAge - 1
          }
          newFA[f.field] = f.value;
          this.fundAct.push(
            newFA
          )
        }
      }
    )
  }

  getFA() {
    return this.fundAct;
  }


  actions = [];

  showValue(row, field, age?, year?) {
    if (!age) { //display field
      return {
        value: row[field],
        class: ''
      }
    }
    else {
      let fa = this.FA.filter(x => x.field == field && x.attainAge == age);

      if (
        fa.length == 0
      ) {
        let display = (
          year < 4 && field == "plannedPremium" ||
          year < 2 && field == "regularPayment" ||
          year < 2 && field == "faceAmount" ||
          year < 2 && field == "withdrawal"
        ) ? '' : 'editable';
        return {
          value: row[field],
          class: display
        }
      }
      else {
        return {
          value: fa[fa.length - 1].value,
          class: 'highlight',
        }
      }
    }
  }

  getInput(item, field, defVal, attainAge) {
    let val = item[field] ? item[field] : defVal;

    let dialogRef = this.dialog.open(NumpadComponent, {
      width: '250px',
      data: {
        number: val + '',
        year: 1,
        multipleYear: true,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.actions.push(
          {
            item: item,
            field: field,
            number: result.number
          }
        )
        //item[field] = result.number;
      }
    });
  }



  modifyFA(year, field, attainAge) {
    if (
      year < 4 && field == "plannedPremium" ||
      year < 2 && field == "regularPayment" ||
      year < 2 && field == "faceAmount" ||
      year < 2 && field == "withdrawal"
    )
      return

    let cell = document.getElementById(year + '_' + field);

    let dialogRef = this.dialog.open(NumpadComponent, {
      width: '250px',
      data: {
        number: cell.innerText + '',
        year: 1,
        multipleYear: (field == "withdrawal")
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let multiple = result.year;
        for (var i = 0; i < multiple; i++) {
          let fa =
            {
              year: year + i,
              attainAge: attainAge + i,
              field: field,
              value: result.number
            }
          this.FA.push(fa);
        }
      }
    });


  }



  constructor(
    public dialogRef: MatDialogRef<any>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public pe: PeService) {

    this.initFA = data.FA;
    this.FA = [];
    this.ds = data.ds;

    let defFaceAmount = this.ds.dataSets.find(x => "colBasePlanFaceAmount" == (x.label));
    let defWithdrawal = this.ds.dataSets.find(x => "colWithdrawalLocal" == (x.label));
    let defRegularPayment = this.ds.dataSets.find(x => "colRegularPayment" == (x.label));
    let defPlannedPremium = this.ds.dataSets.find(x => "colPremium" == (x.label)); //need to be updated
    let defAnnualizedRegularPayment = this.ds.dataSets.find(x => "colTotalPremium" == (x.label));
    let defAnnualizedPlanedPremium = this.ds.dataSets.find(x => "colPremium" == (x.label));
    let defAccountHigh = this.ds.dataSets.find(x => "colAccountHigh" == (x.label));
    let defAccountLow = this.ds.dataSets.find(x => "colAccountLow" == (x.label));
    let defAccountMedium = this.ds.dataSets.find(x => "colAccountMedium" == (x.label));
    let ages = this.ds.dataSets.find(x => x.label == "columnAge").data;

    ages.forEach(
      (a, i) => {
        let fa = {
          year: i + 1,
          age: a,
          faceAmount: defFaceAmount.data[i],
          annualizedregularPayment: defAnnualizedRegularPayment.data[i],
          regularPayment: defRegularPayment.data[i],
          annualizedplannedPremium: defAnnualizedPlanedPremium.data[i],
          plannedPremium: defPlannedPremium.data[i],
          withdrawal: defWithdrawal.data[i],
          AccountHigh: defAccountHigh.data[i],
          AccountLow: defAccountLow.data[i],
          AccountMedium: defAccountMedium.data[i],
        }
        this.defVals.push(fa);
      }
    )

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


  cancel() {
    this.dialogRef.close();
  }

  close() {
    this.convertFA();
    this.closeClick = true;
    this.pe.updateFundActivities(this.getFA(), this.pe.validationRequest);
    this.pe.validate();
  }

  undoFA() {
    this.redolist.push(this.FA.pop());
  }

  redoFA() {
    this.FA.push(this.redolist.pop());
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