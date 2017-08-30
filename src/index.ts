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

export class Radiation {
    static async forecast(input : position.LatLng, apiKey? : string) : Promise<RadiationForecast> {
        const url = `${SolcastConfig.url}radiation/forecasts`;
        const result = await WebRequest.json<RadiationForecast>(url, {
            qs: {
                api_key: apiKey || SolcastConfig.key,
                latitude: input.latitude || 0,
                longitude: input.longitude || 0
            },
            throwResponseError: true
        });
        return result;
    }
    static async estimates(input : position.LatLng, apiKey? : string) : Promise<any> {
        throw Error('Not implemented');
    }
    static async latestEstimates(input : position.LatLng, apiKey? : string) : Promise<any> {
        throw Error('Not implemented');
    }
}

export class Power {
    static async forecast(input : position.LatLng, capacity? : number, apiKey? : string) : Promise<PowerForecast> {
        const url = `${SolcastConfig.url}pv_power/forecasts`;
        const result = await WebRequest.json<PowerForecast>(url, {
            qs: {
                api_key: apiKey || SolcastConfig.key,
                latitude: input.latitude || 0,
                longitude: input.longitude || 0,
                capacity: capacity || 1
            },
            throwResponseError: true
        });
        return result;
    }
    static async estimates(input : position.LatLng, apiKey? : string) : Promise<any> {
        throw Error('Not implemented');
    }
    static async latestEstimates(input : position.LatLng, apiKey? : string) : Promise<any> {
        throw Error('Not implemented');
    }
}