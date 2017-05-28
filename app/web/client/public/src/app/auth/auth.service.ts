import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


const ROOT_ROUTE = '/auth';
const AUTH_ROUTE = {
    signup: ROOT_ROUTE + '/signup',
    login: ROOT_ROUTE + '/login'
};

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    signup(username: string, password: string, fname: string, lname: string) {
        return this.http.post(AUTH_ROUTE.signup, { login: username, pass: password, fname, lname })
            .map((response: Response) => {
                let user = response.json();
                if (user && user.token && user.ok) {
                    sessionStorage.setItem('rh-token', user.token);
                }
            });
    }

    login(username: string, password: string) {
        const token = sessionStorage.getItem('rh-token');
        return this.http.post(AUTH_ROUTE.login, { login: username, pass: password, token: token})
            .map((response: Response) => {
                let user = response.json();
                if (user && user.token && user.ok) {
                    sessionStorage.setItem('rh-token', user.token);
                }
            });
    }

    logout() {
        sessionStorage.removeItem('rh-token');
    }
}