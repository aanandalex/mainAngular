import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  authListenerSubs: Subscription;
  userIsAuthenticated = false;

  constructor(private authservice: AuthService) { }

  onLogOut() {
    this.authservice.logOut();
  }

  ngOnInit() {
    this.userIsAuthenticated = this.authservice.getIsAuth();

    this.authListenerSubs = this.authservice.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
