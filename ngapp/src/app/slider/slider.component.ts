import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
actionCls = "show"
  constructor() {
    var hammertime = new Hammer(document.body);
    hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    console.log(hammertime.get('swipe'))
  }

  ngOnInit() {
  }

  scroll(event) {
    console.log(event)
  }

  showdelete(cls) {
    console.log(this.actionCls)
    this.actionCls = cls

  }
}
