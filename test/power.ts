'use strict';

import * as Lab from 'lab';
import * as Code from 'code';
import { Power, SolcastConfig } from '../src/index';
import * as random from './random';
import * as constants from './constants';

const lab = exports.lab = Lab.script();
const { describe, it, before } = lab;
const expect = Code.expect;

const latLngPoint = random.position();

lab.experiment(`Power API test ${SolcastConfig.url}`, () => {
    lab.test('Forecast', (done) => {
        expect(SolcastConfig.url).not.equal('');
        console.log(`Latitude: ${latLngPoint.latitude} Longitude: ${latLngPoint.longitude}`);        
        const todo = Power.forecast(random.position());
        todo.then(results => {
            expect(constants.Forecasts.total).equal(results.forecasts.length);
            done();
        });
    });      
});