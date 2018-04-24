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
      // --- apo: code start ---
      Chart.defaults.extendedDoughnut = Chart.helpers.clone(Chart.defaults.doughnut);
      Chart.controllers.extendedDoughnut = Chart.controllers.doughnut.extend({
        activeElements: { // fix: lastActive & active are always the same in chartJS
          current: undefined,
          last: undefined,
        },
        highlightScaleUp: 1.08, // define zoom value for highlighted arc
        drawDonutArc: function(ctx, view, easingValue){
          ctx.shadowColor = `rgba(0,0,0,${.4*easingValue})`;
          ctx.shadowBlur = 30*easingValue;
          ctx.shadowOffsetX = 2*easingValue;
          ctx.shadowOffsetY = 2*easingValue;
          ctx.fillStyle = view.backgroundColor;
          ctx.beginPath();
          ctx.arc(view.x, view.y, view.outerRadius * (1 + (this.highlightScaleUp-1) * easingValue), view.startAngle, view.endAngle);
          ctx.arc(view.x, view.y, view.innerRadius, view.endAngle, view.startAngle, true);
          ctx.closePath();
          ctx.fill();
          // draw arrow
          ctx.shadowColor = 'rgba(0,0,0,0)';
          ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          ctx.beginPath();
          let len = .2,
              wid = 0.2*easingValue,
              ang = (view.endAngle+view.startAngle)/2,
              rad = view.innerRadius - (view.innerRadius*len*easingValue),
              start_ang = ang-wid,
              end_ang = ang+wid;
          ctx.arc(view.x, view.y, view.innerRadius, start_ang, end_ang);
          ctx.lineTo(view.x+ Math.cos(ang) *rad, view.y + Math.sin(ang) * rad);
          ctx.fill();
        },
        drawChart: function(easingValue) {
          let ctx = this.chart.chart.ctx,
              active = undefined;
          if (this.chart.active && this.chart.active.length>0) {
            active = this.chart.active[0];
            if (this.activeElements.active!=active){
              this.activeElements.last = this.activeElements.active;
              this.activeElements.active = active;
            }
          }
          else {
            this.activeElements.last = this.activeElements.active;
            this.activeElements.active = undefined;
          }
          ctx.save();
          let scaledown = 1/this.highlightScaleUp;
          ctx.scale(scaledown, scaledown); // zoom out chart to prevent arc goes out of stage
          ctx.translate(((1-scaledown)*this.outerRadius)/2,((1-scaledown)*this.outerRadius)/2); // center align
          Chart.helpers.each(this.getMeta().data, (arc, index)=>{
            let vm = arc._view;
            if (this.activeElements.last && 
                index==this.activeElements.last._index && 
                (active && active._index!=this.activeElements.last._index)
            ) { // rollback last active element
              this.drawDonutArc(ctx, this.activeElements.last._model, 1-easingValue);
            }
            else if (!active || index!=active._index) { // ignore active element
              let vm = arc._view;
              ctx.fillStyle = vm.backgroundColor;  
              ctx.beginPath();
              ctx.arc(vm.x, vm.y, vm.outerRadius, vm.startAngle, vm.endAngle);
              ctx.arc(vm.x, vm.y, vm.innerRadius, vm.endAngle, vm.startAngle, true);
              ctx.closePath();
              ctx.fill();
            }
          });
          if (active) this.drawDonutArc(ctx, active._model, easingValue); // active element always on top 
          ctx.restore();
        },
        draw: function(easingValue) {
          this.drawChart(easingValue);
        },
      });
      this.donutChart = new Chart('canvas2',
        {
          type: 'extendedDoughnut',
          data: this.donutChartData,
          options: donutChartOption
        }
      );
      // --- apo: code end ---
    }
  }

  updateCenter(event,item) {
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

      // apo: move these into draw method
      // chart.update();
      // active["_model"].outerRadius = active["_model"].outerRadius * 1.08; 
      // // active["_model"].innerRadius = active["_model"].innerRadius * 0.9;

      let info = chart.data.labels[clickedElementindex] + ' <br> ' + chart.data.datasets["0"].data[clickedElementindex] + '%'
      $('#label').html(info);
      $("#label").css({top: height/2, left: width/2, position:'absolute'});
    }
  }


}
