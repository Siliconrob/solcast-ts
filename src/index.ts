'use strict';

import { Config } from './types/config';
import * as position from './types/latlng';
import { RadiationForecast } from './types/data/radiation';
import { PowerForecast } from './types/data/power';

export const SolcastConfig : Config = {
    key: process.env.SOLCAST_API_KEY || '',
    url: process.env.SOLCAST_API_URL || 'https://api.solcast.com.au/'
};

export class Radiation {
    static async forecast(input : position.LatLng) : Promise<RadiationForecast> {
        const result = await null;
        return result;
    }
    static async estimates(input : position.LatLng) : Promise<any> {
        throw Error('Not implemented');
    }
    static async latestEstimates(input : position.LatLng) : Promise<any> {
        throw Error('Not implemented');
    }
}

export class Power {
    static async forecast(input : position.LatLng, capacity: number) : Promise<PowerForecast> {
        const result = await null;
        return result;
    }
    static async estimates(input : position.LatLng) : Promise<any> {
        throw Error('Not implemented');
    }
    static async latestEstimates(input : position.LatLng) : Promise<any> {
        throw Error('Not implemented');
    }
}