'use strict';

import * as Lab from 'lab';
import * as Code from 'code';
import { Power, SolcastConfig } from '../src/index';

const lab = exports.lab = Lab.script();
const { describe, it, before } = lab;
const expect = Code.expect;

lab.experiment(`Power API test ${SolcastConfig.url}`, () => {
    lab.test('Forecast', (done) => {
        expect(SolcastConfig.url).not.equal('');
        done();
    });
});