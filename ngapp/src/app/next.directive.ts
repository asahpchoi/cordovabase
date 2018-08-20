import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[nextfocus]'
})
export class NextDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) { 
    renderer.listen(el.nativeElement, 'keyup.Enter', (event) => {
      this.gotoNext(event)
    }) 
    renderer.listen(el.nativeElement, 'keyup', (event) => {
      //this.gotoNext(event)
    }) 
    renderer.listen(el.nativeElement, 'click', (event) => {
      console.log(event)
    }) 
  }

  gotoNext(e) {
    let elements: any = document.getElementsByClassName("mf");
    let nextItem;
 
    for (let i = 0; i < elements.length - 1; i++) {
      let item = elements[i];
      console.log(e)
      if (item.id == e["srcElement"].id) {
        setTimeout(
          () => {
            nextItem = elements[i + 1];
            nextItem.focus(); 
            //this.renderer.
           // .invokeElementMethod(nextItem, 'dispatchEvent', [new MouseEvent('click')]);
          }, 100, true
        )
      }
    }
  }

}
