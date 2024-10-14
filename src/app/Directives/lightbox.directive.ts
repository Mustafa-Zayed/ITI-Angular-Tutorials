import { Directive, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[Lightbox]'
})
export class LightboxDirective implements OnChanges, OnInit{
  
  @Input('Lightbox') 
  public hoverColor : string =''
  
  @Input()
  public defaultColor : string ='red'

  // take a refernece of the element and pass to the constructor and set up the directive work.
  // ElementRef is a wrapper class in Angular that represents any element in the DOM.
  constructor(private elemRef : ElementRef) {
    // nativeElement to get the actual DOM element
    // elemRef.nativeElement.style.border = `2px solid ${this.defaultColor}`;
  }
  
  // ngOnChanges() method is called when the directive's inputs change.
  ngOnChanges(changes: SimpleChanges): void {
    this.elemRef.nativeElement.style.border = `2px solid ${this.defaultColor}`;
    // console.log(changes);
  }
  
  ngOnInit(): void {
    // this.elemRef.nativeElement.style.border = `2px solid ${this.defaultColor}`;
  }

  // @HostListener : It's a method decorator that declares a DOM event to listen for, 
  // and provides a handler method to run when that event occurs.
  @HostListener('mouseover')
  onMouseOver() {
    this.elemRef.nativeElement.style.border = `3px solid ${this.hoverColor}`;
  }
  
  @HostListener('mouseout')
  onMouseOut() {
    this.elemRef.nativeElement.style.border = `2px solid ${this.defaultColor}`;
  }
}
