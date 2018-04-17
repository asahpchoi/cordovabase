import { Component, OnInit } from '@angular/core';
import { PeService } from '../pe.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent {


  constructor(private pe: PeService) {
    pe.getData().filter(x => x).subscribe(
      x => {        //this.productType =  this.pe.productType;
        this.viewOption = this.viewOptions.filter(vo => vo.productType == this.pe.productType)[0];
        console.log(this.viewOption)
        this.ds = x;
        this.createChart();
      }
    )
  }

  private viewOptions = [
    {
      productType: "UL",
      views: [
        {
          viewType: "AV",
          chart: 'Account Value (%s)',
          scenario: ['LOW', 'MEDIUM', 'HIGH'],
          guarantedScenario: 'Account Value (LOW)',
          default: 'Account Value (LOW)',
          line: "Premium"
        }
        ,
        {
          viewType: "DB",
          chart: 'Total Death Benefit (%s)',
          scenario: ['LOW', 'MEDIUM', 'HIGH'],
          default: 'Total Death Benefit (LOW)',
          line: "Premium"
        }
        ,
        {
          viewType: "SV",
          chart: 'Surrender Value (%s)',
          scenario: ['LOW', 'MEDIUM', 'HIGH'],
          default: 'Surrender Value (LOW)',
          line: "Premium"
        }
      ]
    }
    ,
    {
      productType: "CI",
      views: [
        {
          viewType: "DB",
          chart: 'Total Death Benefit (%s)',
          scenario: ['LOW', 'MEDIUM', 'HIGH'],
          default: 'Total Death Benefit (LOW)',
          line: 'Accumulated Premiums'
        }
        ,
        {
          viewType: "SV",
          chart: 'Total Surrender Value (%s)',
          scenario: ['LOW', 'MEDIUM', 'HIGH'],
          default: 'Total Surrender Value (LOW)',
          line: 'Accumulated Premiums'
        }
      ]
    }
    ,
    {
      productType: "UVL",
      views: [
        {
          viewType: "AV",
          chart: ['Account Value'],
          scenario: ['HIGH', 'LOW'],
          default: 'LOW',
          line: 'Total Premium'
        }
        ,
        {
          viewType: "DB",
          chart: ['Total Death Beneift'],
          scenario: ['HIGH', 'LOW'],
          default: 'LOW',
          line: 'Total Premium'
        }
        ,
        {
          viewType: "SV",
          chart: ['Surender Value'],
          scenario: ['HIGH', 'LOW'],
          line: 'Total Premium'
        }
      ]
    }
  ];

  private input = {
    units: {

    }
  }

  private selectView(v) {
    this.selectedView = v;
    this.input.units = {};
    this.columns = [];
    this.pecolumns = this.selectedView.scenario.map(
      s => this.selectedView.chart.replace("%s", s)
    )
    this.chart = null;

    this.createChart()
  }

  private valueChange(unit, $event) {
    //set the two-way binding here for the specific unit with the event
    this.input.units[unit] = $event.checked;
    this.columns = Object.keys(this.input.units).filter(x => {
      return this.input.units[x] == true;
    });
    this.chart = null;
    this.createChart()
  }



  private prepareData() {
    //this.pecolumns = this.ds.dataSets.map(ds => ds.label);
    this.chartLabels = this.ds.labels;

    if (this.columns.length == 0) {
      this.columns.push(this.selectedView.default);
    }
    if (this.selectedView.guarantedScenario)
      this.columns.push(this.selectedView.guarantedScenario);

    let areaData = this.ds.dataSets.filter(ds => {
      let match = this.columns.filter(
        columnName => {
          return columnName == ds.label
        }
      )
      return match.length;
    });



    let lineData = this.ds.dataSets.filter(ds => ds.label == this.selectedView.line);
    lineData[0].fill = false;
    lineData[0].borderColor = 'blue';

    this.chartData = [...lineData, ...areaData]
    this.chartData.forEach(
      (ds, i) => {
        ds.backgroundColor = this.colors[i % 3];//,'#FF5D55', '#006F61']
        ds.pointRadius = 0;
      }
    );
  }

  private createChart() {
    if (this.selectedView) {
      this.prepareData();

      if (this.chart)
        this.chart = null;

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.chartLabels,
          datasets: this.chartData,
        },
        options: this.chartOptions
      });
    }

  }

  private chartOptions =
  {
    legend: {
      display: true
    },
    scales: {
      xAxes: [{
        display: true
      }],
      yAxes: [{
        display: true
      }],
    }
  };

  private chartData = [
    {
      data: [],
      label: '',
      backgroundColor: '',
      borderColor: '',
      pointRadius: 0,
      type: 'line',
      fill: false,
    }
  ];
  private chartLabels = [];

  private ds;
  private colors = ['#00AA59', '#FF5D55', '#006F61'];
  private selectedView;
  private productType;
  private pecolumns;

  viewOption;
  chart;
  columns = [];

}
