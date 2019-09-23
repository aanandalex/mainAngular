import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  isLoading = false;
  confirmPasswordValidator = false;

  authStatusSub: Subscription;

  constructor(public authService: AuthService, public router: Router) { }

  onSignUp(form: NgForm) {
    this.isLoading = true;
    if(form.invalid || form.value.password !== form.value.confirmPassword) {
      this.isLoading = false;
      this.confirmPasswordValidator = true;
      return;
    }
    this.confirmPasswordValidator = false;

    this.authService.signUp(form.value.name,form.value.email,form.value.password);
  }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe( authStatus => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
