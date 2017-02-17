import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { ConfigService } from '../config.service';
import { IProperty } from './property';

@Injectable()
export class PropertyService {
	private url = '/properties';

	constructor(private http: Http, private config: ConfigService) {}

	getProperties(): Observable<IProperty[]> {
		var _url: string = this.config.getServiceUrl() + this.url;
	  return this.http.get(_url).map((response: Response) => {
			var body = response.json()
			return <IProperty[]> body.content;
		});
	}

	getProperty(id: string): Observable<IProperty> {
		return this.getProperties().map((properties: IProperty[]) => properties.find(p => p.id == id));
	}
}
