import * as position from './types/latlng';
import { Options } from './types/options';
import { Config } from './types/config';

export interface RadiationOptions extends Options {
}

export function radiation(point : position.LatLng, solcastConfig: Config, options? : RadiationOptions) : object {
    const defaults:RadiationOptions = {
        APIKey: null
    };
    const theOptions = options || defaults;
    return {
        api_key: theOptions.APIKey || solcastConfig.key,
        latitude: point.latitude !== null ? point.latitude : 0,
        longitude: point.longitude !== null ? point.longitude : 0
    };
}

export interface PowerOptions extends Options {
    Capacity: number;
}

export function power(point : position.LatLng, solcastConfig: Config, options? : PowerOptions) : object {
    const defaults:PowerOptions = {
        Capacity: null,
        APIKey: null
    };
    const theOptions = options || defaults;
    return {
        api_key: theOptions.APIKey || solcastConfig.key,
        latitude: point.latitude !== null ? point.latitude : 0,
        longitude: point.longitude !== null ? point.longitude : 0,
        capacity: theOptions.Capacity || 1
        /*
        tilt:
        azimuth:
        install_date:
        loss_factor:
        */
    };
}