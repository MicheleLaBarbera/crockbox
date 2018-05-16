import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './_guards/auth.guard';
import { GuestGuard } from './_guards/guest.guard';

import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { DownloadComponent } from './download/download.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent, canActivate: [GuestGuard]},
  { path: 'login', component: SigninComponent },
  { path: 'logout', component: SigninComponent, canActivate: [AuthGuard]},
  { path: 'download/:id', component: DownloadComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class AppRoutingModule { }
