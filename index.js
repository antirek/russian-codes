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
    if (!this.isData()) {
        callback(new Error('No data'));
    } else {
        var type = type.toLowerCase();
        var arr = this.data.filter(function (element) {
            return element.type == type;
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