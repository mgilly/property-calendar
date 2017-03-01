import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ConfigService } from '../config.service';
import { PropertyService } from './property.service';
import { IProperty } from './property';
import { TenantService } from '../tenants/tenant.service';
import { ITenant } from '../tenants/tenant';
import { AuthService } from '../authn/auth.service';

@Component({
	templateUrl: './property-tenants.component.html'
})
export class PropertyTenantsComponent implements OnInit {

	constructor(private route: ActivatedRoute, private propertyService: PropertyService, private tenantService: TenantService, private modal: NgbModal, private config: ConfigService, private auth: AuthService ) { }

	property: IProperty = null;
	tenants: ITenant[] = null;
	modalRef: NgbModalRef;
	  // tenant link modal
	@ViewChild('content') modalContent: TemplateRef<any>;
	selectedTenantUrl: string;
	copied: boolean = false;
  // new tenant modal
	@ViewChild('tenantContent') tenantContent: TemplateRef<any>;
	selectedTenant: ITenant;

	ngOnInit() {
		this.route.params.subscribe(params => {
			let propertyId = params['id'];
			this.propertyService.getProperty(propertyId).subscribe(property => this.property = property);
			this.tenantService.getTenants(propertyId).subscribe(tenants => this.tenants = tenants);
		})
	}

	saveTenant() {
		var newTenant = !this.selectedTenant.id;
    // save tenant in database
    this.tenantService.save(this.selectedTenant);
		// if successfull add it to the list
		if(newTenant) {
			this.tenants.push(this.selectedTenant);
		}
    this.modalRef.close();
  }

	open(content: any, tenantId: string) {
		this.selectedTenantUrl = this.config.getUrl() + "/tenant-calendar/" + tenantId;
		this.copied = false;
		this.modalRef = this.modal.open(content);
	}

	openTenant(content: any, tenantId: string) {
		console.log("called: " + tenantId);
		if(!tenantId) {
			// new tenant
			this.selectedTenant = <ITenant>{};
			this.selectedTenant.propertyId = this.property.id;
			this.modalRef = this.modal.open(content);
		} else {
			this.tenantService.findTenantById(tenantId).subscribe(tenant => {
				this.selectedTenant = tenant;
				this.modalRef = this.modal.open(content);
			});
		}
	}
}
