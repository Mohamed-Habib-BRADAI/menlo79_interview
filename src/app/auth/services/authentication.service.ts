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

  loginWithRedirect() {
    this.auth.loginWithRedirect();
    this.auth.user$.subscribe((data) => {
      console.log(data);
    });
  }
  isLoggedIn(): Observable<boolean> {
    return this.auth.isAuthenticated$;
  }
  logout() {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }
  getUserInfo() {
    return this.auth.user$;
  }
  isLoading(): Observable<Boolean> {
    return this.auth.isLoading$;
  }
}
