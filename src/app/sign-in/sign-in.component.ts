import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../authn/auth.service';

@Component({
  templateUrl: "./sign-in.component.html"
})
export class SignInComponent implements OnInit {
  returnUrl: String;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.logout();
  }

  logAsAdmin() {
		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
		console.log('this.returnUrl: ' + this.returnUrl);

		this.authService.login("administrator", "AdminRole")
    this.router.navigate([this.returnUrl]);
  }

  logAsWorker(name: string) {
		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
		console.log('this.returnUrl: ' + this.returnUrl);

		this.authService.login(name, "WorkerRole")
    this.router.navigate([this.returnUrl]);
  }
}
