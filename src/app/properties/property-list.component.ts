import { Component, OnInit } from '@angular/core';
import { IProperty } from './property';
import { PropertyService } from './property.service';
import { AuthService } from '../authn/auth.service';

@Component({
	templateUrl: './property-list.component.html'
})
export class PropertyListComponent implements OnInit {
	properties: IProperty[];

	constructor(private _propertyService: PropertyService, private auth: AuthService) {}

	ngOnInit() {
		this._propertyService.getProperties().subscribe(properties => this.properties = properties);
	}
}
