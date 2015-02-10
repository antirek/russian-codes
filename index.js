var fs = require('fs'),
    path = require('path');

var codes = function (options) {
    var options = options || {};

    this.dataFile = options['dataFile'] || path.resolve(__dirname, './data/codes.json');
    this.data = null;
};

codes.prototype.isData = function () {
    return (typeof this.data == 'object');
};

codes.prototype.runCallback = function(err, data, callback){
    if (err) { 
        callback(err);
    } else {
        callback(null, data);
    }
}

codes.prototype.getRegionsByType = function (type, callback) {
    type = type.toLowerCase();
    var that = this;
    this.getDataByField('regions', 'type', type, function (err, arr) {
        that.runCallback(err, arr, callback);
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
    this.getDataByField('regions', 'title', title, function (err, arr) {
        that.runCallback(err, arr ? arr[0] : '',  callback);
    });
};

codes.prototype.getCountyByTitle = function (title, callback) {
    var that = this;
    this.getDataByField('counties', 'title', title, function (err, arr) {
        that.runCallback(err, arr ? arr[0] : '',  callback);
    });
};

codes.prototype.getCounties = function (callback) {
    var that = this;
    this.getDataByField('counties', null, null, function (err, arr) {
        that.runCallback(err, arr,  callback);
    });
};

codes.prototype.getRegions = function (callback) {
    var that = this;
    this.getDataByField('regions', null, null, function (err, arr) {
        that.runCallback(err, arr,  callback);
    });
};

codes.prototype.getRegionByISO31662 = function (code, callback) {
    var that = this;
    this.getDataByField('regions', 'code_iso_31662', code, function (err, arr) {
        that.runCallback(err, arr ? arr[0] : '', callback);
    });
};

codes.prototype.getDataByField = function (section, field, value, callback) {
    var result = null;
    if (!section) section = 'regions';

    if (!this.isData()) {
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
            callback(null);
        } catch (e) {
            callback(e);
        }
    });
};

module.exports = codes;