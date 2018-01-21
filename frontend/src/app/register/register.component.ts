import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AlertService} from "../services/alert.service";
import {Angular2TokenService} from "angular2-token";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private authService: Angular2TokenService,
  ) { }

  register() {
    this.loading = true;
    this.authService.registerAccount({
      email: this.model.email,
      password: this.model.password,
      passwordConfirmation: this.model.passwordConfirmation
    })
      .subscribe(
        data => {
          // set success message and pass true paramater to persist the message after redirecting to the login page
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  ngOnInit(): void {
  }
}
