import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";
import { RhSignupComponent } from './signup.component';
import { AuthenticationService } from "../auth";

@NgModule({
    imports: [ReactiveFormsModule, CommonModule, RouterModule, HttpModule],
    exports: [RhSignupComponent],
    declarations: [RhSignupComponent],
    providers: [AuthenticationService]
})
export class RhSignupModule { }
