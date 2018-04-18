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
    Chart.pluginService.register(
      {
        afterEvent: function(chart, e) {

            if (chart.config.type != "doughnut")
              return


            console.log('as', e);
            var width = chart.chart.width,
              height = chart.chart.height,
              ctx = chart.chart.ctx;

            ctx.restore();
            var fontSize = (height / 114).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "middle";

            var text = "75%",
              textX = Math.round((width - ctx.measureText(text).width) / 2),
              textY = height / 2;

            ctx.fillText(text, textX, textY);
            ctx.save();
        },
        beforeDraw: function(chart) {

        }
      });
    this.donutChartData.labels = Object.keys(this.funds);
    this.donutChartData.datasets = [{
      data: Object.values(this.funds),
      backgroundColor: this.colors
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

        }],
        yAxes: [{

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
  constructor() {
  }

}
