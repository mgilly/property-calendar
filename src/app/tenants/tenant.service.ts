import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/find';
import 'rxjs/add/observable/of';


import { ITenant } from './tenant';

@Injectable()
export class TenantService {
	private _url = 'api/tenants.json';

	constructor(private _http: Http) {}

	getAllTenants(): Observable<ITenant[]> {
		return this._http.get(this._url).map((response: Response) => <ITenant[]> response.json());
	}

	getTenants(propertyId: number): Observable<ITenant[]> {
		return this.getAllTenants().map((tenants: ITenant[]) => tenants.filter(p => p.propertyId === propertyId));
	}

	findTenantById(id: number): Observable<ITenant> {
		return this.getAllTenants()
			.map((tenants: ITenant[]) => tenants.find(p => p.id === id));
	}

	findTenantByHash(hash: string): Observable<ITenant> {
		return this.getAllTenants()
			.map((tenants: ITenant[]) => tenants.find(p => p.hash == hash));
	}
}
