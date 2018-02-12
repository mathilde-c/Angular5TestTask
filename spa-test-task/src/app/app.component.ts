import { Component, OnInit } from '@angular/core';
import { DatesFilter } from './models/dates-filter';
import { AttributeType } from './models/attribute-type';
import { AttributeValue } from './models/attribute-value';
import { SelectedAttribute } from './models/selected-attribute';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular5 Test task';

  ngOnInit(): void {}
}
