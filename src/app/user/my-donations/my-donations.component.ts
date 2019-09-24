import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-my-donations',
  templateUrl: './my-donations.component.html',
  styleUrls: ['./my-donations.component.css']
})
export class MyDonationsComponent implements OnInit, OnDestroy {

  userId: string;
  name: string;
  wallet: string;
  isLoading = false;
  posts: Array<object> = [];

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

    this.isLoading = true;
    this.userService.myDonations(this.userId).subscribe((Response:any) => {
      console.log("userID my Donations  " + this.userId);
      this.isLoading = false;
      this.posts = Response;
    })

    
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
