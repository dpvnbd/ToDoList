import {Component, OnInit} from '@angular/core';
import {Angular2TokenService, UserData} from "angular2-token";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  userData: UserData;

  constructor(private _tokenService: Angular2TokenService,
              private router: Router) {
    this._tokenService.init({
      apiPath: 'api',
      signInRedirect: 'login',
    });

    router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        this.getUserInfo();
      }
    });
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  private getUserInfo(){
    // Wait until user data is available
    setTimeout(()=>{
      this.userData = this._tokenService.currentUserData;
    }, 500);
  }
}
