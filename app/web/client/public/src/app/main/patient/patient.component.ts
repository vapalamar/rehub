import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';

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

    public ngOnInit() {
        if (this.data) {
            (<any>this.data).progress = (Math.random() * 100).toFixed() + '%';
        }
    }
}