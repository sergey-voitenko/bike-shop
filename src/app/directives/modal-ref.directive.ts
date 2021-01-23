import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appModalRef]'
})
export class ModalRefDirective {
  constructor(
    public containerRef: ViewContainerRef
  ) {}
}
