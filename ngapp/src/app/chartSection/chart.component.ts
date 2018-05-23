import { Component, OnInit } from '@angular/core';
import { PeService } from '../pe.service';
import { Chart } from 'chart.js';
import * as $ from 'jquery';
import { debug } from 'util';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent {

  lapsedYear: number[] = null;
  subscriber;
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
      },
      tooltips: { enabled: false },
      hover: { mode: null },
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
  private colors = ['#FF5D55',
    '#FF8C86',
    '#00AA59',
    '#B8E986',
    '#F5F5F5',
    'white',
    '#006FF1',
    '#5ACFD6',
    '#F5F5F5',]
  private selectedView;
  private productType;
  private viewOptions = [
    {
      productType: "UL",
      views: [
        {
          viewType: "AV",
          chart: 'colAccount%s',
          scenario: ['Low', 'Medium', 'High'],
          guarantedScenario: 'colAccountLow',
          default: 'colAccountLow',
          line: "colAccumulatePremiumsHigh"
        }
        ,
        {
          viewType: "DB",
          chart: 'colTotalDb%s',
          scenario: ['Low', 'Medium', 'High'],
          default: 'colTotalDbLow',
          line: "colAccumulatePremiumsHigh"
        }
        ,
        {
          viewType: "SV",
          chart: 'colSurValue%s',
          scenario: ['Low', 'Medium', 'High'],
          default: 'colSurValueLow',
          line:"colAccumulatePremiumsHigh"
        }
      ]
    }
    ,
    {
      productType: "CI",
      views: [
        {
          viewType: "DB",
          chart: 'colTradTotalDeathBenefit%s',
          scenario: ['LOW', '', 'HIGH'],
          default: 'colTradTotalDeathBenefitLOW',
          line: 'colTradAccumulatePremiums'
        }
        ,
        {
          viewType: "SV",
          chart: 'colTradTotalSurrValue%s',
          scenario: ['LOW', '', 'HIGH'],
          default: 'colTradTotalSurrValueLOW',
          line: 'colTradAccumulatePremiums'
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
  viewOption;
  chart;
  columns = [];
  input = {
    units: {

    }
  }

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

    const breakevenPlugin = {
      getLinePosition: function (chart, pointIndex) {
        const meta = chart.getDatasetMeta(0); // first dataset is used to discover X coordinate of a point
        const data = meta.data;
        if (pointIndex >= data.length) return null;

        return data[pointIndex]._model.x;
      },
      afterDatasetsDraw: function (chart, easing) {
        
        
        let lineLabel = "colAccumulatePremiumsHigh";        
        let accpremium = 0;

        if (easing == 1) {
          if(!chart) return;
          let ds = chart.data.datasets;
          
          let line = ds.find(x => (x.label == lineLabel));
          if(!line) return;
          let lineData: any = line.data;
          
         
          let areaDataDS: any = ds.filter(x => (x.label != lineLabel));
          let BreakevenPoint = 0;

          lineData.forEach(
            (payment, i) => {
              let result = false;
              areaDataDS.forEach(
                ds => {
                  if (+ds.data[i] > payment) {
                    if (BreakevenPoint == 0) {
                      BreakevenPoint = i;
                      accpremium = payment;
                    }
                  }
                }
              )
            }
          )
          const scale = chart.scales['y-axis-0'];
          const offSet = this.getLinePosition(chart, BreakevenPoint);
          const context = chart.ctx;

          context.fillStyle = "blue";
          let values: any = areaDataDS.map(
            x => {
              return {
                label: x.label,
                value: x.data[BreakevenPoint]
              }
            }
          )

          let text = 'Breakeven: ' + BreakevenPoint + ';' +
            'Total Payment: ' + accpremium + ';' +
            values.map(
              x => x.label + ':' + x.value + ';'
            )

          context.fillText(text, offSet, scale.bottom - 100);
        }


      }

    };

    const verticalLinePlugin = {
      getLinePosition: function (chart, pointIndex) {
        const meta = chart.getDatasetMeta(0); // first dataset is used to discover X coordinate of a point
        const data = meta.data;
        if (pointIndex >= data.length) return null;

        return data[pointIndex]._model.x;
      },
      renderVerticalLine: function (chartInstance, pointIndex) {

        if (pointIndex == 0 || pointIndex == -Infinity || pointIndex == Infinity) return;

        const lineLeftOffset = this.getLinePosition(chartInstance, pointIndex);
        if (!lineLeftOffset) return;
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
        if (easing == 1) {
          if (chart.config.lineAtIndex != null) {
            chart.config.lineAtIndex.forEach(pointIndex => this.renderVerticalLine(chart, pointIndex));
          }
        }
      }
    };

    Chart.plugins.register(verticalLinePlugin);
    Chart.plugins.register(breakevenPlugin);
  }

  getScenario() {
    return Object.keys(this.input.units);
  }

  selectView(v) {
    this.selectedView = v;
    this.input.units = [];
    debugger
    v.scenario.forEach(
      s => {
        let k = v.chart.replace("%s", s);
        this.input.units[k] = false;
      }
    )
    this.input.units[this.selectedView.default] = true;
    this.columns = [];
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

  
    let lineData = this.ds.dataSets.find(d => d.label == this.selectedView.line);

    lineData.fill = false;
    lineData.borderColor = '#B8E986';

    let acs = areaData.map(x => x.label).filter(x => x.includes("colAccount")).map(x => x.replace("colAccount", "Lapse"));


    let lapsedYear = this.ds.dataSets.filter(ds => acs.includes(ds.label));
    //let lapsedYear = this.ds.dataSets.filter(ds => ds.label == "Lapse (LOW)");

    if (lapsedYear == []) {
      this.lapsedYear = null;
    }
    else {
      this.lapsedYear = lapsedYear.map(x => x.data.filter(y => y == 'N').length)
      this.lapsedYear = [Math.min(...this.lapsedYear)];
    }
 
debugger
    this.chartData = [...[lineData], ...areaData]
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
      if (document.getElementById("canvas")) {
        document.getElementById("canvas").remove();
      }

      var mycanvas = document.createElement("canvas");
      mycanvas.id = "canvas";
      document.getElementById("canvasDiv").appendChild(mycanvas);


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

}
