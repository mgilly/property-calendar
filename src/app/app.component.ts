import { Component, OnInit } from '@angular/core';
import { AuthService } from './authn/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService : AuthService) {
  }

  public getUserName(): string {
    return this.authService.getUserName();
  }

  public isUserAuthenticated(): boolean {
    return this.authService.isLogged();
  }
}
