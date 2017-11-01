'use strict';

import * as Lab from 'lab';
import * as Code from 'code';
import { Radiation, SolcastConfig } from '../src/index';
import * as random from './random';
import * as constants from './constants';

const lab = exports.lab = Lab.script();
const { describe, it, before } = lab;
const expect = Code.expect;

const latLngPoint = random.position();

lab.experiment(`Radiation API test ${SolcastConfig.url}`, () => {
    lab.test('Forecast', (done) => {
        expect(SolcastConfig.url).not.equal('');
        const todo = Radiation.forecast(random.position());
        todo.then(results => {
            console.log(results.forecasts.length);
            expect(constants.Forecasts.total).equal(results.forecasts.length);
            done();
        });
    });
});