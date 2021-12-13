import { Component } from '@angular/core';
import { AuthenticationService } from './auth/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public authenticationService: AuthenticationService) {}
  title = 'menlo79-interview';
}
