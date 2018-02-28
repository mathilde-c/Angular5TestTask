import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";

import { CategoryAttributeFilterComponent } from "./category-attribute-filter.component";
import { AttributeType } from "../../models/attribute-type";
import { SelectedAttributeFilter } from "../../models/selected-attribute-filter";

describe("CategoryAttributeFilterComponent", () => {
    let component: CategoryAttributeFilterComponent;
    let fixture: ComponentFixture<CategoryAttributeFilterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CategoryAttributeFilterComponent],
            imports: [
                BrowserModule,
                BrowserAnimationsModule,
                FormsModule,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoryAttributeFilterComponent);
        component = fixture.componentInstance;
        component.defaultSelectedAttributeTypeId = null;
        component.attributeTypesList = [];
        component.attributeValuesList = [];
        fixture.detectChanges();
    });

    it("should create with empty inputs", () => {
        component.ngOnInit();
        expect(component).toBeTruthy();
    });

    it("should intialize on the first AttributeType in the list, when no defaultSelectedAttributeTypeId is provided", () => {
        component.defaultSelectedAttributeTypeId = null;
        component.attributeTypesList = [
            {
                DisplayOrder: 0,
                Name: "type2",
                TypeId: 2
            },
            {
                DisplayOrder: 1,
                Name: "type1",
                TypeId: 1
            }
        ];

        component.ngOnInit();

        expect(component.selectedTypeId).toEqual(2);
        expect(component.selectedTypeName).toEqual("type2");
    });

    it("should intialize on the defaultSelectedAttributeTypeId, when defaultSelectedAttributeTypeId is provided", () => {
        component.defaultSelectedAttributeTypeId = 1;
        component.attributeTypesList = [
            {
                DisplayOrder: 0,
                Name: "type2",
                TypeId: 2
            },
            {
                DisplayOrder: 1,
                Name: "type1",
                TypeId: 1
            }
        ];

        component.ngOnInit();

        expect(component.selectedTypeId).toEqual(1);
        expect(component.selectedTypeName).toEqual("type1");
    });

    it("should intialize the attributeValue to the first in the list of value for the selected type"
        + ", when list of AttributeValue is not empty", () => {
            component.defaultSelectedAttributeTypeId = 1;
            component.attributeTypesList = [
                {
                    DisplayOrder: 0,
                    Name: "type2",
                    TypeId: 2
                },
            ];
            component.attributeValuesList = [
                {
                    AttributeId: 32,
                    AttributeName: "Value 1",
                    Id: 4,
                }
            ];

            component.ngOnInit();

            expect(component.selectedValueId).toEqual(32);
        });

    it("should update on the selectedType, selectedTypeName and reset selectedValue to null, when selectedTypeId changes", () => {
        component.defaultSelectedAttributeTypeId = 1;
        component.attributeTypesList = [
            {
                DisplayOrder: 0,
                Name: "type2",
                TypeId: 2
            },
            {
                DisplayOrder: 1,
                Name: "type1",
                TypeId: 1
            }
        ];
        component.attributeValuesList = [
            {
                AttributeId: 32,
                AttributeName: "Value 1",
                Id: 4,
            }
        ];

        component.ngOnInit();
        component.selectedTypeId = 2;

        expect(component.selectedTypeId).toEqual(2);
        expect(component.selectedTypeName).toEqual("type2");
        expect(component.selectedValueId).toBeNull();
    });

    it("should emit \"EmitSelectAttributes\" event, when selectedTypeId changes", (done) => {
        component.defaultSelectedAttributeTypeId = 1;
        component.attributeTypesList = [
            {
                DisplayOrder: 0,
                Name: "type2",
                TypeId: 2
            },
            {
                DisplayOrder: 1,
                Name: "type1",
                TypeId: 1
            }
        ];
        component.id = 10;
        component.ngOnInit();
        const expectedselectedAttributes: SelectedAttributeFilter =
            new SelectedAttributeFilter(10, 2, null, "type2");
        let unsuscribe: boolean = true;

        component.onFiltersUpdated
            .takeWhile(() => unsuscribe)
            .subscribe((selectedAttributes: SelectedAttributeFilter) => {

                expect(selectedAttributes).toEqual(expectedselectedAttributes);
                unsuscribe = false;
                done();
            });

        component.selectedTypeId = 2;
    });

    it("should emit \"EmitSelectAttributes\" event, when selectedAttributeId changes", (done) => {
        component.defaultSelectedAttributeTypeId = 1;
        component.attributeTypesList = [
            {
                DisplayOrder: 0,
                Name: "type2",
                TypeId: 2
            },
            {
                DisplayOrder: 1,
                Name: "type1",
                TypeId: 1
            }
        ];
        component.attributeValuesList = [
            {
                AttributeId: 31,
                AttributeName: "Value 1",
                Id: 11,
            },
            {
                AttributeId: 32,
                AttributeName: "Value 2",
                Id: 44,
            }
        ];
        component.id = 10;
        component.ngOnInit();
        const expectedselectedAttributes: SelectedAttributeFilter =
            new SelectedAttributeFilter(10, 1, 32, "type1");
        let unsuscribe: boolean = true;

        component.onFiltersUpdated
            .takeWhile(() => unsuscribe)
            .subscribe((selectedAttributes: SelectedAttributeFilter) => {

                expect(selectedAttributes).toEqual(expectedselectedAttributes);
                unsuscribe = false;
                done();
            });

        component.selectedValueId = 32;
    });
});
