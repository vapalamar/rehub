import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Headers, Http, Request, RequestMethod, RequestOptions, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Observer} from 'rxjs/Observer';

const TOKEN_NAME = 'rh-token';

@Injectable()
export class AuthHttp {

    constructor(private http: Http) {}

    public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        const tokenizedOptions = options || {};
        tokenizedOptions.params = tokenizedOptions.params || new URLSearchParams();
        const encodedToken = encodeURIComponent(sessionStorage.getItem(TOKEN_NAME));
        (tokenizedOptions.params as URLSearchParams).set('token', encodeURIComponent(encodedToken));
        tokenizedOptions.search = Object.assign(tokenizedOptions.search || {}, tokenizedOptions.params);
        return this.http.get(url, tokenizedOptions).map(r => r.json());
    }

    public post(url: string, body: {}, options?: RequestOptionsArgs): Observable<Response> {
        const tokenizedParams = new URLSearchParams(options.search.toString());
        tokenizedParams.set('token', sessionStorage.getItem(TOKEN_NAME));
        options.search = tokenizedParams;
        return this.http.post(url, options);
    }

    public put(url: string, body: {}, options ?: RequestOptionsArgs): Observable<Response> {
        const tokenizedParams = new URLSearchParams(options.search.toString());
        tokenizedParams.set('token', sessionStorage.getItem(TOKEN_NAME));
        options.search = tokenizedParams;
        return this.http.put(url, options);
    }

    public delete(url: string, options ?: RequestOptionsArgs): Observable<Response> {
        const tokenizedParams = new URLSearchParams(options.search.toString());
        tokenizedParams.set('token', sessionStorage.getItem(TOKEN_NAME));
        options.search = tokenizedParams;
        return this.http.delete(url, options);
    }

    public isTokenActive() {
        return sessionStorage.getItem(TOKEN_NAME) != null;
    }

    public setNewToken(token: string) {
        sessionStorage.setItem(TOKEN_NAME, token);
    }

    public deleteToken() {
        return sessionStorage.removeItem(TOKEN_NAME);
    }
}