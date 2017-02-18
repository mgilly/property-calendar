import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { isSameDay, isSameMonth, addMinutes, addDays, addWeeks, addMonths, subWeeks, startOfWeek, endOfWeek } from 'date-fns';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarMonthViewDay, CalendarEventAction } from 'angular-calendar';
import { colors } from '../const/colors';
import 'rxjs/add/operator/mergeMap';

import { TenantService } from '../tenants/tenant.service';
import { ITenant } from '../tenants/tenant';
import { WorkdayService } from '../events/workday.service';
import { IWorkday } from '../events/workday';

@Component({
	templateUrl: './tenant-calendar.component.html',
})
export class TenantCalendarComponent implements OnInit {

	monthNames = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];

	constructor(
		private _route: ActivatedRoute,
		private _tenantService: TenantService,
	  private workdayService: WorkdayService) {
			this.dayModifier = function(day: CalendarMonthViewDay): void {
	      if (!this.dateIsValid(day.date)) {
	        day.cssClass = 'cal-disabled';
	      }
	    }.bind(this);
	    this.dateOrViewChanged();
		}

	refresh: Subject<any> = new Subject();

  viewDate: Date = new Date();
	minDate: Date = addDays(new Date(), 1);
	maxDate: Date = addMonths(new Date(), 3);
	dayModifier: Function;

	tenant: ITenant;
  events: Observable<CalendarEvent[]>;

	prevBtnDisabled: boolean = false;
  nextBtnDisabled: boolean = false;

	ngOnInit() {
		this._route.params.subscribe(params => {
			let tenantId = "" + params['id'];
			this._tenantService.findTenantById(tenantId).subscribe(t => this.tenant = t);
			this.events = this.workdayService.findAll().map(workdays => {
				var events = [];
				workdays.filter(workday => workday.propertyId === this.tenant.propertyId).forEach(workday => {
					var date;
					for(date = new Date(workday.start); date < new Date(workday.end); date = addMinutes(date, 30)) {
						events.push({
	            title: date.toJSON().substring(11, 16) + " - " + addMinutes(date, 30).toJSON().substring(11, 16),
	            start: date,
	            end: addMinutes(date, 30),
	            color: colors.blue,
	            actions: []
	          });
					}
				});
				return events;
      })
		});
	}

  eventClicked({event}: {event: CalendarEvent}): void {
    console.log('Event clicked', event);
  }

	increment(): void {
    this.changeDate(addWeeks(this.viewDate, 1));
  }

  decrement(): void {
    this.changeDate(subWeeks(this.viewDate, 1));
  }

  today(): void {
    this.changeDate(new Date());
  }

  dateIsValid(date: Date): boolean {
    return date >= this.minDate && date <= this.maxDate;
  }

  changeDate(date: Date): void {
    this.viewDate = date;
    this.dateOrViewChanged();
  }

  dateOrViewChanged(): void {
    this.prevBtnDisabled = !this.dateIsValid(endOfWeek(subWeeks(this.viewDate, 1)));
    this.nextBtnDisabled = !this.dateIsValid(startOfWeek(addWeeks(this.viewDate, 1)));
    if (this.viewDate < this.minDate) {
      this.changeDate(this.minDate);
    } else if (this.viewDate > this.maxDate) {
      this.changeDate(this.maxDate);
    }
  }
}
