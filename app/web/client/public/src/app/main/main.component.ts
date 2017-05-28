import { Component, OnInit } from '@angular/core';
import { AuthHttp } from "../auth";
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'rh-main',
    templateUrl: 'main.component.html'
})

export class RhMainComponent implements OnInit {
    protected data$: Observable<object>;

    constructor(private authHttp: AuthHttp) { }

    public ngOnInit(): void {
        this.data$ = this.authHttp.get('/api/v1/doctor');
    }
}