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
 
        var tween2 = TweenMax.to("#player", 1, { x: -100, y: -100, scale: 0.5 });
        var tween3 = TweenMax.to("#s1", 2, { x: 100, y: 100 });
        timeline  
            .add(tween2)
            .add(tween3)

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
            loop: false
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
        console.log(this.anim.getDuration(true));
       // this.anim.pause(false);
        this.anim.goToAndPlay(35, true);
    }



    setSpeed(speed: number) {
        this.animationSpeed = speed;
        this.anim.setSpeed(speed);
    }

}
