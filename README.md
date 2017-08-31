## Solcast TypeScript API Client library

TypeScript library for querying the Solcast API async/Promise based

This module allows a registered users to query the Solcast API [https://api.solcast.com.au](https://api.solcast.com.au).  You will need to register your user account to obtain an API key [https://solcast.com.au/api/register](https://solcast.com.au/api/register/).  Without an API key you will not be able to successfully obtain valid API results.


### API async/Promise based
#### Power.forecast(LatLng point, PowerOptions options?)
Returns a PowerForecast promise at the location of the LatLng point input

``` javascript
export interface PowerForecast {
    forecasts: Forecast[];
}

export interface Forecast {
    period_end: Date;
    period: string;
    pv_estimate: number;
}
```

#### Radiation.forecast(LatLng point, RadiationOptions options?)
Return RadiationForecast promise at the location of the LatLng point input

``` javascript
export interface RadiationForecast {
    forecasts: Forecast[];
}

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
```

### Examples

#### NOTE: You can use standatd environment variables to hold your API key and not need to pass the optional {Radiation|Power}Options object to each function

Environment variable names
```
SOLCAST_API_KEY
SOLCAST_API_URL
```

Accessible through common process environment variable.
```
process.env.SOLCAST_API_KEY
process.env.SOLCAST_API_URL
```


#### Typescript
``` javascript
import * as solcast from 'solcast';

const point = solcast.latLng(-33.865143, 151.209900); // Sydney, Australia

const radiationOptions = solcast.Options.radiation();
radiationOptions.APIKey = 'YOUR API KEY HERE';

const promiseFn = solcast.Radiation.forecast(point, radiationOptions);
promiseFn.then(results => {
	console.log(results);
})
.catch(err => {
	console.log(err);
});

```

#### Javascript Radiation async
``` javascript
const solcast = require('solcast');
const point = solcast.latLng(-33.865143, 151.209900); // Sydney, Australia
const radiationOptions = solcast.Options.radiation();
radiationOptions.APIKey = 'YOUR API KEY HERE';
const fn = async function() {
	return await solcast.Radiation.forecast(point, radiationOptions)
};
fn().then(results => {
	console.log(results);
})
.catch(err => {
	console.log(err);
});
```

#### Javascript Radiation Promise
``` javascript
const solcast = require('solcast');
const point = solcast.latLng(-33.865143, 151.209900); // Sydney, Australia
const radiationOptions = solcast.Options.radiation();
radiationOptions.APIKey = 'YOUR API KEY HERE';
const results = solcast.Radiation.forecast(point, radiationOptions);
results.then(results => {
    console.log(results);
})
.catch(err => {
    console.log(err);
});
```

#### JSON sample results
```
{ forecasts: 
   [ { ghi: 0,
       ghi90: 0,
       ghi10: 0,
       ebh: 0,
       dni: 0,
       dni10: 0,
       dni90: 0,
       dhi: 0,
       air_temp: 10,
       zenith: 103,
       azimuth: -88,
       cloud_opacity: 3,
       period_end: '2017-08-31T19:30:00.0000000Z',
       period: 'PT30M' },
    ...
   ]
}
```
