import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})
export class FundsComponent implements OnInit {
  chart;
  fundoption = [];
  funds = {
    fund1: 0,
    fund2: 0,
    fund3: 0,
    fund4: 0,
    fund5: 0
  }

  getTotalFunds() {
    return  Object.values(this.funds).reduce((a, b) => a + b, 0)
  }

  getOptions(value) {
    let options = []
    let max = Math.max(100 + value - this.getTotalFunds(), value);

    for(var i = 10; i <= max; i += 5) {
      options.push(i)
    }
    return options
  }

  getfunds() {
    return Object.keys(this.funds);
  }

  colors = ['green', 'red', 'blue', 'yellow', 'gray']

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

 barChartData = {
    labels: ['Funds'],
    datasets: []
  };

  updateChart() {
    this.barChartData.datasets = this.getDS();

    this.chart = new Chart('canvas',
    {
				type: 'horizontalBar',
				data: this.barChartData,
				options: {
					title: {
						display: false,

					},

					responsive: true,
					scales: {
						xAxes: [{
							stacked: true,
						}],
						yAxes: [{
							stacked: true
						}]
					}
				}
			}

    );
  }
  constructor() { }

  ngOnInit() {
    for(var i = 2; i <= 20; i++ ) {
      this.fundoption.push(i*5);
    }

  }

}
