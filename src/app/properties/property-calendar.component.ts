import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { startOfDay, endOfDay, isSameDay, isSameMonth } from 'date-fns';
import { CalendarEvent, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { colors } from '../const/colors';

import { AuthService } from '../authn/auth.service';
import { PropertyService } from './property.service';
import { IProperty } from './property';

@Component({
  templateUrl: './property-calendar.component.html'
})
export class PropertyCalendarComponent implements OnInit {
  constructor(private _route: ActivatedRoute, private _propertyService: PropertyService, private _authService: AuthService, private modal: NgbModal) { }

  ngOnInit() {
		this._route.params.subscribe(params => {
			let propertyId = +params['id'];
      this._propertyService.getProperty(propertyId).subscribe(property => this.property = property);
		})
	}

  @ViewChild('content') modalContent: TemplateRef<any>;
  modalRef: NgbModalRef;

  open(content) {
    this.modal.open(content);
  }

  refresh: Subject<any> = new Subject();

	property: IProperty;
  activeDayIsOpen: boolean = false;
  viewDate: Date = new Date();
  selectedDate: Date = null;

  events: CalendarEvent[] = [];

  eventClicked({event}: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }

  dayClicked({date, events}: { date: Date, events: CalendarEvent[] }): void {
    if(date < this.viewDate) {
      this.selectedDate = null;
      return;
    }
    if(events.length == 0) {
      this.selectedDate = date;
    }

    this.modalRef = this.modal.open(this.modalContent, {size: 'sm'});

      // if (this.selectedWorker != null) {
      //   this.events.push({
      //     title: this.selectedWorker.title,
      //     start: startOfDay(date),
      //     end: endOfDay(date),
      //     color: this.selectedWorker.color
      //   });
			// 	console.log('Event added', date, this.selectedWorker.title);
      // }
      //
      // this.activeDayIsOpen = events.length > 0;
			// this.refresh.next();
  }

  addEvent() {
      this.events.push({
        title: this._authService.getUserName(),
        start: startOfDay(this.selectedDate),
        end: endOfDay(this.selectedDate),
        color: colors.blue
      });

      console.log('Event added', this.selectedDate, this._authService.getUserName());

      this.selectedDate = null;
      this.refresh.next();

      this.modalRef.close();
  }
}
