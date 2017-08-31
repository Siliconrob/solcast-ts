'use strict';

import { Config } from './types/config';
import * as position from './types/latlng';
import { RadiationForecast } from './types/data/radiation';
import { PowerForecast } from './types/data/power';
import * as WebRequest from 'web-request';
import * as parameters from './parameters';

export function latLng(latitude: number, longitude: number) : position.LatLng {
    const result:position.LatLng = {
        latitude: latitude,
        longitude: longitude
    };
    position.validateInput(result);
    return result;
}

export class Options {
    static radiation() : parameters.RadiationOptions {
        const result:parameters.RadiationOptions = {
            APIKey: null
        };
        return result;
    }
    static power() : parameters.PowerOptions {
        const result:parameters.PowerOptions = {
            APIKey: null,
            Capacity: null
        };
        return result;
    }
}

export const SolcastConfig : Config = {
    key: process.env.SOLCAST_API_KEY || '',
    url: process.env.SOLCAST_API_URL || 'https://api.solcast.com.au/'
};

function buildUrl(baseUrl : string, pathAndQuery: string) : string {
    let theUrl = (baseUrl || "").trim();
    const path = (pathAndQuery || "").trim();

    if (theUrl.endsWith("/") === false) {
        theUrl = `${theUrl}/`;
    }
    return `${theUrl}${pathAndQuery}`;
}

export class Radiation {
    static async forecast(point : position.LatLng, options? : parameters.RadiationOptions) : Promise<RadiationForecast> {
        position.validateInput(point);
        const url = buildUrl(SolcastConfig.url, 'radiation/forecasts');
        const result = await WebRequest.json<RadiationForecast>(url, {
            qs: parameters.radiation(point, SolcastConfig, options),
            throwResponseError: true
        });
        return result;
    }
    // static async estimates(input : position.LatLng, options? : parameters.RadiationOptions) : Promise<any> {
    //     position.validateInput(input);
    //     const url = buildUrl(SolcastConfig.url, 'radiation/estimated_actuals');
    //     const result = await WebRequest.json<any>(url, {
    //         qs: parameters.radiation(point, SolcastConfig, options),
    //         throwResponseError: true
    //     });
    //     return result;
    // }
    // static async latestEstimates(input : position.LatLng, options? : RadiationOptions) : Promise<any> {
    //     position.validateInput(input);
    //     const url = buildUrl(SolcastConfig.url, 'radiation/estimated_actuals/latest');
    //     const result = await WebRequest.json<any>(url, {
    //         qs: parameters.radiation(point, SolcastConfig, options),
    //         throwResponseError: true
    //     });
    //     return result;
    // }
}

export class Power {
    static async forecast(point : position.LatLng, options? : parameters.PowerOptions) : Promise<PowerForecast> {
        position.validateInput(point);
        const url = buildUrl(SolcastConfig.url, 'pv_power/forecasts');
        const result = await WebRequest.json<PowerForecast>(url, {
            qs: parameters.power(point, SolcastConfig, options),
            throwResponseError: true
        });
        return result;
    }
    // static async estimates(point : position.LatLng, options? : PowerOptions) : Promise<any> {
    //     position.validateInput(point);
    //     const url = buildUrl(SolcastConfig.url, 'pv_power/estimated_actuals');
    //     const result = await WebRequest.json<any>(url, {
    //         qs: parameters.power(point, SolcastConfig, options),
    //         throwResponseError: true
    //     });
    //     return result;
    // }
    // static async latestEstimates(point : position.LatLng, options? : PowerOptions) : Promise<any> {
    //     position.validateInput(point);
    //     const url = buildUrl(SolcastConfig.url, 'pv_power/estimated_actuals/latest');
    //     const result = await WebRequest.json<any>(url, {
    //         qs: parameters.power(point, SolcastConfig, options),
    //         throwResponseError: true
    //     });
    //     return result;
    // }
}