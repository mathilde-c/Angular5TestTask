import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[appAttributesFilterContainer]"
})
export class AttributesFilterContainerDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
