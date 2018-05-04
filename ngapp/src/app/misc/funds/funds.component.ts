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


  fundName = {
    VNAGR: 'Aggressive',
    VNGRW: 'Growth',
    VNBAL: 'Balanced',
    VNDIV: 'Diversified',
    VNFIX: 'Fixed Income',
    VNMMK: 'Money Market',
  }
  input = {
    funds: {
      VNAGR: 0,
      VNGRW: 20,
      VNBAL: 30,
      VNDIV: 10,
      VNFIX: 0,
      VNMMK: 0
    }
  }
  fundROI = {
    VNAGR: [1.3,8.7],
    VNGRW: [1.8,8.0],
    VNBAL: [2.4,7.4],
    VNDIV: [3.3,6.5],
    VNFIX: [3.9,5.9],
    VNMMK: [3,5],
  }
  fundsBS: BehaviorSubject<any> = new BehaviorSubject(this.input.funds);
  colors = ['lightblue', 'lightgreen', 'lightpink', 'RosyBrown', 'LightSalmon', 'MediumAquaMarine', 'green']
  agAllocation = [0, 0];

  updateAggAllocaiton() {
    this.agAllocation = [0, 0];
    Object.keys(this.input.funds).forEach(f => {
      this.agAllocation[0] += this.fundROI[f][0] * this.input.funds[f] / this.getTotalFunds();
      this.agAllocation[1] += this.fundROI[f][1] * this.input.funds[f] / this.getTotalFunds();
    })
    this.agAllocation = this.agAllocation.map(
      a => Math.round(a * 10 ) / 10 
    )
    return this.agAllocation;
  }

  getTotalFunds() {
    return Object.values(this.input.funds).reduce((a, b) => a + b, 0)
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
    return Object.keys(this.input.funds);
  }

  getDS() {
    let ds = Object.keys(this.input.funds).map(
      (x, i) => {
        return {
          label: x,
          backgroundColor: this.colors[i],
          stack: '0',
          data: [this.input.funds[x]]
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
    this.fundsBS.next(this.input.funds);

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
