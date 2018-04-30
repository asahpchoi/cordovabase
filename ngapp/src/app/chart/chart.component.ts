import { Component, OnInit } from '@angular/core';
import { PeService } from '../pe.service';
import { Chart } from 'chart.js';
import * as $ from 'jquery';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent {

  lapsedYear: number[] = null;
  subscriber;

  ngOnDestroy() {
    this.subscriber.unsubscribe();
    //this.pe.
  }

  constructor(private pe: PeService) {
    this.subscriber = pe.getData().filter(x => x).subscribe(
      x => {        //this.productType =  this.pe.productType;
        this.viewOption = this.viewOptions.filter(vo => vo.productType == this.pe.productType)[0];

        this.ds = x;
        this.createChart();
      }
    )
    const verticalLinePlugin = {
      getLinePosition: function (chart, pointIndex) {        
        const meta = chart.getDatasetMeta(0); // first dataset is used to discover X coordinate of a point
        const data = meta.data;
        if(pointIndex >= data.length) return null;

        return data[pointIndex]._model.x;
      },
      renderVerticalLine: function (chartInstance, pointIndex) {
 
        if(pointIndex == 0 || pointIndex == -Infinity || pointIndex == Infinity) return;

        const lineLeftOffset = this.getLinePosition(chartInstance, pointIndex);
        if(!lineLeftOffset) return;
        const scale = chartInstance.scales['y-axis-0'];
        const context = chartInstance.chart.ctx;

        // render vertical line
        context.beginPath();
        context.strokeStyle = '#ff0000';
        context.moveTo(lineLeftOffset, scale.top);
        context.lineTo(lineLeftOffset, scale.bottom);
        context.stroke();

        // write label
        context.fillStyle = "#ff0000";
        context.textAlign = 'center';
        context.fillText('Lapsed Year', lineLeftOffset, (scale.bottom - scale.top) / 2 + scale.top);
      },

      afterDatasetsDraw: function (chart, easing) {
        if (chart.config.lineAtIndex != null) {
          chart.config.lineAtIndex.forEach(pointIndex => this.renderVerticalLine(chart, pointIndex));
        }
      }
    };
    Chart.plugins.register(verticalLinePlugin);
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
          line: "Total Premium"
        }
        ,
        {
          viewType: "DB",
          chart: 'Total Death Benefit (%s)',
          scenario: ['LOW', 'MEDIUM', 'HIGH'],
          default: 'Total Death Benefit (LOW)',
          line: "Total Premium"
        }
        ,
        {
          viewType: "SV",
          chart: 'Surrender Value (%s)',
          scenario: ['LOW', 'MEDIUM', 'HIGH'],
          default: 'Surrender Value (LOW)',
          line: "Total Premium"
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

  input = {
    units: {
      
    }
  }




  private selectView(v) {
    this.selectedView = v;
    this.input.units = {

    };
    this.input.units[this.selectedView.default] = true;
    this.columns = [];
    this.pecolumns = this.selectedView.scenario.map(
      s => this.selectedView.chart.replace("%s", s)
    )
    this.chart = null;
    this.columns = Object.keys(this.input.units).filter(x => {
      return this.input.units[x] == true;
    });

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
    this.chartLabels = this.ds.labels;

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

    let acs = areaData.map(x => x.label).filter(x => x.includes("Account Value")).map(x => x.replace("Account Value", "Lapse"));


    let lapsedYear = this.ds.dataSets.filter(ds => acs.includes(ds.label));
    //let lapsedYear = this.ds.dataSets.filter(ds => ds.label == "Lapse (LOW)");

    if(lapsedYear == []) {
      this.lapsedYear = null;
    }
    else {
      this.lapsedYear = lapsedYear.map(x => x.data.filter(y => y == 'N').length)
      this.lapsedYear = [Math.min(...this.lapsedYear)];
    }
 


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
        options: this.chartOptions,
        lineAtIndex: this.lapsedYear,
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
