import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SigninService } from '../_services/signin.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  model: any = {};
  returnUrl: string;

  constructor(private route: ActivatedRoute, private router: Router, private signinService: SigninService, private alertService: AlertService) { }

  ngOnInit() {
    this.signinService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/profile';
  }

  signin() {
    this.signinService.signin(this.model.username, this.model.password).subscribe(result => {
      console.log(result);
      if(result.status === 200) {
        this.router.navigate([this.returnUrl]);
      }
      else {
        this.alertService.error(result.message);
      }
    });
  }
}
