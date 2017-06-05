import { Component, Input, EventEmitter, Output, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Http } from "@angular/http";

@Component({
    selector: 'rh-patient',
    templateUrl: 'patient.component.html'
})

export class RhPatientComponent implements OnInit {
    @Input()
    public data: object;

    @Output()
    public onEdit = new EventEmitter();

    @Output()
    public onRemove = new EventEmitter();
    
    protected link: string;
    protected showNotification: boolean = false;

    constructor(private http: Http) {}

    public ngOnInit() {
        if (this.data) {
            (<any>this.data).progress = [
                {
                    date: '29/05/2017',
                    value: 5
                },
                {
                    date: '30/05/2017',
                    value: 6
                },
                {
                    date: '31/05/2017',
                    value: 7
                },
                {
                    date: '01/06/2017',
                    value: 8
                },
                {
                    date: '02/06/2017',
                    value: 6
                },
            ];
        }
    }

    public onShare() {
        this.http.post('/generate', this.data)
            .subscribe(res => {
                this.link = res.json().link;
                this.showNotification = true;
            });
    }
}