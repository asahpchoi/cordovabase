import { Component, OnInit } from '@angular/core';
import { PeService } from '../pe.service';
import { Chart } from 'chart.js';
import * as $ from 'jquery';

@Component({
  selector: 'app-compare-charts',
  templateUrl: './compare-charts.component.html',
  styleUrls: ['./compare-charts.component.css']
})
export class CompareChartsComponent implements OnInit {
  proposals = [{
    "dataSets": [{ "label": "Year", "data": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70] },
    { "label": "Age", "data": [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99] },
    { "label": "Account Value (LOW)", "data": [113660.26, 300022.63, 511768.71, 783927.39, 1086699.92, 1394194.33, 1710617.55, 2035824.29, 2369817.01, 2712598.24, 3040288.57, 3372363.88, 3708629.95, 4048887.72, 4392783.13, 4740115.4, 5090676.76, 5444092.02, 5800128.63, 6158396.15, 6518190.37, 6878789.33, 7238844.97, 7597279.45, 7952531.9, 8303306.31, 8648426.29, 8986838.01, 9317461.24, 9639036.6, 9949817.12, 10247403.97, 10528730.01, 10790347.27, 11028569.32, 11239617.44, 11420226.27, 11567200.72, 11677417.62, 11746915.49, 11770113.27, 11739769.75, 11646942.02, 11481094.86, 11231124.99, 10887323.33, 10441409.86, 9886265.32, 9215808.4, 8422893.2, 7497002.16, 6423553.53, 5184103.46, 3756705.47, 2119775.43, 255141.11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }]
  }, { "dataSets": [{ "label": "Year", "data": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70] }, { "label": "Age", "data": [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99] }, { "label": "Account Value (LOW)", "data": [118931.39, 310867.69, 528563.86, 807125.16, 1116936.16, 1431757.66, 1756131.8, 2090026.88, 2433532.38, 2786740.9, 3125106.52, 3468884.73, 3817967.88, 4172245.6, 4531485.23, 4895579.97, 5264418.36, 5637754.41, 6015457.55, 6397272.29, 6782693.54, 7171203.55, 7561785.1, 7953638.72, 8345580.05, 8736638.3, 9125939.97, 9512711.31, 9896159.18, 10275348.95, 10648957.71, 11015142.88, 11371529.26, 11715438.87, 12044005.03, 12354289.22, 12643765.79, 12909967.45, 13150486.71, 13362247.65, 13540881.05, 13680691.95, 13774626.53, 13814359.6, 13791114.14, 13697231.11, 13526197.37, 13272431.3, 12931184.36, 12496859.35, 11961164.71, 11312560.55, 10536420.53, 9615319.35, 8532124.91, 7272438.09, 5824782.84, 4179949.7, 2329471.4, 264790.24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }] }]

  ds = [];
  constructor(public pe: PeService) { }

  getMaxValue() {
    let max = 0;
    this.proposals.forEach(
      p => {
        let data: any = p.dataSets.find(x => x.label == "Account Value (LOW)").data;

        max = Math.max(...data) > max ? Math.max(...data) : max;
      }
    )
    return Math.ceil((max * 1.2) / 200000) * 200000;
  }

  draw(id, data, max) {
    let html: any = document.getElementById(id)
    let ctx = html.getContext('2d');
    let years = data.find(x => x.label == "Year").data;
    let ages = data.find(x => x.label == "Age").data;
    let label = years.map((d, i) => 
      d + '/' + ages[i]
     )

    let chartdata = data.filter(x => x.label == "Account Value (LOW)")[0].data;

    let myChart = new Chart(ctx, {
      type: 'line',
      responsive: false,

      data: {
        labels: label,
        datasets: [{
          label: '',
          data: chartdata,
          borderWidth: 1,
          backgroundColor: 'green',
          borderColor: 'green',

          pointRadius: 0,
        }]
      },
      options: {

        scales: {
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,
              steps: 10,
              stepValue: 5,
              max: max,
              autoSkip: true,
              mirror: true
 
            },
            gridLines: { 
              display:false
            }
          }],
          xAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,
              steps: 10,
              stepValue: 10,
              autoSkip: true,
              maxTicksLimit: 10,
              stepSize: 10
            },
            gridLines: { 
              display:false
            }
          }]
        }
      }
    });

    myChart.update()

  }

  ngOnInit() {
 

    if ( this.pe.proposals.length > 0) {
      this.proposals = this.pe.proposals;
    }
    var max = this.getMaxValue();

    this.setDS();

    this.ds.forEach(
      x => {
        this.draw(x.id, x.dataSets, max);
      }
    )
  }

  setDS() {
    var i = 1;
    this.proposals.forEach(
      p => {

        let rs = p.dataSets.filter(
          ds =>
            (
              ds.label == "Account Value (LOW)"
              || ds.label == "Year"
              || ds.label == "Age"
            )
        )
        this.ds.push({
          id: "chart" + i++,
          dataSets: rs
        });
      }
    )
  }
}
