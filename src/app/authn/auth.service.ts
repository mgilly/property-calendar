import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  login(username: string, role: string) {
    localStorage.setItem("userLogged", username);
		localStorage.setItem("userRole", role);
  }

  logout() {
    localStorage.removeItem('userLogged');
    localStorage.removeItem("userRole");
  }

  isLogged(): boolean {
    return localStorage.getItem("userLogged") != null;
  }

  getUserName(): string {
    return localStorage.getItem("userLogged");
  }

  hasRole(role: string): boolean {
    return localStorage.getItem("userRole") === role;
  }
}
