import { Component, OnInit } from '@angular/core';
import 'intersection-observer';
import * as scrollama from 'scrollama'; // or...
import * as d3 from 'd3';
import * as Stickyfill from 'stickyfilljs';

@Component({
  selector: 'app-scrollama',
  templateUrl: './scrollama.component.html',
  styleUrls: ['./scrollama.component.css']
})
export class ScrollamaComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
    // instantiate the scrollama
    const scroller = scrollama();
    this.setupStickyfill()

    // setup the instance, pass callback functions
    scroller.setup({
      container: '#scroll',
      graphic: '.scroll__graphic',
      text: '.scroll__text',
      step: '.scroll__text .step',
      debug: true,
    })
      .onStepEnter(this.handleStepEnter)
    //.onStepExit(handleStepExit);
  }

  setupStickyfill() {

    d3.selectAll('.sticky').each(function () {
      
      Stickyfill.add(this);
    });
  }

  handleStepEnter(response) {
    var container = d3.select('#scroll');
    var graphic = container.select('.scroll__graphic');
    var chart = graphic.select('.chart');
    var text = container.select('.scroll__text');
    var step = text.selectAll('.step');

    var chartMargin = 32;
    var chartWidth = graphic.node().offsetWidth - chartMargin;

    chart
      .style('width', chartWidth + 'px')
      .style('height', Math.floor(window.innerHeight / 2) + 'px');

    // response = { element, direction, index }

    // add color to current step only
    step.classed('is-active', function (d, i) {
      return i === response.index;
    })

    // update graphic based on step
    chart.select('p').text(response.index + 1)


  }


}
