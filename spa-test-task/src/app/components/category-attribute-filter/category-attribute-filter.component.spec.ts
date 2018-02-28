import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CategoryAttributeFilterComponent } from "./category-attribute-filter.component";

describe("CategoryAttributeFilterComponent", () => {
  let component: CategoryAttributeFilterComponent;
  let fixture: ComponentFixture<CategoryAttributeFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryAttributeFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryAttributeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
