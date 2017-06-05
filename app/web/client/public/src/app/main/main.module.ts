import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ChartsModule } from "ng2-charts";

import { AuthHttp } from "../auth";
import { RhMainComponent } from './main.component';
import { RhPatientComponent } from "./patient/patient.component";

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, RouterModule, ChartsModule],
    exports: [RhMainComponent],
    declarations: [RhMainComponent, RhPatientComponent],
    providers: [AuthHttp],
})
export class RhMainModule { }
