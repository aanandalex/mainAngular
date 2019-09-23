import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit, OnDestroy {

  userId: string;
  name: string;
  wallet: string;

  authStatusSub: Subscription;
  userIsAuthenticated = false;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
  
    this.userId = this.authService.getUserId();
    this.name = this.authService.getUserName();
    this.wallet = this.authService.getUserWallet();
    this.userIsAuthenticated = this.authService.getIsAuth();

    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
      this.name = this.authService.getUserName();
      this.wallet = this.authService.getUserWallet();
    });

    
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
