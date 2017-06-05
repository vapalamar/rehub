import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";
import { ChartsModule } from "ng2-charts";

import { AuthHttp } from "../auth";
import { RhMainComponent } from './main.component';
import { RhPatientComponent } from "./patient/patient.component";
import { RH_PATIENT_CHART_CONFIG, CHART_CONFIG } from "./patient/patient-chart/patient-chart.config";
import { RhPatientChartComponent } from "./patient/patient-chart/patient-chart.component";

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, RouterModule, ChartsModule, HttpModule],
    exports: [RhMainComponent],
    declarations: [RhMainComponent, RhPatientComponent, RhPatientChartComponent],
    providers: [AuthHttp, {provide: CHART_CONFIG, useValue: RH_PATIENT_CHART_CONFIG}],
})
export class RhMainModule { }
