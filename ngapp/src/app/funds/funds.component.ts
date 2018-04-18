import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})
export class FundsComponent {
  barChart;
  barChartData = {
    label: [],
    datasets: []
  };

  donutChart;
  donutChartData = {
    label: [],
    datasets: []
  };
  funds = {
    fund1: 0,
    fund2: 0,
    fund3: 0,
    fund4: 0,
    fund5: 0
  }
  colors = ['green', 'red', 'blue', 'yellow', 'gray']

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
    return ds;
  }

  getDonutDS() {
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
    return ds;
  }

  updateDonutChart() {
    this.donutChartData.labels = Object.keys(this.funds);
    this.donutChartData.datasets = [{
       data: Object.values(this.funds),
       backgroundColor: this.colors;
    }];
    let donutChartOption = {
      legend: {
        display: false
      },
      title: {
        display: false,
      },
      responsive: false,
      scales: {
        xAxes: [{
          stacked: true,
          barPercentage: 0.4,
          ticks: {
            min: 0,
            max: 100,
            stepSize: 20
          }
        }],
        yAxes: [{
          barPercentage: 0.2,
          stacked: true
        }]
      }
    }

    if (this.donutChart) {
      this.donutChart.update();
    }
    else {
      this.donutChart = new Chart('canvas2',
        {
          type: 'doughnut',
          data: this.donutChartData,
          options: donutChartOption
        }

      );
    }
  }
  updateCharts() {
    this.updateChart();
    this.updateDonutChart();
  }
  updateChart() {
    this.barChartData.label = ['Fund Allocation'];
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
          stacked: true,
          barPercentage: 0.4,
          ticks: {
            min: 0,
            max: 100,
            stepSize: 20
          }
        }],
        yAxes: [{
          barPercentage: 0.2,
          stacked: true
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
  constructor() { }

}
