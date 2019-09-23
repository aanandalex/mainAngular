import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading = false;
  authStatusSub: Subscription;

  constructor(public authService: AuthService, public router: Router) { }

  onLogin(form: NgForm) {
    this.isLoading = true;

    if(form.invalid) {
      this.isLoading = false;
      return;
    }
    
    this.authService.login(form.value.email, form.value.password);
  }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
