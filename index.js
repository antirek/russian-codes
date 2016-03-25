var fs = require('fs'),
    path = require('path');

var codes = function (options) {
    var options = options || {};

    this.dataFile = options['dataFile'] || path.resolve(__dirname, './data/codes.json');
    this.data = null;
    this.dataLoaded = false;
    this.regionCounty = {};
};

codes.prototype._makeRegionCounty = function (callback) {
    var that = this;
    this.getCounties(function (err, counties) {
        counties.map(function (county) {
            county.regions.map(function (region) {                
                that.regionCounty[region] = county.code;
            });
        });
        callback();
    });
};

codes.prototype._appendCountyToRegion = function (region) {
    region['county'] = this.regionCounty[region.code];
    return region;
};

codes.prototype._appendCountyToAllRegions = function (callback) {
    var that = this, 
        arr2 = [];
    this._getDataByField('regions', null, null, function (err, arr) {
        arr2 = arr.map(function (region) {
            return that._appendCountyToRegion(region);
        });
        that.data.regions = arr2;
        callback();
    });
};

codes.prototype._isDataLoaded = function () {
    return (typeof this.data == 'object' );
};

codes.prototype._runCallback = function (err, data, callback) {
    if (err) { 
        callback(err);
    } else {
        callback(null, data);
    }
};

codes.prototype.getRegionsByType = function (type, callback) {
    type = type.toLowerCase();
    var that = this;
    this._getDataByField('regions', 'type', type, function (err, arr) {
        that._runCallback(err, arr, callback);
    });
};

codes.prototype.getRegionTypes = function () {   
    return [
        'область', 'край', 'республика',
        'город федерального значения', 'автономная область', 'автономный округ'
        ];
};

codes.prototype.getRegionByTitle = function (title, callback) {
    var that = this;
    this._getDataByField('regions', 'title', title, function (err, arr) {
        that._runCallback(err, arr ? arr[0] : '',  callback);
    });
};

codes.prototype.getRegionByCode = function (code, callback) {
    var that = this;
    this._getDataByField('regions', 'code', code, function (err, arr) {
        if(!err) arr[0] = that._appendCountyToRegion(arr[0]);
        that._runCallback(err, arr ? arr[0] : '',  callback);
    });
};

codes.prototype.getRegions = function (callback) {
    var that = this;
    this._getDataByField('regions', null, null, function (err, arr) {
        that._runCallback(err, arr,  callback);
    });
};

codes.prototype.getRegionsByArray = function (arr_in, callback) {
    var that = this;
    this._getDataByField('regions', null, null, function (err, all_regions_array) {
        var out_array = all_regions_array.filter(function (element) {
            return (arr_in.indexOf(element.code) != -1)
        });
        callback(null, out_array);
    });
};

codes.prototype.getRegionByISO31662 = function (code, callback) {
    var that = this;
    this._getDataByField('regions', 'code_iso_31662', code, function (err, arr) {
        that._runCallback(err, arr ? arr[0] : '', callback);
    });
};

codes.prototype.getCountyByTitle = function (title, callback) {
    var that = this;
    this._getDataByField('counties', 'title', title, function (err, arr) {
        that._runCallback(err, arr ? arr[0] : '',  callback);
    });
};

codes.prototype.getCountyByCode = function (code, callback) {
    var that = this;
    this._getDataByField('counties', 'code', code, function (err, arr) {
        that._runCallback(err, arr ? arr[0] : '',  callback);
    });
};

codes.prototype.getCounties = function (callback) {
    var that = this;
    this._getDataByField('counties', null, null, function (err, arr) {
        that._runCallback(err, arr,  callback);
    });
};

codes.prototype.getRegionsByCountyCode = function (code, callback) {
    var that = this;
    this.getCountyByCode(code, function (err, county) {
      that.getRegionsByArray(county.regions, function (err, arr) {         
        that._runCallback(err, arr,  callback);
      });
    });
};

codes.prototype._getDataByField = function (section, field, value, callback) {
    var result = null;
    if (!section) section = 'regions';

    if (!this._isDataLoaded()) {
        callback(new Error('No loaded data'));
    } else {
        var arr = Array.prototype.slice.call(this.data[section], 0);

        if (field && value) {
            result = arr.filter(function (element) {
                return element[field] == value;
            });
        } else {
            result = arr;
        }

        if (result.length > 0) { 
            callback(null, result); 
        }else{
            callback(new Error('No find data'));
        }
    }
};

codes.prototype.loadData = function (callback) {
    var that = this;
    fs.readFile(this.dataFile, function (err, data) {
        try {
            that.data = JSON.parse(data);

            that._makeRegionCounty(function () {
                that._appendCountyToAllRegions(function () {
                    that.dataLoaded = true;                    
                    callback(null);
                });
            });
        } catch (e) {
            callback(e);
        };   
    });
};

module.exports = codes;