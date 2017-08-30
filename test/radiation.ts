'use strict';

import * as Lab from 'lab';
import * as Code from 'code';
import { Radiation, SolcastConfig } from '../src/index';
import * as random from './random';

const lab = exports.lab = Lab.script();
const { describe, it, before } = lab;
const expect = Code.expect;

lab.experiment(`Radiation API test ${SolcastConfig.url}`, () => {
    lab.test('Forecast', (done) => {
        expect(SolcastConfig.url).not.equal('');
        const todo = new Promise(resolve => {
            resolve(Radiation.forecast(random.position()));
        });
        todo.then(results => {
            done();
        });
    });
    lab.test('Estimates and Actual', (done) => {
        expect(SolcastConfig.url).not.equal('');
        const todo = new Promise(resolve => {
            resolve(Radiation.estimates(random.position()));
        });
        todo.then(results => {
            done();
        });
    });
    lab.test('Latest Estimates and Actual', (done) => {
        expect(SolcastConfig.url).not.equal('');
        const todo = new Promise(resolve => {
            resolve(Radiation.latestEstimates(random.position()));
        });
        todo.then(results => {
            done();
        });
    });    
});