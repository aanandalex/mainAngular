import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  myProjects(userId) {
    return this.http.get("http://localhost:3000/userProjects/" + userId);
  }

  myDonations(userId) {
    return this.http.get("http://localhost:3000/userDonations/" + userId);
  }

  myWallet(userId) {
    return this.http.get("http://localhost:3000/userWallet/" + userId);
  }

  topUp(userId, credit, money) {
    const up = {
      credit: credit,
      money: money
    }

    return this.http.put("http://localhost:3000/topup/" + userId, up);
  }
}
