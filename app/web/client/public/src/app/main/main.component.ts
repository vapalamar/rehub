import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthHttp } from "../auth";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'rh-main',
    templateUrl: 'main.component.html'
})

export class RhMainComponent implements OnInit {
    protected data: object;
    protected showDialog: boolean;
    protected addDialogModel: FormGroup;

    private id: string;

    constructor(private authHttp: AuthHttp, private route: ActivatedRoute, private fb: FormBuilder, private cdr: ChangeDetectorRef) { }

    public ngOnInit(): void {
        this.route.params
            .switchMap(params => {
                this.id = params['id'];
                return this.authHttp.get(`/api/v1/doctor/${params['id']}`);
            })
            .subscribe(res => {
                if (res.ok) {
                    this.data = res.data[0];
                }
            });

        this.addDialogModel = this.fb.group({
            fname: ['', Validators.required],
            lname: ['', Validators.required],
            symptoms: null,
            progress: null
        });
    }

    protected showAddDialog() {
        this.showDialog = true;
    }

    protected cancelAddPatient(event: any) {
        event.preventDefault();
        event.stopPropagation();
        this.addDialogModel.reset();
        this.showDialog = false;
        this.authHttp.get(`/api/v1/doctor/${this.id}`)
            .subscribe(res => {
                if (res.ok) {
                    this.data = res.data[0];
                }
            });
    }

    protected onPatientAdd(event: any) {
        event.preventDefault();
        event.stopPropagation();
        this.cdr.markForCheck();
        if (!(<any>this.data).patients) {
            console.log((<any>this.data));
            (<any>this.data).patients = [];
        }
        (<any>this.data).patients.push(this.addDialogModel.value);
        this.authHttp.put(`/api/v1/doctor`, this.data)
            .subscribe(res => {    
                this.addDialogModel.reset();
                this.showDialog = false;
            });
    }

    // protected updateSymptoms(event: any) {
    //     const target = event.target;
    //     const isChecked = target.checked;
    //     const value = target.value;
    //     let symptoms = this.addDialogModel.get('symptoms').value || [];
    //     if (!symptoms.includes(value) && isChecked) {
    //         symptoms.push(value);
    //     } else if (symptoms.includes(value) && !isChecked) {
    //         const idx = symptoms.indexOf(value);
    //         symptoms = symptoms.splice(idx, 1);
    //     }
    //     this.addDialogModel.get('symptoms').setValue(symptoms);
    // }

    protected onEdit(patient: object) {
        const idx = (<any>this.data).patients.indexOf(patient);
        if (idx > -1) {
            (<any>this.data).patients.splice(idx, 1);
        }
        this.addDialogModel.patchValue(patient);
        this.showDialog = true;
    }

    protected onRemove(patient: object) {
        const idx = (<any>this.data).patients.indexOf(patient);
        if (idx > -1) {
            (<any>this.data).patients.splice(idx, 1);
            this.authHttp.put(`/api/v1/doctor`, this.data)
                .subscribe(res => {    
                    this.addDialogModel.reset();
                    this.showDialog = false;
                });
        }
    }

    protected onLinkShare(link: string) {
        (<any>this.data).link.push(link);
        this.authHttp.put(`/api/v1/doctor`, this.data)
                .subscribe(res => console.log(res));
    }

    protected onLinkRemove(link: string) {
        const idx = (<any>this.data).link.indexOf(link);
        (<any>this.data).link.splice(idx, 1);
        this.authHttp.delete(link)
            .subscribe(res => console.log(res));
        this.authHttp.put(`/api/v1/doctor`, this.data)
                .subscribe(res => console.log(res));
    }
}