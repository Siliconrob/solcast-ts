'use strict';

interface API {
    key: string;
    url: string;
}

export const SolcastConfig : API = {
    key: process.env.SOLCAST_API_KEY || '',
    url: process.env.SOLCAST_API || 'https://api.solcast.com.au'
};

export class Radiation {
    static forecasts() : any {        
        return '';
    }
    static estimatesAndActuals() : any {
        return '';
    }

    static latestEstimatesAndActuals() : any {
        return '';
    }
}

export class Power {
    static forecasts() : any {
        return '';
    }
    static estimatesAndActuals() : any {
        return '';
    }

    static latestEstimatesAndActuals() : any {
        return '';
    }
}