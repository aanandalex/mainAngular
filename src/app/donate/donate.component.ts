import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { AuthService } from 'src/app/auth/auth.service';
import { PostsService } from 'src/app/posts/posts.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit, OnDestroy {

  isLoading = false;
  postId: string;
  userId: string;
  name: string;
  userWallet: string;


  authStatusSub: Subscription;
  userIsAuthenticated = false;

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router, private postService: PostsService, private userService: UserService) { }

  onDonation(data: NgForm) {
    if (!this.userIsAuthenticated) {
      this.router.navigate(['/login']);
    }

    if (data.value.donation > this.userWallet) {
      alert("No Sufficient Balance in your Wallet for this donation");
      this.router.navigate(["/wallet"]);
    } else {
    this.isLoading = true;
    this.postService.donateToProject(this.postId, this.userId, this.name, data.value.donation).subscribe((Response: any) => {
      this.isLoading = false;
      this.router.navigate(['/']);
      console.log(Response);
    })
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.postId = paramMap.get('postId');
    })

    this.userId = this.authService.getUserId();
    this.name = this.authService.getUserName();
    this.userIsAuthenticated = this.authService.getIsAuth();

    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
      this.name = this.authService.getUserName();
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
