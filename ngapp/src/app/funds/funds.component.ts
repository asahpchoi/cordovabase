import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import * as $ from 'jquery';


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
  colors = ['#ffddee', '#cc00ee', '#ee0000', '#123456', '#938759', '#203128']

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

  customizeDonutChart(chart, e)
    {
     if(e.type!='click')
      return
     if (chart.config.type != "doughnut")
       return


     var addRadiusMargin = 10;
     var currentSelectedPieceLabel = "";

     let activePoints = chart.getElementsAtEvent(e);

     if (activePoints.length > 0) {
       //get the internal index of slice in pie chart
       let clickedElementindex = activePoints[0]["_index"];

       //get specific label by index
       let label = chart.data.labels[clickedElementindex];
       let value = chart.data.datasets[0].data[clickedElementindex];
       let width = chart.width,
         height = chart.height;

         console.log(chart.outerRadius)
         //chart.outerRadius = defaultRadiusMyChart;
         chart.update();
         // update selected pie
         console.log(activePoints[0]["_model"])
         activePoints[0]["_model"].outerRadius =  activePoints[0]["_model"].outerRadius * 1.2;
         activePoints[0]["_model"].innerRadius =  activePoints[0]["_model"].innerRadius * 0.9;
//console.log(activePoints[0]["_model"])



     }



  }

  updateDonutChart() {

    Chart.pluginService.register(
      {
        afterEvent: this.customizeDonutChart
        ,
        beforeDraw: function(chart) {

        }
      });

    this.donutChartData.labels = Object.keys(this.funds);
    this.donutChartData.datasets = [{
      data: [...Object.values(this.funds), 100 - this.getTotalFunds()],
      backgroundColor: this.colors
    }];
    let donutChartOption = {
      layout: {
        padding: 20
      },
      legend: {
        display: false
      },
      title: {
        display: false,
      },
      responsive: false,
      scales: {
          xAxes: [{display: false
                  }],
          yAxes: [{display: false
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

      this.draw();



    }
  }

  draw() {

    let ctx = this.donutChart.ctx;
    console.log(ctx)
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Hello World",0,0);
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
          xAxes: [{display: false
                  }],
          yAxes: [{display: false
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
