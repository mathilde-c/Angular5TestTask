import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ContrastBarGraphComponent } from "./contrast-bar-graph.component";

describe("ContrastBarGraphComponent", () => {
    let component: ContrastBarGraphComponent;
    let fixture: ComponentFixture<ContrastBarGraphComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ContrastBarGraphComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContrastBarGraphComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should compute correct ration for pass when total is not zero", () => {
        component.pass = 7;
        component.fail = 3;
        expect(component.getPassRate()).toEqual(70);
    });

    it("should compute correct ration for pass when total is not zero", () => {
        component.pass = 7;
        component.fail = 7;
        expect(component.getFailRate()).toEqual(50);
    });

    it("should return 0 for pass when total fail + pass is zero", () => {
        component.pass = 0;
        component.fail = 0;
        expect(component.getPassRate()).toEqual(0);
    });

    it("should return 0 for fail when total fail + pass is zero", () => {
        component.pass = 0;
        component.fail = 0;
        expect(component.getFailRate()).toEqual(0);
    });

    it("should return 0 for pass when total fail or pass is undefined", () => {
        component.fail = 20;
        expect(component.getPassRate()).toEqual(0);
    });

    it("should return 0 for fail when total fail or pass is undefined", () => {
        component.pass = 0.5;
        expect(component.getFailRate()).toEqual(0);
    });
});
