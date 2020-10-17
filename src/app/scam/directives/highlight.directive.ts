import { Directive, ElementRef, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  private appHighlight: string;
  private appHighlightTerm: string;

  constructor(private element: ElementRef) {
  }

  @Input('appHighlight') set setAppHighlight(value: string) {
    this.appHighlight = value;
    this.update();
  }

  @Input('appHighlightTerm') set setAppHighlightTerm(value: string) {
    this.appHighlightTerm = value;
    this.update();
  }

  private update() {
    this.element.nativeElement.innerHTML = this.appHighlight;
    if (!this.appHighlightTerm || !this.appHighlight) {
      return;
    }
    const index = this.appHighlight.toLowerCase().indexOf(this.appHighlightTerm.toLowerCase());
    if (index === -1) {
      return;
    }
    this.element.nativeElement.innerHTML = [
      this.appHighlight.slice(0, index),
      '<span class="color-accent">',
      this.appHighlight.slice(index, index + this.appHighlightTerm.length),
      '</span>',
      this.appHighlight.slice(index + this.appHighlightTerm.length)
    ].join('');
  }
}

@NgModule({
  declarations: [HighlightDirective],
  exports: [HighlightDirective],
  imports: [
    CommonModule,
  ]
})
export class HighlightDirectiveModule {
}
