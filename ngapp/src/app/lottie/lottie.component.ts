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

        var timeline = new TimelineMax();
        var tween1 = TweenMax.to("#player", 1, { scale: 0.5 });
        var tween2 = TweenMax.to("#player", 1, { x: -100 });
        timeline
            .add(tween1)
            .add(tween2);

        var scene = new ScrollMagic.Scene({
            triggerElement: "#trigger1"
        }).setTween(timeline
        )
            .addIndicators({ name: "1 (duration: 0)" }) // add indicators (requires plugin)
            .addTo(controller);
    }


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
