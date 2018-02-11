import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatesFilterComponent } from './dates-filter.component';

describe('DatesFilterComponent', () => {
  let component: DatesFilterComponent;
  let fixture: ComponentFixture<DatesFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatesFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
