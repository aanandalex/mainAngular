import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  saveProject(data) {
    return this.http.post("http://localhost:3000/createProject",data);
  }

  viewProject() {
    return this.http.get("http://localhost:3000/getProject");
  }

  editProject(postId) {
    return this.http.get("http://localhost:3000/getProjectById/"+ postId);
  }

  updateProject(postId,data) {
    return this.http.put("http://localhost:3000/updateProject/" + postId, data);
  }

  deleteProject(postId) {
    return this.http.delete("http://localhost:3000/deleteProject/" + postId);
  }

  likeProject(postId, userId, name) {
    const userData = {
      userId: userId,
      name: name
    }
    return this.http.put("http://localhost:3000/likeProject/" + postId, userData);
  }

  donateToProject(postId, userId, name, donation) {
    const userData = {
      userId: userId,
      name: name,
      donation: donation
    }

    return this.http.put("http://localhost:3000/donation/" + postId, userData);
  }
}
