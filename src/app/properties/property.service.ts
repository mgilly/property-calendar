import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { IProperty } from './property';

@Injectable()
export class PropertyService {
	private _url = 'api/properties/properties.json';

	constructor(private _http: Http) {}

	getProperties(): Observable<IProperty[]> {
		return this._http.get(this._url).map((response: Response) => <IProperty[]> response.json());
	}

	getProperty(id: number): Observable<IProperty> {
		return this.getProperties()
			.map((properties: IProperty[]) => properties.find(p => p.id === id));
	}
}
