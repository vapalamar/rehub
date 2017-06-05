import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "../auth";

@Component({
    selector: 'rh-login',
    templateUrl: 'login.component.html'
})

export class RhLoginComponent {
    protected loading: boolean;
    protected submitted: boolean;
    protected form: FormGroup;

    constructor(private fb: FormBuilder, private auth: AuthenticationService, private router: Router) {
        this.form = this.fb.group({
            login: ['', Validators.required],
            pass: ['', Validators.required]
        });
    }

    protected submitLogin() {
        this.submitted = true;
        if (this.form.valid) {
            this.loading = true;
            const {login, pass} = this.form.value;
            this.auth.login(login, pass)
                .subscribe((res: any) => {
                    if (sessionStorage.getItem('rh-token') != null) {
                        this.loading = false;
                        this.router.navigateByUrl(`/profile/${login}`);
                    }
                });
        } 
    }
}