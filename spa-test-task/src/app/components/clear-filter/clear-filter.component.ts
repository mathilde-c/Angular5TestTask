import { Component, OnInit, EventEmitter, Output } from "@angular/core";

@Component({
    selector: "app-clear-filter",
    templateUrl: "./clear-filter.component.html",
    styleUrls: ["./clear-filter.component.css"]
})
export class ClearFilterComponent {
    @Output() public clearFiltersTriggered: EventEmitter<boolean> = new EventEmitter<boolean>();
}
