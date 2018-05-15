import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SignupService } from '../_services/signup.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  model: any = {};
  returnUrl: string;


  constructor(private route: ActivatedRoute, private router: Router, private signupService: SignupService, private alertService: AlertService) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  signup() {
    this.signupService.signup(this.model.username, this.model.password).subscribe(result => {
      if(result.status === 200) {
        this.alertService.success("Registrazione effettuata con successo. Verrai reindirizzato nella Homepage automaticamente.");
        setTimeout((router: Router) => {
            this.router.navigate([this.returnUrl]);
        }, 3500);
      }
      else {
        this.alertService.error(result.message);
      }
    });
  }
}
