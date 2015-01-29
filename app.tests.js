/**
 * Created by Steve on 1/28/2015.
 */

var server = require('./bin/www'),
    superagent = require('superagent'),
    expect = require('expect.js'),
    tests = ['bookmarks'],
    host = 'http://localhost:3000';

for (var i=0; i < tests.length; i++) {
    require('./tests/' + tests[i] + '.tests')(superagent, expect, host);
}