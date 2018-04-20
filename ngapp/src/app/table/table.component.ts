import { Component, OnInit } from '@angular/core';
import { PeService } from '../pe.service';
import { Chart } from 'chart.js';
import * as $ from 'jquery';
import * as _ from 'lodash';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  ds;
  years = [];
  ages = [];
  dt = [];
  columns = [];
  editableFields = [
    {
      name: "Withdrawal",
      component: "numpad",
      activity: "withdrawal"
    },
    {
      name: "Premium",
      component: "numpad2",
      activity: "plannedPremium"
    },
    {
      name: "Total Premium",
      component: "numpad2",
      activity: "regularPayment"
    }
  ]
  input = {
    fundActivities:[]
  }


  changeValue(colName, attainAge) {
    let cellType : any = this.cellType(colName);
    if(cellType != "") {
      let number = prompt();
      let fa = {
        attainAge: attainAge
      }
      fa[cellType.activity] = number;
      console.log(fa)
      this.input.fundActivities.push(
        fa
      );
    }
    this.pe.updateFundActivities(this.input.fundActivities);
    this.pe.callPE();
    console.log(this.pe.request);
  }
  constructor(private pe: PeService) {
    pe.getData().filter(x => x).subscribe(
      x => {        //this.productType =  this.pe.productType;
        this.ds = x;
        this.setColumns();
      }
    )
  }
  cellType(colName) {
    let fieldConfig = this.editableFields.filter(
      f => f.name == colName
    )

    if(fieldConfig.length > 0) {
      return fieldConfig[0];
    }
    return ""
  }

  setColumns() {
    this.columns = this.ds.dataSets.map(
      ds => ds.label
    );

    this.years = this.ds.dataSets.filter(
      ds => ds.label == 'Year'
    )[0].data

    this.ages = this.ds.dataSets.filter(
      ds => ds.label == 'Age'
    )[0].data

    this.columns.splice(0,2);



    let ds = this.ds.dataSets.filter(
      d => this.columns.includes(d.label)
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
        { minimumFractionDigits: 0}
      )
      return value;
    }
    else {
      return v
    }
  }

  ngOnInit() {
    //this.input.fundActivities = this.pe.getFundActivities();
  }

}
