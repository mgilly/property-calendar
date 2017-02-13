import { Component, OnInit } from '@angular/core';
import { ICar } from './car';
import { CarService } from './car.service';

@Component({
	selector: 'car-list',
	templateUrl: './car-list.component.html'
})
export class CarListComponent implements OnInit {
	cars: ICar[];

	constructor(private _carService: CarService) {}

	ngOnInit() {
		this._carService.getCars().subscribe(cars => this.cars = cars);
	}

	// getCars(): ICar[] {
	// 	return [
	// 		{
	// 			"make": "Toyota",
	// 			"model": "Avensis",
	// 			"registrationNumber": "ST85866",
	// 			"productionYear": 2009
	// 		},
	// 		{
	// 			"make": "Toyota",
	// 			"model": "Avalon",
	// 			"registrationNumber": "SK12345",
	// 			"productionYear": 2020
	// 		}
	// 	];
	// }
}
