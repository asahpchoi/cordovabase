import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TweenMax, TimelineMax } from "gsap";

@Component({
  selector: 'app-p1',
  templateUrl: './p1.component.html',
  styleUrls: ['./p1.component.css']
})
export class P1Component {

  @ViewChild("test") test: ElementRef;
  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1;

  constructor() {
    this.lottieConfig = {
      path: 'assets/stopwatch.json',
      autoplay: true,
      loop: true
    };
  }

  ngOnInit() {
  }
  handleAnimation(anim: any) {
    this.anim = anim;
  }

  stop() {
    this.anim.stop();
  }

  play() {
    this.anim.play();
  }

  pause() {
    this.anim.pause();
  }

  setSpeed(speed: number) {
    this.animationSpeed = speed;
    this.anim.setSpeed(speed);
  }
}
