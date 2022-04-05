import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: '[greentext]'
})
export class GreenTextDirective {
  constructor(private el: ElementRef) {
    el.nativeElement.style.color = 'green'
  }
}