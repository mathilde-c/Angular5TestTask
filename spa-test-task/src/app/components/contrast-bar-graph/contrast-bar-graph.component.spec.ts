import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ContrastBarGraphComponent } from "./contrast-bar-graph.component";

describe("ContrastBarGraphComponent", () => {
  let component: ContrastBarGraphComponent;
  let fixture: ComponentFixture<ContrastBarGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContrastBarGraphComponent ]
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
});
