import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICar } from './car';
import { CarService } from './car.service';

@Component({
	selector: 'car',
	templateUrl: './car-details.component.html'
})
export class CarDetailsComponent implements OnInit {
	car: ICar = null;

	constructor(private _route: ActivatedRoute, private _carService: CarService) {}

	ngOnInit() {
		this._route.params.subscribe(params => {
			let registrationNumber = '' + params['registrationNumber'];
			this.getCar(registrationNumber);
		})
	}

	getCar(registrationNumber : String) {
		this._carService.getCar(registrationNumber).subscribe(car => this.car = car);
	}
}
