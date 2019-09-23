import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;
  userId: string;
  name: string;
  wallet: string;
  authStatusListener = new Subject<boolean>();
  isAuthenticated = false;
  tokenTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  getUserName() {
    return this.name;
  }

  getUserWallet() {
    return this.wallet;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }



  signUp(name: string, email: string, password: string) {
    const authData = {
      name: name,
      email: email,
      password: password
    }
    this.http.post("http://localhost:3000/signup", authData).subscribe((Response: any) => {
    alert(Response);  
    this.router.navigate(['/login']);
    }, error => {
      this.authStatusListener.next(false);
    })
  }

  login(email: string, password: string) {
    const authData = {
      email: email,
      password: password
    }
    this.http.post<{ token: string, expiresIn: number, userId: string, name: string, wallet: string}>("http://localhost:3000/login", authData).subscribe(Response => {
      const token = Response.token;
      this.token = token;

      if (token) {
        const expiresInDuration = Response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.userId = Response.userId;
        this.name = Response.name;
        this.wallet = Response.wallet;
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        console.log(expirationDate);
        this.saveAuthData(token, expirationDate, this.userId, this.name, this.wallet);
        this.router.navigate(['/']);

      }
    }, error => {
      this.authStatusListener.next(false);
    });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if(!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.name = authInformation.name;
      this.wallet = authInformation.wallet;
      this.setAuthTimer(expiresIn/1000);
      this.authStatusListener.next(true);
    }
  }

  logOut() {
    this.token = null;
    this.userId = null;
    this.name = null;
    this.wallet = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    console.log("setting Timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logOut();
    }, duration * 1000)
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, name: string, wallet: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('name', name);
    localStorage.setItem('wallet', wallet);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    localStorage.removeItem('wallet');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const name = localStorage.getItem('name');
    const wallet = localStorage.getItem('wallet');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      name: name,
      wallet: wallet
    }

  }
}
