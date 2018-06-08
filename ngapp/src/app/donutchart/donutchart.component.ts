import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-donutchart',
  templateUrl: './donutchart.component.html',
  styleUrls: ['./donutchart.component.css']
})
export class DonutchartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    /*
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

        // If the chart's circumference isn't a full circle, calculate minSize as a ratio of the width/height of the arc
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
        console.log(me)
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


    let config = {
      type: 'explodedPie',
      data: {
        datasets: [{
          data: [12, 23, 10, 72],
          explodeSection: 3,
          backgroundColor: [
            'rgb(168, 187, 208)',
            'rgb(232, 241, 254)',
            'rgb(211, 225, 242)',
            'rgb(0, 37, 105)'
          ],
        }],
      },
      options: { explosionSize: 10 }
    };

    let e: any = document.getElementById("chart-area")
*/
    //var ctx = e.getContext("2d");
    //new Chart(ctx, config);

  }
}
