import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {Angular2TokenService} from 'angular2-token';
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import {LoginComponent} from './login/login.component';
import {TaskListComponent} from './task-list/task-list.component';
import {FormsModule} from "@angular/forms";
import {AlertService} from "./services/alert.service";
import { AlertComponent } from './alert/alert.component';
import { RegisterComponent } from './register/register.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TaskService} from "./services/task.service";
import {AuthInterceptor} from "./services/auth_intercepror";

const routes = [
  {path: '', component: TaskListComponent, canActivate: [Angular2TokenService]},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TaskListComponent,
    AlertComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule, // Used in Angular2TokenService,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    Angular2TokenService,
    AlertService,
    TaskService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
