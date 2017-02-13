import { Component, OnInit } from '@angular/core';
import { IProperty } from './property';
import { PropertyService } from './property.service';

@Component({
	templateUrl: './property-list.component.html'
})
export class PropertyListComponent implements OnInit {
	properties: IProperty[];

	constructor(private _propertyService: PropertyService) {}

	ngOnInit() {
		this._propertyService.getProperties().subscribe(properties => this.properties = properties);
	}
}
