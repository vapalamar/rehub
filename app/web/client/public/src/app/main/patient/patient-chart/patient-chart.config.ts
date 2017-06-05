import { InjectionToken } from '@angular/core';

export interface ChartConfig {
    scaleShowVerticalLines: boolean;
    responsive: boolean;
}

export const RH_PATIENT_CHART_CONFIG: ChartConfig = {
    scaleShowVerticalLines: false,
    responsive: true
};

export const CHART_CONFIG = new InjectionToken<ChartConfig>('chart.config');