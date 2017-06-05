import { Component, Inject, Input, OnInit } from '@angular/core';
import { ChartConfig, CHART_CONFIG } from "./patient-chart.config";

@Component({
    selector: 'rh-patient-chart',
    templateUrl: 'patient-chart.component.html'
})

export class RhPatientChartComponent implements OnInit {
    @Input()
    public progress: any;

    protected barChartData: any;
    protected barChartLabels: any;
    
    protected readonly barChartLegend = true;
    protected readonly barChartType = 'bar';

    constructor(@Inject(CHART_CONFIG) private chartConfig: ChartConfig) {}

    public ngOnInit() {
        if (this.progress && Array.isArray(this.progress) && this.progress.length > 0) {
            this.barChartData = [{
                data: this.progress.map(p => p.value),
                label: 'Movement Score'
            }];
            this.barChartLabels = this.progress.map(p => p.date);
        }
    }
}