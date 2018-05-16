import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { SignupService } from './_services/signup.service';
import { AlertService } from './_services/alert.service';
import { ModalService } from './_services/modal.service';
import { UploadService } from './_services/upload.service';
import { DownloadService } from './_services/download.service';
import { SigninService } from './_services/signin.service';
import { FileService } from './_services/file.service';

import { AuthGuard } from './_guards/auth.guard';
import { GuestGuard } from './_guards/guest.guard';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { AlertComponent } from './alert/alert.component';
import { ModalComponent } from './modal/modal.component';
import { DownloadComponent } from './download/download.component';
import { SigninComponent } from './signin/signin.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SignupComponent,
    AlertComponent,
    ModalComponent,
    DownloadComponent,
    SigninComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [
    SignupService,
    AlertService,
    ModalService,
    UploadService,
    DownloadService,
    SigninService,
    FileService,
    AuthGuard,
    GuestGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
