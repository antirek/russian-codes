# russian-codes
Russian Federation region codes

Install
=======

> npm install russian-codes [--save]


Use
===

`````
var Russian = require('russian-codes');
var codes = new Russian();

codes.loadData(function () {
    codes.getRegionByTitle('Иркутская область', function (err, region) {
        console.log(region);
        /* region example
            { 
                title: 'Иркутская область',
                code: '38',
                gibdd: '38, 138, 85',     //автомобильные коды
                okato: '25',
                code_iso_31662: 'RU-IRK',
                type: 'область',
                county: '5'       // федеральный округ
            }
        */
    });
});
    
`````

API
===

See more [wiki](https://github.com/antirek/russian-codes/wiki/API)


Links
=====

[Субъекты Российской Федерации](https://ru.wikipedia.org/wiki/%D0%A1%D1%83%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D1%8B_%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D0%B9%D1%81%D0%BA%D0%BE%D0%B9_%D0%A4%D0%B5%D0%B4%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%B8)

[Коды субъектов Российской Федерации](https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%B4%D1%8B_%D1%81%D1%83%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%BE%D0%B2_%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D0%B9%D1%81%D0%BA%D0%BE%D0%B9_%D0%A4%D0%B5%D0%B4%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%B8)

