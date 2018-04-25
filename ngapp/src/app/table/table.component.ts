import { Component, ViewChild } from '@angular/core';

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
export class TableComponent {
  ds;
  showall = true;
  rowStep = 5;
  isLoading = false;
  years = [];
  ages = [];
  dt = [];
  columns = [];
  defaultCols = ['Year', 'Age', 'Account Value (LOW)', 'Account Value (MEDIUM)',
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
    fundActivities: []
  }
  editorOptions;

  constructor(private pe: PeService,
    public dialog: MatDialog
  ) {
    pe.getData().filter(x => x).subscribe(
      x => {        //this.productType =  this.pe.productType;
        this.ds = x;
        this.resetColumns();
        this.setColumns();
        this.isLoading = false;
      }
    )


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
  resetColumns() {
    this.columns = this.ds.dataSets.map(
      ds => {
        return {
          column: ds.label,
          display: true
        }
      }
    );
  }

  addColumns(c1, c2) {
    let r1  = this.ds.dataSets.filter(d => d.label == c1)[0];
    let r2  = this.ds.dataSets.filter(d => d.label == c2)[0];
    let r3 = r1.forEach((d, i) => +d + +r2[i]);

    return r3;
  }

  setColumns() {
    if (!this.showall) {
      this.columns = this.defaultCols.map(
        d => {
          return {
            column: d,
            display: true
          }
        }
      )
    }
    let ds = this.ds.dataSets.filter(
      d => {
        let l = this.columns.filter(
          c => c.column == d.label && c.display
        ).length
        return l > 0;
      }
    ).map(
      d => d.data
      );
    //let cs =  this.addColumns("","");
    this.dt = _.zip(...ds);

  }
  displayColumns() {
    return this.columns.filter(
      c => c.display
    )
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
    return data.filter((d, i) => i % this.rowStep == 0);
  }


}
