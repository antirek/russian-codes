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

codes.prototype.getRegionsByType = function (type, callback) {
    type = type.toLowerCase();
    this.getDataByField('type', type, function (err, arr) {
        callback(err, arr);
    });
};

codes.prototype.getRegionsByTitle = function (title, callback) {
    this.getDataByField('title', title, function (err, arr) {
        callback(null, arr[0]);
    });
};

codes.prototype.getDataByField = function (field, value, callback) {
    if (!this.isData()) {
        callback(new Error('No data'));
    } else {
        var arr = this.data.filter(function (element) {
            return element[field] == value;
        });
        callback(null, arr);
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