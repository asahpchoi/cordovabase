import { Component, ViewChild, OnDestroy } from '@angular/core';

import { PeService } from '../pe.service';
import { Chart } from 'chart.js';
import * as $ from 'jquery';
import * as _ from 'lodash';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NumpadComponent } from '../components/numpad/numpad.component';
import { UlinputComponent } from '../ulinput/ulinput.component';
import { debug } from 'util';
import { FundactivityComponent } from '../fundactivity/fundactivity.component';
import { FundallocationComponent } from '../fundallocation/fundallocation.component';

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



  input = {
    fundActivities: [],
    rowStep: 5,
    checked: {
      "colAccountLow": true, "colAccountMedium": true, "colAccountHigh": true,
      "colWithdrawalLocal": true,
      "colBasePlanFaceAmount": true,
      "colPremium": true,
      "colRegularPayment": true,
    },
    allocation: {
      VNAGR: 10,
      VNBAL: 10,
      VNDIV: 10,
      VNFIX: 10,
      VNGRW: 10,
      VNMMK: 10,
    }
  }
  editorOptions;
  subscriber;
  projectionError;

  reloadSettings() {
    this.editableFields = [
      {
        name: "colWithdrawalLocal",
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
      },
      {
        name: "colPremium",
        component: "NumpadComponent",

        activity: "plannedPremium",
        startYear: 4,
        stopYear: this.getDuration()
      },
      {
        name: "colRegularPayment",
        component: "NumpadComponent",
        componentul: "UlinputComponent",
        activity: "regularPayment",
        startYear: 4,
        stopYear: this.getDuration()
      }
    ]
  }

  isNaN: Function = isNaN;

  customColumns = [
    {
      label: "custom column A",
      add: ["colRegularPremiums", "colAccumulatePremiumsLow"],
      minus: ["Withdrawal"]
    },
    {
      label: "Rider Cash TRI SUM",
      regExp: "colRiderCashValue.*TRI"
    }
  ]


  constructor(private pe: PeService,
    public dialog: MatDialog
  ) {
    this.subscriber = pe.getData().filter(x => x).subscribe(
      x => {        //this.productType =  this.pe.productType;

        this.ds = JSON.parse(JSON.stringify(x));
        this.prepareCustomColumns();
        this.reloadColumnData();
        this.setDisplayColumns();
        this.isLoading = false;
        this.reloadSettings();

        this.projectionError = this.ds.validationResult;

      }
    )
  }

  inputFundAllocation() {
    let dialogRef = this.dialog.open(FundallocationComponent, {
      width: '80%',
      height: '80%',
      data: {        
        allocation: this.input.allocation,
        planCode: "RUX02"
      }
    });
    dialogRef.afterClosed().subscribe(
      fa => {
        if (fa) {
          console.log(fa)
        }
      }
    )
  }

  inputFA() {
    let dialogRef = this.dialog.open(FundactivityComponent, {
      width: '80%',
      height: '80%',
      data: {
        FA: this.input.fundActivities,
        ds: JSON.parse(JSON.stringify(this.ds))
      }
    });
    dialogRef.afterClosed().subscribe(
      fa => {
        if (fa) {
          debugger;
          this.input.fundActivities = fa;
          this.pe.updateFundActivities(fa, this.pe.validationRequest);
          this.pe.updateFundActivities(fa, this.pe.projectionRequest);
          this.isLoading = true;
          this.pe.callPEProjection();
        }
      }
    )
  }


  prepareCustomColumns() {
    this.customColumns.forEach(
      c => {
        let col: any = c;

        let data = [];
        this.ds.labels.forEach((v, i) => {
          let val = 0;
          if (col.regExp) {
            debugger;
            let patt = new RegExp(col.regExp);
            let ds = this.ds.dataSets.filter(d => patt.test(d.label));
            if (ds) {
              ds.forEach(
                d => {
                  let fieldValue = d.data[i];
                  val += fieldValue;
                }
              );
            }
          }
          if (col.add) {
            col.add.forEach(
              f => {
                let ds = this.ds.dataSets.find(d => d.label == f)
                if (ds) {
                  let fieldValue = ds.data[i]
                  val += fieldValue;
                }
              }
            )
          }
          if (col.minus) {
            col.minus.forEach(
              f => {
                let ds = this.ds.dataSets.find(d => d.label == f)
                if (ds) {
                  let fieldValue = ds.data[i]
                  val -= fieldValue;
                }
              }
            )
          }
          data.push(val);
        });
        this.ds.dataSets.push(
          {
            label: col.label,
            data: data
          }
        )
      }
    ) //add custom columns





  }

  export() {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += this.allColumns.join(',') + '\r\n';
    let data = [];

    this.allColumns.forEach(
      c => {
        data.push(this.ds.dataSets.find(ds => ds.label == c).data);
      }
    )
    data = _.zip(...data);
    console.log(data);



    data.forEach(row => {
      csvContent += row.join(',') + '\r\n';
    });

    let encodedUri = encodeURI(csvContent);
    let link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'File.csv');
    document.body.appendChild(link);
    link.click();

  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
    //this.pe.
  }

  reloadColumnData() {
    this.allColumns = this.ds.dataSets.map(ds => ds.label);
    //this.updateFAinTable();
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
        age: rawData[1][i] - 1
      }
    }));

    let ds = []

    this.displayColumns.forEach(
      c => {
        let col = rawDS.find(
          d => d.label == c
        );
        ds.push(col.data);
      }
    )


    this.dt = _.zip(...ds);
    this.updateFAinTable();
  }
 
  showFirstColumn() {
    return this.firstColumn.filter((d, i) => ((i + 1) % this.input.rowStep == 0) || i == 0 || i == this.firstColumn.length - 1);
  }

  formatValue(v) {

    if (_.isNumber(v)) {
      return Math.round(v);
    }
    else {
      return v
    }
  }

  getRows(data) {
    return data.filter((d, i) => ((i + 1) % this.input.rowStep == 0) || i == 0 || i == this.firstColumn.length - 1);
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

  private highlightCell(activity, row, value, style) {
    let col = this.editableFields.find(x => x.activity == activity).name;
    let field = document.getElementById(col + "_" + (+row + 1));
    if (field) {
      var formatter = new Intl.NumberFormat('vn-VN', {
        minimumFractionDigits: 0,
      });


      field.innerText = formatter.format(+value);
      field.style.backgroundColor = style ? 'lightgreen' : 'yellow';
    }
  }

  private updateFAinTable() {
    this.input.fundActivities.forEach(
      fa => {

        Object.keys(fa).forEach(
          k => {
            if (k != "attainAge" && k != "validated") {
              this.highlightCell(k, fa.attainAge, fa[k], fa.validated);
            }
          }
        )

      }
    )
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

    if (colName == "colRegularPayment" && this.ulmode) {
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
        }
      });
    }


    dialogRef.afterClosed().first().subscribe(result => {
      let number = +result.number;
      let year = +result.year;
      for (var i = 0; i < year; i++) {
        let existingFA = this.input.fundActivities.find(fa => (fa.attainAge == +yearAge.age - 1 + i) && fa[cellType.activity]);

        if (existingFA) {
          existingFA[cellType.activity] = number;
          existingFA['validated'] = false;
        }
        else {
          let fa = {
            attainAge: +yearAge.age - 1 + i
          }
          fa[cellType.activity] = number;
          fa['validated'] = false;
          this.input.fundActivities.push(
            fa
          );
        }

      }
      this.updateFAinTable();

    });
  }

  validatedFA = [];

  resetNewFA() {
    this.input.fundActivities = JSON.parse(JSON.stringify(this.validatedFA));
    this.pe.callPEProjection();
  }


  applyFA() {
    this.isLoading = true;
    //let tempFA = JSON.parse(JSON.stringify(this.input.fundActivities));

    if (!this.pe.validationRequest) {
      this.pe.validationRequest = JSON.parse(JSON.stringify(this.pe.projectionRequest));
    }

    this.pe.updateFundActivities(this.input.fundActivities, this.pe.validationRequest);
    this.pe.validate();

    let sub = this.pe.validationSubject.subscribe(
      x => {

        let result: any = x;
        if (!x) return;
        if (result.length != 0) {
          //this.input.fundActivities = JSON.parse(JSON.stringify(tempFA));
          this.isLoading = false;
        }
        else {
          this.input.fundActivities.forEach((f, i) => {
            if (f.validated) {
              if (this.input.fundActivities.find(
                fa => !fa.validated && fa.attainAge == f.attainAge && (JSON.stringify(Object.keys(fa)) == JSON.stringify(Object.keys(f)))
              )) {
                console.log('del ' + i)
                this.input.fundActivities.splice(i, 1);
              }
            }
          });
          this.input.fundActivities.forEach(
            f => {
              f.validated = true;
            }
          )
          this.validatedFA = JSON.parse(JSON.stringify(this.input.fundActivities));
          this.pe.updateFundActivities(this.input.fundActivities, this.pe.projectionRequest);
          this.pe.callPEProjection();
        }
        sub.unsubscribe();
      }
    )
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
