import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CalendarEvent } from 'angular-calendar';
import { colors } from '../const/colors';

import { TenantService } from '../tenants/tenant.service';
import { ITenant } from '../tenants/tenant';

@Component({
	templateUrl: './tenant-calendar.component.html'
})
export class TenantCalendarComponent implements OnInit {
	constructor(private _route: ActivatedRoute, private _tenantService: TenantService) {}

	tenant: ITenant;

	ngOnInit() {
		this._route.params.subscribe(params => {
			let hash = "" + params['hash'];
			console.log(hash);
			this._tenantService.findTenantByHash(hash).subscribe(t => this.tenant = t);
			console.log(this.tenant);
		})
	}

  // calendarConfigProvider.showTimesOnWeekView(true);

  viewDate: Date = new Date();

  events: CalendarEvent[] = [{
    title: '09:00 - 09:30',
    color: colors.blue,
    start: new Date()
  }, {
		title: '09:30 - 10:00',
    color: colors.blue,
    start: new Date()
  }, {
		title: '10:00 - 10:30',
    color: colors.blue,
    start: new Date()
  }, {
		title: '10:30 - 11:00',
    color: colors.blue,
    start: new Date()
  }, {
		title: '11:00 - 11:30',
    color: colors.blue,
    start: new Date()
  }, {
		title: '11:30 - 12:00',
    color: colors.blue,
    start: new Date()
  }, {
		title: '10:00 - 10:30',
    color: colors.blue,
    start: new Date()
  }, {
		title: '10:30 - 11:00',
    color: colors.blue,
    start: new Date()
  }, {
		title: '11:00 - 11:30',
    color: colors.blue,
    start: new Date()
  }, {
		title: '11:30 - 12:00',
    color: colors.blue,
    start: new Date()
  }, {
		title: '12:00 - 12:30',
    color: colors.blue,
    start: new Date()
  }, {
		title: '12:30 - 13:00',
    color: colors.blue,
    start: new Date()
  }, {
		title: '13:00 - 13:30',
    color: colors.blue,
    start: new Date()
  }, {
		title: '13:30 - 14:00',
    color: colors.blue,
    start: new Date()
  }];

  eventClicked({event}: {event: CalendarEvent}): void {
    console.log('Event clicked', event);
  }
}
