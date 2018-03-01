import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import "rxjs/add/operator/takeWhile";

import { ClearFilterComponent } from "./clear-filter.component";

describe("ClearFilterComponent", () => {
    let component: ClearFilterComponent;
    let fixture: ComponentFixture<ClearFilterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ClearFilterComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClearFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        document.body.removeChild(fixture.debugElement.nativeElement);
        fixture.destroy();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });

    it("should emit \"clearFiltersTriggered\" event when clicked ", (done) => {
        let unsuscribe: boolean = true;
        component.clearFiltersTriggered
            .takeWhile(() => unsuscribe)
            .subscribe(event => {
                expect(event).toBeTruthy();
                unsuscribe = false;
                done();
            });

        const button = document.querySelector("button") as HTMLElement;

        button.click();
    });
});
