import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { startOfDay, endOfDay, isSameDay, isSameMonth, addDays, addMonths, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarMonthViewDay, CalendarEventAction } from 'angular-calendar';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { colors } from '../const/colors';
import 'rxjs/add/operator/catch';

import { AuthService } from '../authn/auth.service';
import { PropertyService } from './property.service';
import { IProperty } from './property';
import { WorkdayService } from '../events/workday.service';
import { IWorkday } from '../events/workday';

interface WorkdayEvent extends CalendarEvent {
  workday: IWorkday;
}

@Component({
  templateUrl: './property-calendar.component.html',
})
export class PropertyCalendarComponent implements OnInit {

  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  constructor(
    private _route: ActivatedRoute,
    private _propertyService: PropertyService,
    private _authService: AuthService,
    private modal: NgbModal,
    private workdayService: WorkdayService) {
    this.dayModifier = function(day: CalendarMonthViewDay): void {
      if (!this.dateIsValid(day.date)) {
        day.cssClass = 'cal-disabled';
      }
      day.badgeTotal = day.events.filter(event => event.title != 'neu').length;
    }.bind(this);
    this.dateOrViewChanged();
  }

  // modal and properties
  @ViewChild('content') modalContent: TemplateRef<any>;
  modalRef: NgbModalRef;
  start: any = "09:00";
  end: any = "17:00";

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({event}: {event: WorkdayEvent}): void => {
        this.deleteEvent(event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  activeDayIsOpen: boolean = false;
  viewDate: Date = new Date();
  minDate: Date = new Date();
  maxDate: Date = addMonths(new Date(), 3);
  dayModifier: Function;

  property: IProperty;
  events: CalendarEvent[] = [];

  prevBtnDisabled: boolean = false;
  nextBtnDisabled: boolean = false;

  ngOnInit() {
    // add 'new' event for each day
    var startDate = addDays(this.minDate, 1);
    var endDate = this.maxDate;
    for(var date = startDate; date <= endDate; date = addDays(date, 1)) {
      this.events.push({
        title: "neu",
        start: new Date(date),
        color: colors.white,
      });
    }

    // add workdays
    this._route.params.subscribe(params => {
      let propertyId = params['id'];
      this._propertyService.getProperty(propertyId).subscribe(property => this.property = property);
      this.workdayService.findAll().subscribe(workdays => {
        workdays.filter(workday => workday.propertyId === propertyId).forEach(workday => this.events.push(this.createEvent(workday)));
      })
    });
    this.refresh.next();
  }

  addEvent() {
    var startDateTime = new Date(this.viewDate);
    startDateTime.setUTCHours(parseInt(this.start.substring(0, 2)));
    startDateTime.setUTCMinutes(0);
    startDateTime.setUTCSeconds(0);
    var endDateTime = new Date(this.viewDate);
    endDateTime.setUTCHours(parseInt(this.end.substring(0, 2)));
    endDateTime.setUTCMinutes(0);
    endDateTime.setUTCSeconds(0);
    console.log("start/end", startDateTime.toJSON(), endDateTime.toJSON());
    var workday: IWorkday = {
      id : "",
      propertyId : this.property.id,
      workerId : this._authService.getUserName(),
      start : startDateTime.toJSON(),
      end : endDateTime.toJSON(),
    }
    // save event in database
    this.workdayService.save(workday);

    // if successfull add it to calendar
    this.events.push(this.createEvent(workday));
    this.refresh.next();

    // close modal
    this.modalRef.close();
  }

  deleteEvent(event: WorkdayEvent): void {
      this.workdayService.delete(event.workday);
      this.events = this.events.filter(e => e !== event);
  }

  open(content) {
    this.modal.open(content);
  }

  eventClicked({event}: { event: CalendarEvent }): void {
    if(event.title === 'neu') {
      this.viewDate = event.start;
      this.modalRef = this.modal.open(this.modalContent, { size: 'sm' });
    }
  }

  dayClicked({date, events}: { date: Date, events: CalendarEvent[] }): void {
    if (
      (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true)
    ) {
      this.activeDayIsOpen = false;
    } else {
      this.activeDayIsOpen = true;
    }

    this.viewDate = date;
  }

  increment(): void {
    this.changeDate(addMonths(this.viewDate, 1));
  }

  decrement(): void {
    this.changeDate(subMonths(this.viewDate, 1));
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
    this.prevBtnDisabled = !this.dateIsValid(endOfMonth(subMonths(this.viewDate, 1)));
    this.nextBtnDisabled = !this.dateIsValid(startOfMonth(addMonths(this.viewDate, 1)));
    if (this.viewDate < this.minDate) {
      this.changeDate(this.minDate);
    } else if (this.viewDate > this.maxDate) {
      this.changeDate(this.maxDate);
    }
  }

  createEvent(workday : IWorkday) : WorkdayEvent {
    return {
      title: workday.start.substring(11, 16) + " - " + workday.end.substring(11, 16) + " (" + workday.workerId + ")",
      start: new Date(workday.start),
      end: new Date(workday.end),
      color: colors.blue,
      actions: this.actions,
      workday: workday,
    };
	}
}
