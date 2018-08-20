import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { TweenMax, TimelineMax } from "gsap";

 
declare var ScrollMagic: any;

@Component({
    selector: 'app-lottie',
    templateUrl: './lottie.component.html',
    styleUrls: ['./lottie.component.css']
})
export class LottieComponent implements AfterViewInit {

    @ViewChild("test") test: ElementRef;

    ngAfterViewInit() {
 
        let controller = new ScrollMagic.Controller();
 

            var scene = new ScrollMagic.Scene({
                triggerElement: "#trigger1"
              })
              .setTween("#player", 0.5, {backgroundColor: "yellow", scale: 0.7}) // trigger a TweenMax.to tween
              .addIndicators({name: "1 (duration: 0)"}) // add indicators (requires plugin)
              .addTo(controller);
    }


    public lottieConfig: Object;
    private anim: any;
    private animationSpeed: number = 1;

    constructor() {
        this.lottieConfig = {
            path: 'assets/data.json',
            autoplay: true,
            loop: true
        };
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
