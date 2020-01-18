import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent
  }, {
    path: 'signup',
    component: SignupPageComponent
  }, {
    path: 'profile/:username',
    component: ProfilePageComponent
  }, {
    path: 'dashboard',
    component: DashboardComponent
  }, {
    path: '**',
    component: ErrorPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', anchorScrolling: 'enabled' }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
