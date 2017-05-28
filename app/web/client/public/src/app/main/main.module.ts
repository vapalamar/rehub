import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { AuthHttp } from "../auth";
import { RhMainComponent } from './main.component';

@NgModule({
    imports: [CommonModule],
    exports: [RhMainComponent],
    declarations: [RhMainComponent],
    providers: [AuthHttp],
})
export class RhMainModule { }
