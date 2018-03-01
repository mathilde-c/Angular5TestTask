import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { MockComponent } from "ng2-mock-component/index";

import { AppComponent } from "./app.component";

describe("AppComponent", () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                MockComponent({ selector: "app-filters" }),
                MockComponent({ selector: "app-search-result" }),
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create the app", async(() => {
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it(`should have as title 'Welcome to Angular5 Test task!'`, async(() => {
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual("Angular5 Test task");
    }));

    it("should render title in a h1 tag", async(() => {
        const appElement = fixture.debugElement.nativeElement;
        expect(appElement.querySelector("h1").textContent).toContain("Welcome to Angular5 Test task!");
    }));

    it("should contain <app-filters> component", async(() => {
        const appElement = fixture.debugElement.nativeElement;
        expect(appElement.querySelector("app-filters")).toBeTruthy();
    }));

    it("should contain <app-search-result> component", async(() => {
        const appElement = fixture.debugElement.nativeElement;
        expect(appElement.querySelector("app-search-result")).toBeTruthy();
    }));
});
