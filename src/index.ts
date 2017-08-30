'use strict';

import { Config } from './types/config';
import * as position from './types/latlng';
import { RadiationForecast } from './types/data/radiation';
import { PowerForecast } from './types/data/power';
import * as WebRequest from 'web-request';

export const SolcastConfig : Config = {
    key: process.env.SOLCAST_API_KEY || '',
    url: process.env.SOLCAST_API_URL || 'https://api.solcast.com.au/'
};

function validateInput(input : position.LatLng) : void {
    const parseResult = position.validate(input);
    if (parseResult.valid === false) {
        throw new Error(parseResult.error);
    }
}

function buildUrl(baseUrl : string, pathAndQuery: string) : string {
    let theUrl = (baseUrl || "").trim();
    const path = (pathAndQuery || "").trim();

    if (theUrl.endsWith("/") === false) {
        theUrl = `${theUrl}/`;
    }
    return `${theUrl}${pathAndQuery}`;
}

function radiationParams(input : position.LatLng, apiKey? : string) : object {
    return {
        api_key: apiKey || SolcastConfig.key,
        latitude: input.latitude || 0,
        longitude: input.longitude || 0
    };
}

export class Radiation {
    static async forecast(input : position.LatLng, apiKey? : string) : Promise<RadiationForecast> {
        validateInput(input);
        const url = buildUrl(SolcastConfig.url, 'radiation/forecasts');
        const result = await WebRequest.json<RadiationForecast>(url, {
            qs: radiationParams(input, apiKey),
            throwResponseError: true
        });
        return result;
    }
    // static async estimates(input : position.LatLng, apiKey? : string) : Promise<any> {
    //     validateInput(input);
    //     const url = buildUrl(SolcastConfig.url, 'radiation/estimated_actuals');
    //     const result = await WebRequest.json<any>(url, {
    //         qs: radiationParams(input, capacity, apiKey),
    //         throwResponseError: true
    //     });
    //     return result;
    // }
    // static async latestEstimates(input : position.LatLng, apiKey? : string) : Promise<any> {
    //     validateInput(input);
    //     const url = buildUrl(SolcastConfig.url, 'radiation/estimated_actuals/latest');
    //     const result = await WebRequest.json<any>(url, {
    //         qs: radiationParams(input, capacity, apiKey),
    //         throwResponseError: true
    //     });
    //     return result;
    // }
}

function powerParams(input : position.LatLng, capacity? : number, apiKey? : string) : object {
    return {
        api_key: apiKey || SolcastConfig.key,
        latitude: input.latitude || 0,
        longitude: input.longitude || 0,
        capacity: capacity || 1
        /*
        tilt:
        azimuth:
        install_date:
        loss_factor:
        */
    };
}

export class Power {
    static async forecast(input : position.LatLng, capacity? : number, apiKey? : string) : Promise<PowerForecast> {
        validateInput(input);
        const url = buildUrl(SolcastConfig.url, 'pv_power/forecasts');
        const result = await WebRequest.json<PowerForecast>(url, {
            qs: powerParams(input, capacity, apiKey),
            throwResponseError: true
        });
        return result;
    }
    // static async estimates(input : position.LatLng, apiKey? : string) : Promise<any> {
    //     validateInput(input);
    //     const url = buildUrl(SolcastConfig.url, 'pv_power/estimated_actuals');
    //     const result = await WebRequest.json<any>(url, {
    //         qs: powerParams(input, capacity, apiKey),
    //         throwResponseError: true
    //     });
    //     return result;
    // }
    // static async latestEstimates(input : position.LatLng, apiKey? : string) : Promise<any> {
    //     validateInput(input);
    //     const url = buildUrl(SolcastConfig.url, 'pv_power/estimated_actuals/latest');
    //     const result = await WebRequest.json<any>(url, {
    //         qs: powerParams(input, capacity, apiKey),
    //         throwResponseError: true
    //     });
    //     return result;
    // }
}