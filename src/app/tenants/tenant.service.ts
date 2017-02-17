import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/find';
import 'rxjs/add/observable/of';

import { ConfigService } from '../config.service';
import { ITenant } from './tenant';

@Injectable()
export class TenantService {
	private url = '/tenants';

	constructor(private http: Http, private config: ConfigService) {}

	getAllTenants(): Observable<ITenant[]> {
		var _url: string = this.config.getServiceUrl() + this.url;
	  return this.http.get(_url).map((response: Response) => {
			var body = response.json()
			return <ITenant[]> body.content;
		});
	}

	getTenants(propertyId: string): Observable<ITenant[]> {
		return this.getAllTenants().map((tenants: ITenant[]) => tenants.filter(t => t.propertyId == propertyId));
	}

	findTenantById(id: string): Observable<ITenant> {
		return this.getAllTenants()
			.map((tenants: ITenant[]) => tenants.find(p => p.id == id));
	}

	findTenantByHash(hash: string): Observable<ITenant> {
		return this.getAllTenants()
			.map((tenants: ITenant[]) => tenants.find(p => p.hash == hash));
	}
}
