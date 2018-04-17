import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
actionCls = "show"
  constructor() { }

  ngOnInit() {
  }

  showdelete(cls) {
    console.log(this.actionCls)
    this.actionCls = cls

  }
}
