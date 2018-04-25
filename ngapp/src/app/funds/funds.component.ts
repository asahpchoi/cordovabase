import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import * as $ from 'jquery';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})
export class FundsComponent {
  barChart;
  barChartData = {
    labels: [],
    datasets: []
  };
  donutChart;
  donutChartData = {
    labels: [],
    datasets: []
  };
  funds = {
    fund1: 0,
    fund2: 20,
    fund3: 30,
    fund4: 10,
    fund5: 0,
    fund6: 0
  }
  fundROI = {
    fund1: [3, 4],
    fund2: [4, 10],
    fund3: [3, 7],
    fund4: [6, 7],
    fund5: [2, 5],
    fund6: [3, 7]
  }
  fundsBS: BehaviorSubject<any> = new BehaviorSubject(this.funds);
  colors = ['lightblue', 'lightgreen', 'lightpink', 'RosyBrown', 'LightSalmon', 'MediumAquaMarine']
  agAllocation = [0, 0];

  updateAggAllocaiton() {
    this.agAllocation = [0, 0];
    Object.keys(this.funds).forEach(f => {
      this.agAllocation[0] += this.fundROI[f][0] * this.funds[f] / this.getTotalFunds();
      this.agAllocation[1] += this.fundROI[f][1] * this.funds[f] / this.getTotalFunds();
    })
    this.agAllocation = this.agAllocation.map(
      a => Math.round(a * 1000) / 1000
    )
    return this.agAllocation;
  }

  getTotalFunds() {
    return Object.values(this.funds).reduce((a, b) => a + b, 0)
  }

  getOptions(value) {
    let options = [0];
    let max = Math.max(100 + value - this.getTotalFunds(), value);
    for (var i = 10; i <= max; i += 5) {
      options.push(i)
    }
    return options;
  }

  getfunds() {
    return Object.keys(this.funds);
  }

  getDS() {
    let ds = Object.keys(this.funds).map(
      (x, i) => {
        return {
          label: x,
          backgroundColor: this.colors[i],
          stack: '0',
          data: [this.funds[x]]
        }
      }
    )
    ds.push(
      {
        label: 'unallocated',
        backgroundColor: 'gray',
        stack: '0',
        data: [100 - this.getTotalFunds()]
      }
    )
    return ds;
  }





  updateCharts() {
    this.updateChart();
    this.updateAggAllocaiton();
    this.fundsBS.next(this.funds);

  }
  updateChart() {
    this.barChartData.labels = ['Fund Allocation'];
    this.barChartData.datasets = this.getDS();
    let barChartOption = {
      legend: {
        display: false
      },
      title: {
        display: false,
      },
      responsive: false,
      scales: {
        xAxes: [{
          display: false,
          barThickness: 20
        }],
        yAxes: [{
          display: false,
          barThickness: 20
        }]
      }
    }

    if (this.barChart) {
      this.barChart.update();
    }
    else {
      this.barChart = new Chart('canvas',
        {
          type: 'horizontalBar',
          data: this.barChartData,
          options: barChartOption
        }

      );
    }
  }
  constructor() {


  }

}
