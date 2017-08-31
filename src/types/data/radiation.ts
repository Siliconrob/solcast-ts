export interface Forecast {
    ghi: number;
    ghi90: number;
    ghi10: number;
    ebh: number;
    dni: number;
    dni10: number;
    dni90: number;
    dhi: number;
    air_temp: number;
    zenith: number;
    azimuth: number;
    cloud_opacity: number;
    period_end: Date;
    period: string;
}

export interface RadiationForecast {
    forecasts: Forecast[];
}