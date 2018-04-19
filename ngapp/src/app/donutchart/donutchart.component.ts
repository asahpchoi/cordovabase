import { Input, Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as $ from 'jquery';

@Component({
  selector: 'app-donutchart',
  templateUrl: './donutchart.component.html',
  styleUrls: ['./donutchart.component.css']
})
export class DonutchartComponent implements OnInit {
  @Input()
  bs;

  data;



  colors = ['lightblue', 'lightgreen', 'lightpink', 'RosyBrown', 'LightSalmon', 'MediumAquaMarine']
  donutChart;
  donutChartData = {
    labels: [],
    datasets: []
  };


  ngOnInit() {
    this.bs.subscribe(data => {
      if (data) {
        this.data = data;
        this.updateDonutChart();
      }
    });

  }


  constructor() {

  }

  getDonutDS() {
    let ds = Object.keys(this.data).map(
      (x, i) => {
        return {
          label: x,
          backgroundColor: this.colors[i],
          stack: '0',
          data: [this.data[x]]
        }
      }
    )
    return ds;
  }



  updateDonutChart() {
    this.donutChartData.labels = [...Object.keys(this.data), 'unallocated'];
    this.donutChartData.datasets = [{
      data: [...Object.values(this.data), 10],
      backgroundColor: this.colors
    }];
    let donutChartOption = {
      layout: {
        padding: 10
      },
      legend: {
        display: false
      },
      title: {
        display: false,
      },
      responsive: false,
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      },
      'onClick': this.updateCenter
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

  updateCenter() {
    let chart: any = this;

    if (chart.active.length > 0) {
      let active = chart.active[0];


      //get the internal index of slice in pie chart
      let clickedElementindex = active["_index"];

      //get specific label by index
      let label = chart.data.labels[clickedElementindex];
      let value = chart.data.datasets[0].data[clickedElementindex];
      let width = chart.width,
        height = chart.height;

      chart.update();

      active["_model"].outerRadius = active["_model"].outerRadius * 1.08;
      //active["_model"].innerRadius = active["_model"].innerRadius * 0.9;

      let info = chart.data.labels[clickedElementindex] + ' <br> ' + chart.data.datasets["0"].data[clickedElementindex] + '%'
      $('#label').html(info);
      $("#label").css({top: height/2, left: width/2, position:'absolute'});
    }
  }


}
