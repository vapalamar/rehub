import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";

import { AppComponent } from './app.component';
import { RoutingModule } from './app.routing';
import { RhLoginModule } from "./login/login.module";
import { RhSignupModule } from "./signup/signup.module";
import { RhMainModule } from "./main/main.module";
import { AuthGuard } from "./auth";

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    RoutingModule,
    RhLoginModule,
    RhSignupModule,
    RhMainModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [AuthGuard],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
