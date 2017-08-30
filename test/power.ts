'use strict';

import * as Lab from 'lab';
import * as Code from 'code';
import { Power, SolcastConfig } from '../src/index';
import * as random from './random';

const lab = exports.lab = Lab.script();
const { describe, it, before } = lab;
const expect = Code.expect;

lab.experiment(`Power API test ${SolcastConfig.url}`, () => {
    lab.test('Forecast', (done) => {
        expect(SolcastConfig.url).not.equal('');
        const todo = new Promise(resolve => {
            resolve(Power.forecast(random.position()));
        });
        todo.then(results => {
            done();
        });
    });
    lab.test('Estimates and Actual', (done) => {
        expect(SolcastConfig.url).not.equal('');
        const todo = new Promise(resolve => {
            resolve(Power.estimates(random.position()));
        });
        todo.then(results => {
            done();
        });
    });
    lab.test('Latest Estimates and Actual', (done) => {
        expect(SolcastConfig.url).not.equal('');
        const todo = new Promise(resolve => {
            resolve(Power.latestEstimates(random.position()));
        });
        todo.then(results => {
            done();
        });
    });       
});