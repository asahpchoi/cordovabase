import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { debug } from 'util';

@Component({
  selector: 'app-donutchart-po-c',
  templateUrl: './donutchart-po-c.component.html',
  styleUrls: ['./donutchart-po-c.component.css']
})
export class DonutchartPoCComponent implements OnInit {
  es = 1;
  config;
  value;
  ctx;
  chart;
  colors = [
    'pink',
    'green',
    'lightblue',
    'red',
    'lightgreen',
    'yellow',
    'gray'
  ];
  data = [10, 10, 0, 0, 0, 20, 60];
  name = ['Money', 'Bond', 'Stock', 'Fund', 'Asia Fund', 'China Fund', 'Unallocated']

  constructor() { }



  ngOnInit() {

    const drawTextPlugin = {
      afterDatasetsDraw: function (chart, easing) {
        if(easing != 1) return;
        const context = chart.ctx;
        
        const meta = chart.getDatasetMeta(0); // first dataset is used to discover X coordinate of a point        
        let ds = chart.data.datasets;

        
        let index = +ds["0"].explodeSection;
        
        let label = chart.config.data.labels[index];
        let value = ds["0"].data[index] + '%';

        
        context.font = "14px Arial";
        context.fillStyle = "black";
        context.textAlign = "center";
        
        context.fillText(label , chart.chartArea.right / 2 ,  chart.chartArea.bottom / 2 - 10);
        context.fillText(value, chart.chartArea.right / 2 ,  chart.chartArea.bottom / 2 + 10);
      }
    }

    Chart.plugins.register(drawTextPlugin);


    let draw = Chart.elements.Arc.prototype.draw;
Chart.elements.Arc.prototype.draw = function () {
  var ctx = this._chart.ctx;
  var vm = this._view;
  var sA = vm.startAngle;
  var eA = vm.endAngle;
  var isExploded = vm.exploded === true;

  ctx.beginPath();
  ctx.arc(vm.x, vm.y, vm.outerRadius, sA, eA);
  ctx.arc(vm.x, vm.y, vm.innerRadius, eA, sA, true);
  ctx.closePath();
  if (isExploded) {
    ctx.save();
    ctx.fillStyle = vm.backgroundColor;
    ctx.lineWidth = 0;
    ctx.shadowColor = vm.backgroundColor;
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 0;
    ctx.fill();
    ctx.lineJoin = 'bevel';
    ctx.restore();
  } else {
    ctx.beginPath();
    ctx.arc(vm.x, vm.y, vm.outerRadius, sA, eA);
    ctx.arc(vm.x, vm.y, vm.innerRadius, eA, sA, true);
    ctx.closePath();
    ctx.strokeStyle = vm.borderColor;
    ctx.lineWidth = vm.borderWidth;
    ctx.fillStyle = vm.backgroundColor;
    ctx.fill();
    ctx.lineJoin = 'bevel';
    ctx.stroke();
  }
};


Chart.defaults.explodedPie = Chart.defaults.doughnut;

let custom = Chart.controllers.doughnut.extend({

  update: function (reset) {
    var me = this;
    var chart = me.chart;
    var chartArea = chart.chartArea;
    var opts = chart.options;
    var arcOpts = opts.elements.arc;
    var availableWidth = chartArea.right - chartArea.left - arcOpts.borderWidth - (opts.explosionSize * 2);
    var availableHeight = chartArea.bottom - chartArea.top - arcOpts.borderWidth - (opts.explosionSize * 2);
    var minSize = Math.min(availableWidth, availableHeight);
    var offset = { x: 0, y: 0 };
    var meta = me.getMeta();
    var cutoutPercentage = opts.cutoutPercentage;
    var circumference = opts.circumference;

    if (circumference < Math.PI * 2.0) {
      var startAngle = opts.rotation % (Math.PI * 2.0);
      startAngle += Math.PI * 2.0 * (startAngle >= Math.PI ? -1 : startAngle < -Math.PI ? 1 : 0);
      var endAngle = startAngle + circumference;
      var start = { x: Math.cos(startAngle), y: Math.sin(startAngle) };
      var end = { x: Math.cos(endAngle), y: Math.sin(endAngle) };
      var contains0 = (startAngle <= 0 && endAngle >= 0) || (startAngle <= Math.PI * 2.0 && Math.PI * 2.0 <= endAngle);
      var contains90 = (startAngle <= Math.PI * 0.5 && Math.PI * 0.5 <= endAngle) || (startAngle <= Math.PI * 2.5 && Math.PI * 2.5 <= endAngle);
      var contains180 = (startAngle <= -Math.PI && -Math.PI <= endAngle) || (startAngle <= Math.PI && Math.PI <= endAngle);
      var contains270 = (startAngle <= -Math.PI * 0.5 && -Math.PI * 0.5 <= endAngle) || (startAngle <= Math.PI * 1.5 && Math.PI * 1.5 <= endAngle);
      var cutout = cutoutPercentage / 100.0;
      var min = { x: contains180 ? -1 : Math.min(start.x * (start.x < 0 ? 1 : cutout), end.x * (end.x < 0 ? 1 : cutout)), y: contains270 ? -1 : Math.min(start.y * (start.y < 0 ? 1 : cutout), end.y * (end.y < 0 ? 1 : cutout)) };
      var max = { x: contains0 ? 1 : Math.max(start.x * (start.x > 0 ? 1 : cutout), end.x * (end.x > 0 ? 1 : cutout)), y: contains90 ? 1 : Math.max(start.y * (start.y > 0 ? 1 : cutout), end.y * (end.y > 0 ? 1 : cutout)) };
      var size = { width: (max.x - min.x) * 0.5, height: (max.y - min.y) * 0.5 };
      minSize = Math.min(availableWidth / size.width, availableHeight / size.height);
      offset = { x: (max.x + min.x) * -0.5, y: (max.y + min.y) * -0.5 };
    }

    chart.borderWidth = me.getMaxBorderWidth(meta.data);
    chart.outerRadius = Math.max((minSize - chart.borderWidth) / 2, 0);
    chart.innerRadius = Math.max(cutoutPercentage ? (chart.outerRadius / 100) * (cutoutPercentage) : 0, 0);
    chart.radiusLength = (chart.outerRadius - chart.innerRadius) / chart.getVisibleDatasetCount();
    chart.offsetX = offset.x * chart.outerRadius;
    chart.offsetY = offset.y * chart.outerRadius;

    meta.total = me.calculateTotal();

    me.outerRadius = chart.outerRadius - (chart.radiusLength * me.getRingIndex(me.index));
    me.innerRadius = Math.max(me.outerRadius - chart.radiusLength, 0);
    Chart.helpers.each(meta.data, function (arc, index) {
      me.updateElement(arc, index, reset);
    });
  },

  updateElement: function (arc, index, reset) {
    var me = this;
    var helpers = Chart.helpers;
    var chart = me.chart;
    var chartArea = chart.chartArea;
    var opts = chart.options;
    var animationOpts = opts.animation;
    var centerX = (chartArea.left + chartArea.right) / 2;
    var centerY = (chartArea.top + chartArea.bottom) / 2;
    var startAngle = opts.rotation; // non reset case handled later
    var endAngle = opts.rotation; // non reset case handled later
    var dataset = me.getDataset();
    var circumference = reset && animationOpts.animateRotate ? 0 : arc.hidden ? 0 : me.calculateCircumference(dataset.data[index]) * (opts.circumference / (2.0 * Math.PI));
    var innerRadius = reset && animationOpts.animateScale ? 0 : me.innerRadius;
    var explodedOuterRadius = (index === dataset.explodeSection) ? opts.explosionSize : 0;
    var outerRadius = reset && animationOpts.animateScale ? 0 : me.outerRadius + explodedOuterRadius;
    var valueAtIndexOrDefault = Chart.helpers.getValueAtIndexOrDefault;

    helpers.extend(arc, {
      // Utility
      _datasetIndex: me.index,
      _index: index,

      // Desired view properties
      _model: {
        x: centerX + chart.offsetX,
        y: centerY + chart.offsetY,
        startAngle: startAngle,
        endAngle: endAngle,
        circumference: circumference,
        outerRadius: outerRadius,
        innerRadius: innerRadius,
        exploded: (index === dataset.explodeSection),
        label: valueAtIndexOrDefault(dataset.label, index, chart.data.labels[index])
      }
    });

    var model = arc._model;
    // Resets the visual styles
    this.removeHoverStyle(arc);

    // Set correct angles if not resetting
    if (!reset || !animationOpts.animateRotate) {
      if (index === 0) {
        model.startAngle = opts.rotation;
      } else {
        model.startAngle = me.getMeta().data[index - 1]._model.endAngle;
      }

      model.endAngle = model.startAngle + model.circumference;
    }

    arc.pivot();
  }
});

Chart.controllers.explodedPie = custom;


let e: any = document.getElementById("chart-area")
this.ctx = e.getContext("2d");
this.update();

  }

updateData() {

  if (this.value == 5) {
    this.value = 10;
  }

  this.data[this.es] = this.value;
  let unallocated = this.data.pop();

  let total = this.data.reduce((p, v) => p + v, 0);

  if (total > 100) {
    this.data[this.es] -= total - 100;
    total = 100;
  }
  this.data.push(100 - +total);
  this.data.forEach(
    (v, i) => {
      this.chart.data.datasets[0].data[i] = v;
    }
  )
  this.chart.update();
  setTimeout(() => { this.value = this.data[this.es]; }, 100);
}

drawInfo() {
  this.ctx.font = "30px Arial";
  this.ctx.fillText("Hello World", 10, 50);
}

update(redraw ?) {
  this.config = {
    type: 'explodedPie',
    data: {
      datasets: [{
        data: this.data,

        explodeSection: +this.es,
        backgroundColor: this.colors
      }],
      labels: this.name,
    },
    options: {
      explosionSize: 10,
      legend: {
        display: false
      }
    }
  };
  if (!this.chart || redraw) {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart(this.ctx, this.config);
  }
  this.drawInfo();

}

}
