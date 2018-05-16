import { Component, ViewChild, OnDestroy } from '@angular/core';

import { PeService } from '../pe.service';
import { Chart } from 'chart.js';
import * as $ from 'jquery';
import * as _ from 'lodash';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NumpadComponent } from '../components/numpad/numpad.component';
import { UlinputComponent } from '../ulinput/ulinput.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnDestroy {
  ds;
  showall = true;

  isLoading = false;
  years = [];
  ages = [];
  dt = [];

  allColumns = [];
  displayColumns = [];
  firstColumn = [];
  ulmode = false;

  editableFields;

  reloadSettings() {
    this.editableFields = [
      {
        name: "Withdrawal",
        component: "NumpadComponent",
        activity: "withdrawal",
        multipleYear: true,
        startYear: 2
      },
      {
        name: "colBasePlanFaceAmount",
        component: "NumpadComponent",
        activity: "faceAmount"
        ,
        startYear: 2
        //stopAttainAge: 65
      },
      {
        name: "Premium",
        component: "NumpadComponent",
        componentul: "UlinputComponent",
        activity: "plannedPremium",
        startYear: 4,
        stopYear: this.getDuration()
      },
      {
        name: "colRegularPayment",
        component: "NumpadComponent",
        activity: "regularPayment",
        startYear: 4,
        stopYear: this.getDuration()
      }
    ]
  }

  input = {
    fundActivities: [],
    rowStep: 5,
    checked: {
      'Account Value (LOW)': true, 'Account Value (MEDIUM)': true,
      'Account Value (HIGH)': true,
      'Withdrawal': true, 'Premium': true, 'Top-up Premium': true, 'Total Premium': true,

    }
  }
  editorOptions;
  subscriber;

  constructor(private pe: PeService,
    public dialog: MatDialog
  ) {
    this.subscriber = pe.getData().filter(x => x).subscribe(
      x => {        //this.productType =  this.pe.productType;

        this.ds = x;
        this.reloadColumnData();
        this.setDisplayColumns();
        this.isLoading = false;
        this.reloadSettings();
      }
    )
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
    //this.pe.
  }

  reloadColumnData() {
    this.allColumns = this.ds.dataSets.map(ds => ds.label);
  }

  getDuration() {
    return +this.pe.projectionRequest.inputInfo.duration;
  }

  setDisplayColumns() {
    this.displayColumns = this.allColumns;
    //debugger
    if (!this.showall) {
      this.displayColumns = Object.keys(this.input.checked).filter(k => this.input.checked[k])
    }

    let rawDS: any = this.ds.dataSets;
    let rawData = rawDS.map(d => d.data);


    this.firstColumn = (rawData[0].map((d, i) => {
      return {
        year: d,
        age: rawData[1][i]
      }

    }));

    let ds = []

    this.displayColumns.forEach(
      c => {
        let col = rawDS.filter(
          d => d.label == c
        )[0]
        ds.push(col.data);
      }
    )


    this.dt = _.zip(...ds);
  }

  showFirstColumn() {
    return this.firstColumn.filter((d, i) => i % this.input.rowStep == 0);
  }




  formatValue(v) {
    if (_.isNumber(v)) {
      let n = +v;
     
      var value = v.toLocaleString(
        "vn-vn", // leave undefined to use the browser's locale,
        // or use a string like 'en-US' to override it.
        {
          minimumFractionDigits: 0
        }
      )
      return  Math.round(v);
    }
    else {
      return v
    }
  }

  isNaN: Function = isNaN;

  getRows(data) {
    return data.filter((d, i) => i % this.input.rowStep == 0);
  }

  getClass(colName, yearAge, value) {
    let cellType: any = this.cellType(colName);

    if (cellType == "") return "";

    if (cellType.stopAttainAge && cellType.stopAttainAge < yearAge.age)
      return "";
    if (cellType.startYear && cellType.startYear > yearAge.year)
      return "";

    if (cellType.stopYear)

      if (cellType.stopYear && +cellType.stopYear < yearAge.year)
        return "";

    return cellType.component;
  }

  changeValue(colName, yearAge, value) {
    let cellType: any = this.cellType(colName);

    if (cellType == "") return "";

    if (cellType.stopAttainAge && cellType.stopAttainAge < yearAge.age)
      return "";
    if (cellType.startYear && cellType.startYear > yearAge.year)
      return "";

    if (cellType.stopYear && cellType.stopYear < yearAge.year)
      return "";

    let dialogRef;

    if (colName == "Premium" && this.ulmode) {
      dialogRef = this.dialog.open(UlinputComponent, {
        width: '250px',
        data: {
          unit: this.ds.dataSets.filter(ds => ds.label == colName)[0][0],
          dataColumn: this.ds.dataSets.filter(ds => ds.label == colName)[0],
          dataYear: yearAge.year
        }
      });
    }
    else {
      dialogRef = this.dialog.open(NumpadComponent, {
        width: '250px',
        data: {
          number: value + '',
          year: 1,
          multipleYear: cellType.multipleYear,
          /*
          productInfo: {
            productID: ,
            attainedAge: yearAge.age,
            fieldType: colName

          }*/
        }
      });
    }

    let tempFA = JSON.parse(JSON.stringify(this.input.fundActivities));
    dialogRef.afterClosed().first().subscribe(result => {
      let number = +result.number;
      let year = +result.year;




      for (var i = 0; i < year; i++) {
        let fa = {
          attainAge: +yearAge.age - 1 + i
        }
        fa[cellType.activity] = number;

        this.input.fundActivities.push(
          fa
        );
      }
      // console.log('old', this.input.fundActivities)
      // this.input.fundActivities = _.sortBy(this.input.fundActivities, "attainAge");
      //console.log('new', this.input.fundActivities)
      this.isLoading = true;
      //debugger
      if (!this.pe.validationRequest) {
        this.pe.validationRequest = JSON.parse(JSON.stringify(this.pe.projectionRequest));
      }

      this.pe.updateFundActivities(this.input.fundActivities, this.pe.validationRequest);

      this.pe.validate();
      let sub = this.pe.validationSubject.subscribe(
        x => {
          let result: any = x;
          if (!x) return;
          if (result.length == 0) {
            this.pe.updateFundActivities(this.input.fundActivities, this.pe.projectionRequest);
            this.pe.callPEProjection();
            sub.unsubscribe();
          }
          else {
            this.isLoading = false;
            this.input.fundActivities = JSON.parse(JSON.stringify(tempFA));
            sub.unsubscribe();
          }
        }
      )




    });
  }

  resetFundActs() {
    this.input.fundActivities = [];
    this.pe.updateFundActivities(this.input.fundActivities, this.pe.validationRequest);
    this.pe.updateFundActivities(this.input.fundActivities, this.pe.projectionRequest);
  }

  clearFA() {
    this.isLoading = true;
    this.resetFundActs();
    this.pe.callPEProjection();
  }

  cellType(colName) {
    let fieldConfig = this.editableFields.filter(
      f => f.name == colName
    )

    if (fieldConfig.length > 0) {

      return fieldConfig[0];
    }
    return ""
  }
}
