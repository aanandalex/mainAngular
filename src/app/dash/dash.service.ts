import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashService {

  constructor(private http: HttpClient) { }

  crowdFunding() {
    return this.http.get("http://localhost:3000/crowdFunding");
  }

  projectSuccess() {
    return this.http.get("http://localhost:3000/success");
  }

  totalNoOfProject() {
    return this.http.get("http://localhost:3000/totalProject");
  }
}
