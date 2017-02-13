import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { ICar } from './car';

@Injectable()
export class CarService {
	private _url = 'api/cars/cars.json';

	constructor(private _http: Http) {}

	getCars(): Observable<ICar[]> {
		return this._http.get(this._url).map((response: Response) => <ICar[]> response.json());
	}

	getCar(regNo: String): Observable<ICar> {
		return this.getCars()
			.map((cars: ICar[]) => cars.find(c => c.registrationNumber === regNo));
	}
}
