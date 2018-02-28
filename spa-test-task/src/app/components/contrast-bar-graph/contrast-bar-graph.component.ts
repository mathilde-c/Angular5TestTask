import { Component, Input } from "@angular/core";

@Component({
    selector: "app-contrast-bar-graph",
    templateUrl: "./contrast-bar-graph.component.html",
    styleUrls: ["./contrast-bar-graph.component.css"]
})
export class ContrastBarGraphComponent {
    @Input() public pass: number;
    @Input() public fail: number;

    private get total(): number { return this.pass + this.fail; }

    public getPassRate(): number {
        return (this.total
            && this.total !== 0)
            ? (this.pass / this.total) * 100.0
            : 0;
    }
    public getFailRate(): number {
        return (this.total
            && this.total !== 0)
            ? (this.fail / this.total) * 100.0
            : 0;
    }

}
