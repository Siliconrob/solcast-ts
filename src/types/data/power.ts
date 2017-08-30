export interface Forecast {
    period_end: Date;
    period: string;
    pv_estimate: number;
}

export interface PowerForecast {
    forecasts: Forecast[];
}