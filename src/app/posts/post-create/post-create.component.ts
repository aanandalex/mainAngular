import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PostsService } from '../posts.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit, OnDestroy {

  isLoading = false;
  mode = 'create';
  postId: string;
  post: Array<Object> = [];
  authStatusSub: Subscription;

  constructor(public postService: PostsService, public route: ActivatedRoute,public authService: AuthService, public router: Router) { }

  onAddProject (form: NgForm) {
    if(form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      console.log("Value sent to Service to add new project",form.value);
      this.postService.saveProject(form.value).subscribe((Response: Array<object>) => {
        this.isLoading = false;
        this.router.navigate(["/"]);
      })
    } else {
      console.log("Update function update to service", form.value);
      this.postService.updateProject(this.postId,form.value).subscribe((Response: Array<Object>) => {
        this.isLoading = false;
        this.router.navigate(["/"]);
      })
    }
   
    form.resetForm();
  }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = false;
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.editProject(this.postId).subscribe((Response:Array<object>) => {
          this.isLoading = false;
          this.post = Response;
        })
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    })
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
