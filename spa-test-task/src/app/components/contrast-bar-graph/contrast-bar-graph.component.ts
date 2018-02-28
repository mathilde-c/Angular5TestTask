import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-contrast-bar-graph",
    templateUrl: "./contrast-bar-graph.component.html",
    styleUrls: ["./contrast-bar-graph.component.css"]
})
export class ContrastBarGraphComponent implements OnInit {
    @Input() public pass: number;
    @Input() public fail: number;

    private total: number;

    public ngOnInit(): void {
        this.total = this.pass + this.fail;
    }

    public getPassRate(): number {
        return this.total !== 0
            ? (this.pass / this.total) * 100.0
            : 0;
    }
    public getFailRate(): number {
        return this.total !== 0
            ? (this.fail / this.total) * 100.0
            : 0;
    }

}
