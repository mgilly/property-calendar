import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { ConfigService } from '../config.service';
import { IEvent } from './event';

@Injectable()
export class EventService {
	private url = '/events';
	private content: string;

	constructor(private http: Http, private config: ConfigService) {}

	getEvents(): Observable<IEvent[]> {
		var _url: string = this.config.getServiceUrl() + this.url;
	  return this.http.get(_url).map((response: Response) => {
			var body = response.json()
			return <IEvent[]> body.content;
		});
	}

	saveEvent(event : IEvent) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

		var _url: string = this.config.getServiceUrl() + this.url;
		this.http.post(_url, event, options);
	}
}
