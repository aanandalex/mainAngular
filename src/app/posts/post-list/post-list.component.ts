import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { PostsService } from '../posts.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  isLoading = false;
  posts: Array<object> = [];
  userId: string;
  name: string;

  authStatusSub: Subscription;
  userIsAuthenticated = false;

  constructor(private postService: PostsService, private authService: AuthService, private router: Router) { }

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
    this.isLoading = true;

    this.postService.viewProject().subscribe((Response: Array<Object>) => {
      this.isLoading = false;
      this.posts = Response;
    })

    this.userId = this.authService.getUserId();
    this.name = this.authService.getUserName();
    this.userIsAuthenticated = this.authService.getIsAuth();

    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
      this.name = this.authService.getUserName();
    });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
