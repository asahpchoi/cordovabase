import { Component, ViewChild, OnDestroy } from '@angular/core';

import { PeService } from '../pe.service';
import { Chart } from 'chart.js';
import * as $ from 'jquery';
import * as _ from 'lodash';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NumpadComponent } from '../numpad/numpad.component';

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
  selectedColumns = [];
  firstColumn = [];
  defaultCols = ['Account Value (LOW)', 'Account Value (MEDIUM)',
    'Account Value (HIGH)',
    'Withdrawal', 'Premium', 'Top-up Premium', 'Total Premium'];

  editableFields = [
    {
      name: "Withdrawal",
      component: "NumpadComponent",
      activity: "withdrawal"
    },
    {
      name: "Premium",
      component: "NumpadComponent",
      activity: "plannedPremium"
    },
    {
      name: "Total Premium",
      component: "NumpadComponent",
      activity: "regularPayment"
    }
  ]

  input = {
    fundActivities: [],
    rowStep: 5
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
      }
    )
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
    //this.pe.
  }

  reloadColumnData() {
    this.allColumns = this.ds.dataSets.map(ds => ds.label);
    this.selectedColumns = this.allColumns.map(c => {
      return {
        name: c,
        display: true
      }
    }
    )
  }

  setDisplayColumns() {
    this.displayColumns = this.allColumns;

    if (!this.showall) {
      this.displayColumns = this.defaultCols;
    }

    let rawDS = this.ds.dataSets;
    let rawData = rawDS.map(d => d.data);


    this.firstColumn = (rawData[0].map((d, i) => { return d + '/' + rawData[1][i] }));

    let ds = rawDS.filter(
      d => this.displayColumns.filter(c => c == d.label).length
    ).map(
      d => d.data
    );

    this.dt = _.zip(...ds);
  }



  formatValue(v) {
    if (_.isNumber(v)) {
      var value = v.toLocaleString(
        "vn-vn", // leave undefined to use the browser's locale,
        // or use a string like 'en-US' to override it.
        {
          minimumFractionDigits: 0
        }
      )
      return value;
    }
    else {
      return v
    }
  }

  getRows(data) {
    return data.filter((d, i) => i % this.input.rowStep == 0);
  }

  changeValue(colName, attainAge, value) {
    let cellType: any = this.cellType(colName);
    if (cellType != "") {

      let dialogRef = this.dialog.open(NumpadComponent, {
        width: '250px',
        data: { number: value + '' }
      });

      dialogRef.afterClosed().subscribe(result => {

        let number = result;
        let fa = {
          attainAge: attainAge
        }
        fa[cellType.activity] = number;

        this.input.fundActivities.push(
          fa
        );

        this.pe.updateFundActivities(this.input.fundActivities);
        this.isLoading = true;
        this.pe.callPE();

      });
    }

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
