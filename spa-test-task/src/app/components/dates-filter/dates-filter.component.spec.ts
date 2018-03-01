import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MAT_DATE_LOCALE,
    DateAdapter,
    MAT_DATE_FORMATS
} from "@angular/material";
import {
    MatMomentDateModule,
    MomentDateAdapter,
    MAT_MOMENT_DATE_FORMATS
} from "@angular/material-moment-adapter";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { DatesFilterComponent } from "./dates-filter.component";
import { DatesFilter } from "../../models/dates-filter";
import * as moment from "moment/moment";
import { Moment } from "moment/moment";

describe("DatesFilterComponent", () => {
    let component: DatesFilterComponent;
    let fixture: ComponentFixture<DatesFilterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DatesFilterComponent],
            imports: [
                BrowserModule,
                BrowserAnimationsModule,
                FormsModule,
                MatDatepickerModule,
                MatMomentDateModule,
                MatNativeDateModule,
                MatFormFieldModule,
                MatInputModule,
            ],
            providers: [
                { provide: MAT_DATE_LOCALE, useValue: "fr-FR" },
                { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
                { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
            ],

        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DatesFilterComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });

    it("should be initialized to current month", () => {
        const currentMonth: number = new Date(Date.now()).getMonth();

        expect(component.from.month()).toEqual(currentMonth);
        expect(component.to.month()).toEqual(currentMonth);
    });

    it("should emit datefilter when value is updated", (done) => {
        const newEndDate: Moment = moment(Date.now());
        newEndDate.month(10);
        const expectedDateFilter: DatesFilter = new DatesFilter(
            new Date(component.from.unix()).getTime() * 1000,
            new Date(newEndDate.unix()).getTime() * 1000);
        let unsuscribe: boolean = true;

        component.notifyDatesChanges
            .takeWhile(() => unsuscribe)
            .subscribe((datesFilter: DatesFilter) => {

                expect(datesFilter).toEqual(expectedDateFilter);
                unsuscribe = false;
                done();
            });

        component.to = newEndDate;
    });
});
