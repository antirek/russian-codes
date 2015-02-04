var expect = require('expect.js');
var Codes = require('../index');

var codes = new Codes();

describe('Codes', function () {

    before(function (done) {
        codes.loadData(function () {
            done();
        });
    });

    it('data length with type край must be 9', function () {
        codes.getRegionsByType('край', function (err, data) {
          expect(data.length).to.eql(9);
        });
    });

    it('data length with type область must be 46', function () {
        codes.getRegionsByType('Область', function (err, data) {
          expect(data.length).to.eql(46);
        });
    });

    it('data length with type автономная область must be 1', function () {
        codes.getRegionsByType('автономная область', function (err, data) {
          expect(data.length).to.eql(1);
        });
    });

    it('data length with type автономный округ must be 4', function () {
        codes.getRegionsByType('автономный округ', function (err, data) {
          expect(data.length).to.eql(4);
        });
    });

    it('data length with type республика must be 22', function () {
        codes.getRegionsByType('Республика', function (err, data) {
          expect(data.length).to.eql(22);
        });
    });

    it('data length with type город федерального значения must be 3', function () {
        codes.getRegionsByType('Город федерального значения', function (err, data) {
          expect(data.length).to.eql(3);
        });
    });
});