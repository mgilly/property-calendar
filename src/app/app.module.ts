import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';

import { ConfigService } from './config.service';
import { AuthGuard } from './authn/auth-guard';
import { AuthService } from './authn/auth.service';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';

import { PropertyListComponent } from './properties/property-list.component';
import { PropertyCalendarComponent } from './properties/property-calendar.component';
import { PropertyTenantsComponent } from './properties/property-tenants.component';
import { PropertyService } from './properties/property.service';

import { TenantCalendarComponent } from './tenants/tenant-calendar.component'
import { TenantService } from './tenants/tenant.service';

import { WorkdayService } from './events/workday.service';
import { EventService } from './events/event.service';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    PropertyListComponent,
    PropertyCalendarComponent,
    PropertyTenantsComponent,
    SignInComponent,
    SignUpComponent,
    TenantCalendarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    JsonpModule,
    HttpModule,
    RouterModule.forRoot([
        { path: 'sign-in', component: SignInComponent },
        { path: 'properties', component: PropertyListComponent, canActivate: [AuthGuard] },
        { path: 'property-calendar/:id', component: PropertyCalendarComponent, canActivate: [AuthGuard] },
        { path: 'property-tenants/:id', component: PropertyTenantsComponent, canActivate: [AuthGuard] },
        { path: 'tenant-calendar/:hash', component: TenantCalendarComponent, canActivate: [AuthGuard] },
        { path: '', redirectTo: 'properties', pathMatch: 'full'},
        { path: '**', redirectTo: 'properties', pathMatch: 'full'}
    ]),
    NgbModule.forRoot(),
    CalendarModule.forRoot()
  ],
  providers: [
      {provide: Window, useValue: window},
      AuthGuard,
      AuthService,
      PropertyService,
      TenantService,
      ConfigService,
      WorkdayService,
      EventService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
