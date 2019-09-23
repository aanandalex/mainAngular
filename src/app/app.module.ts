import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatCardModule, MatButtonModule, MatListModule, MatProgressSpinnerModule, MatDialogModule } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes} from '@angular/router';
import { GoogleChartsModule } from 'angular-google-charts';

import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MyProjectsComponent } from './user/my-projects/my-projects.component';
import { MyDonationsComponent } from './user/my-donations/my-donations.component';
import { WalletComponent } from './user/wallet/wallet.component';
import { DashComponent } from './dash/dash/dash.component';
import { ErrorComponent } from './error/error.component';
import { DonateComponent } from './donate/donate.component';

import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor} from './error-interceptor';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  {path: '', component: PostListComponent},
  {path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
  {path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard]},
  {path: 'donate/:postId', component: DonateComponent, canActivate: [AuthGuard]},
  {path: 'signUp', component: SignupComponent},
  {path: 'login',component: LoginComponent},
  {path: 'myProjects', component: MyProjectsComponent, canActivate: [AuthGuard]},
  {path: 'myDonations', component: MyDonationsComponent, canActivate: [AuthGuard]},
  {path: 'wallet', component: WalletComponent, canActivate: [AuthGuard]},
  {path: 'dash', component: DashComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent,
    MyProjectsComponent,
    MyDonationsComponent,
    WalletComponent,
    DashComponent,
    ErrorComponent,
    DonateComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    HttpClientModule,
    GoogleChartsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, 
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
