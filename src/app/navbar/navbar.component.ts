import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SigninService } from '../_services/signin.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: any;
  model: any = {};
  returnUrl: string;

  constructor(private route: ActivatedRoute, private signinService: SigninService, private alertService: AlertService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  signin() {
    console.log("we");
    this.signinService.signin(this.model.username, this.model.password).subscribe(result => {
      if(result.status === 200) {
        console.log("Success");
        //this.router.navigate([this.returnUrl]);
      }
      else {
        this.alertService.error(result.message);
      }
    });
  }
}
