import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-chart',
  templateUrl: './report-chart.component.html',
  styleUrls: ['./report-chart.component.css']
})
export class ReportChartComponent implements OnInit {
  items = [
    { value: 15 },
    { value: 20 },
  ]
  input = [
    { r: 1, c: 1, v: 1000000, label: 'Immedaite Needs' },
    { r: 1, c: 2, v: 1000000, label: 'Future Needs', shift: 1 },
    { r: 2, c: 1, v: 600000, label: 'Current Assets' },
    { r: 2, c: 2, v: 150000, label: 'Current Life Insurance' },
    { r: 2, c: 3, v: 1250000, label: 'Current short fall' },
    { r: 3, c: 1, v: 750000, label: '', shift: -1 },
    { r: 3, c: 2, v: 250000, label: 'Base Protection', shift: -1 },
    { r: 3, c: 3, v: 800000, label: 'Term Protection', shift: -1 },
    { r: 3, c: 4, v: 200000, label: 'Short fall', shift: -1 },
  ]
  barData = [];

  constructor() { }

  getStart(r, c) {
    let input = this.input;
    return input.filter(
      i => (i.r == r) && (i.c < c)
    ).map(i => i.v).reduce((p, v) => +p + +v, 0);
  }
  update() {
    let input: any = this.input;
    let scale = this.input.filter(x => x.r == 1).map(x => x.v).reduce((p, v) => +p + +v, 0);
    console.log(scale)

    this.barData = input.map(
      (i, idx) => {
        return {
          x: this.getStart(i.r, i.c) / scale * 200,
          y: i.r * 40 - 10,
          value: i.v,
          width: i.v / scale * 200,
          color: this.colors[idx],
          point: i.shift ? (i.c - 1 + i.shift) * 70 : (i.c - 1) * 70,
          delta: i.c,
          label: i.label
        }
      }
    )
    console.log(this.barData)
  }

  colors = ['#FF5D55',
    '#FF8C86',
    '#00AA59',
    '#B8E986',
    '#F5F5F5',
    'white',
    '#006FF1',
    '#5ACFD6',
    '#F5F5F5',]

  ngOnInit() {


  }

  getD(item: any) {
    let len = +item.point < +item.x ? +item.point - +item.x : +item.point - +item.x + 40;
    let delta = +item.point < +item.x ? item.delta : 4 - item.delta
    return "M " + item.x + " " + item.y + " l 0 -" + delta + " l " + len + " 0";
  }

}
