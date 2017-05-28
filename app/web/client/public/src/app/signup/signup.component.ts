import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "../auth";

@Component({
    selector: 'rg-signup',
    templateUrl: '/signup.component.html'
})

export class RhSignupComponent {
    protected loading: boolean;
    protected form: FormGroup;

    constructor(private fb: FormBuilder, private auth: AuthenticationService, private router: Router) {
        this.form = this.fb.group({
            login: new FormControl(),
            pass: new FormControl(),
            fname: new FormControl(),
            lname: new FormControl()
        });
    }

    protected submitSignUp() {
        this.loading = true;
        const {login, pass, fname, lname} = this.form.value;
        this.auth.signup(login, pass, fname, lname)
            .subscribe((res: any) => {
                if (sessionStorage.getItem('rh-token') != null) {
                    this.loading = false;
                    this.router.navigateByUrl('/');
                }
            }); 
    }
}