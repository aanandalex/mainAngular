import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

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
  userWallet: string;

  isLoading = false;

  authStatusSub: Subscription;
  userIsAuthenticated = false;

  constructor(private authService: AuthService, private userService: UserService) { }

  onTopUp(data: NgForm) {
    if (data.invalid) {
      return;
    }
    
    if(111 !== data.value.creditCardNum) {
      alert("Invalid credit Card Number");
      return;
    }


    this.userService.topUp(this.userId, data.value.creditCardNum, data.value.topup).subscribe((Response:any)=>{
      console.log(Response);
      this.ngOnInit();
    })
  }

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
    this.userService.myWallet(this.userId).subscribe((Response:any) => {
      this.isLoading = false;
      this.userWallet = Response[0].wallet;
    })

    
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
