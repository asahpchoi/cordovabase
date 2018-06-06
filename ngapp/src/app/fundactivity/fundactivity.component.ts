import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
import { PeService } from '../pe.service';
import { NumpadComponent } from '../components/numpad/numpad.component';

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

  getFA() {
    let fa = this.input.filter(
      fa => {
        return fa.faceAmount || fa.regularPayment || fa.plannedPremium || fa.withdrawal
      }
    );
    fa.forEach(
      f => {
        if (!fa.faceAmount) delete fa.faceAmount;
        if (!fa.regularPayment) delete fa.regularPayment;
        if (!fa.plannedPremium) delete fa.plannedPremium;
        if (!fa.withdrawal) delete fa.withdrawal;
      }
    )

    return fa;

  }

  initInput = [];
  actions = [];

  showValue(row, field, age?) {
    if (!age) { //display field
      return {
        value: row[field],
        class: ''
      }
    }
    else {
      let fa = this.FA.filter(x => x.field == field && x.attainAge == age);


      if (fa.length == 0) {
        return {
          value: row[field],
          class: ''
        }

      }
      else {
        return {
          value: fa[fa.length - 1].value,
          class: 'highlighted',
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

  rerun() {
    this.input = JSON.parse(JSON.stringify(this.initInput));

  }

  modifyFA(year, field, attainAge) {
    let cell = document.getElementById(year + '_' + field);
    let value = prompt(field, cell.innerText);
    let fa =
      {
        year: year,
        attainAge: attainAge,
        field: field,
        value: value
      }
    this.FA.push(fa);
  }



  constructor(
    public dialogRef: MatDialogRef<any>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public pe: PeService) {


    this.FA = data.FA;
    this.ds = data.ds;

    let defFaceAmount = this.ds.dataSets.find(x => "colBasePlanFaceAmount" == (x.label));
    let defWithdrawal = this.ds.dataSets.find(x => "colWithdrawalLocal" == (x.label));

    let defRegularPayment = this.ds.dataSets.find(x => "colRegularPayment" == (x.label));
    let defPlannedPremium = this.ds.dataSets.find(x => "colPremium" == (x.label)); //need to be updated

    let defAnnualizedRegularPayment = this.ds.dataSets.find(x => "colRegularPremiums" == (x.label));
    let defAnnualizedPlanedPremium = this.ds.dataSets.find(x => "colPremium" == (x.label));

    let defAccountHigh = this.ds.dataSets.find(x => "colAccountHigh" == (x.label));


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

    this.initInput = JSON.parse(JSON.stringify(this.input));
  }


  cancel() {
    this.dialogRef.close();
  }

  close() {
    this.closeClick = true;
    this.pe.updateFundActivities(this.getFA(), this.pe.validationRequest);
    this.pe.validate();
  }

  undoFA() {
    this.FA.pop();
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