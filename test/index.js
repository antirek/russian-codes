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

    it('get data by region title', function () {
        codes.getRegionByTitle('Республика Бурятия', function (err, region) {
          expect(region.code).to.eql('03');
        });
    });

    it('get data by region code', function () {
        codes.getRegionByCode('03', function (err, region) {
          expect(region.title).to.eql('Республика Бурятия');
        });
    });

    it('get data by region title - with error', function () {
        codes.getRegionByTitle('Республика Бу', function (err, region) {
          expect(err).to.be.a(Error);
        });
    });

    it('get data by county title', function () {
        codes.getCountyByTitle('Уральский', function (err, county) {
          expect(county.code).to.eql('6');
        });
    });

    it('get data by county code', function () {
        codes.getCountyByCode(6, function (err, county) {
          expect(county.title).to.eql('Уральский');
        });
    });

    it('get data by county title - with error', function () {
        codes.getCountyByTitle('Уральский федеральный', function (err, region) {
          expect(err).to.be.a(Error);
        });
    });

    it('get data by region iso 3166-2', function () {
        codes.getRegionByISO31662('RU-IRK', function (err, region) {          
          expect(region.code).to.eql('38');
        });
    });

    it('get data by region iso 3166-2 - with error', function () {
        codes.getRegionByISO31662('RU-I', function (err, region) {
          expect(err).to.be.a(Error);
        });
    });

    it('get all counties', function () {
        codes.getCounties(function (err, array) {
          expect(array.length).to.eql(9);
        });
    });

    it('get all regions', function () {
        codes.getRegions(function (err, array) {
          expect(array.length).to.eql(85);
        });
    });

    it('get regions by array', function () {
        codes.getRegionsByArray(["01", "02"], function (err, array) {         
          expect(array.length).to.eql(2);
        });
    });

    it('get regions by array 2', function () {
        codes.getCountyByTitle('Уральский', function (err, county) {
          codes.getRegionsByArray(county.regions, function (err, array) {         
            expect(array.length).to.eql(6);
          });
        });
    });

    it('get regions by county code', function () {
        codes.getRegionsByCountyCode(6, function (err, array) {         
            expect(array.length).to.eql(6);
        });
    });

    it('check equal sum counties.regions and regions', function () {
        codes.getCounties(function (err, counties) {
            var sum = 0;
            counties.map(function (element) {
                sum += element.regions.length;
            });
            expect(sum).to.eql(85);            
        });
    });

    it('get regions by county code', function () {
        codes._make_region_county();
    });
});