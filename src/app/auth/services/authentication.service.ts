import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLogged: boolean = false;
  constructor(public auth: AuthService, @Inject(DOCUMENT) private doc: Document) {}

  signUpWithRedirect() {
    this.auth.loginWithRedirect({ screen_hint: 'signup' });
  }
  loginWithRedirect() {
    this.auth.loginWithRedirect();
  }
  isLoggedIn(): Observable<boolean> {
    return this.auth.isAuthenticated$;
  }
  logout() {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }
  getUserInfo() {}
  isLoading(): Observable<Boolean> {
    return this.auth.isLoading$;
  }
}
