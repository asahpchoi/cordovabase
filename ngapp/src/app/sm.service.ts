import { Injectable } from '@angular/core';

@Injectable()
export class SmService {

  public ScrollMagic : any;
  public controller :any;

  constructor(){

    this.ScrollMagic = require("scrollmagic");
    require("scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap");
    this.controller = new this.ScrollMagic.Controller();
    
  }
}
