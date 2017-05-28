import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";
import { RhLoginComponent } from './login.component';
import { AuthenticationService } from "../auth";

@NgModule({
    imports: [ReactiveFormsModule, CommonModule, RouterModule, HttpModule],
    exports: [RhLoginComponent],
    declarations: [RhLoginComponent],
    providers: [AuthenticationService]
})
export class RhLoginModule { }
