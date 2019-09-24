import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from 'src/app/auth/auth.service';
import { PostsService } from 'src/app/posts/posts.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit, OnDestroy {
  userId: string;
  name: string;
  wallet: string;
  isLoading = false;
  posts: Array<object> = [];


  authStatusSub: Subscription;
  userIsAuthenticated = false;

  constructor(private authService: AuthService, private userService: UserService, private postService: PostsService, private router: Router) { }

  onLike(postId: string) {

    if (!this.userIsAuthenticated) {
      this.router.navigate(['/login']);
    }
    this.isLoading = true;
    this.postService.likeProject(postId, this.userId, this.name).subscribe((Response: any) => {
      this.isLoading = false;
      console.log(Response);
      this.ngOnInit();
    })
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postService.deleteProject(postId).subscribe((Response: any) => {
      this.isLoading = false;
      console.log(Response);
      this.ngOnInit();
    })
  }

  onComment(userComment: NgForm,postId: string) {
    if (userComment.invalid) {
      return;
    }
    this.postService.commentProject(userComment.value.comment, postId, this.userId, this.name).subscribe((Response: any) => {
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
    this.userService.myProjects(this.userId).subscribe((Response:any) => {
      console.log("userID my Projects" + this.userId);
      this.isLoading = false;
      this.posts = Response;
    })

  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
