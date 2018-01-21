import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';

import {Angular2TokenService} from 'angular2-token';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";


const routes =[
  { path: 'home', component: AppComponent}

];
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule, // Used in Angular2TokenService,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [Angular2TokenService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
