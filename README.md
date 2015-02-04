# russian-codes
Russian Federation region codes

Install
=======

> npm install russian-codes [--save]


Use
===

`````
var Russian = require('./index');
var codes = new Russian();

codes.loadData(function () {
    codes.getRegionByTitle('Республика Бурятия', function(err, region){
        console.log(region);
        /* region example
            {
                "title": "Республика Бурятия",
                "code": "03",
                "gibdd": "03",
                "okato": "81",
                "code_iso_31662": "RU-BU",
                "type": "республика"
            }
        */
    });
});
    
`````


Links
=====

https://ru.wikipedia.org/wiki/%D0%A1%D1%83%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D1%8B_%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D0%B9%D1%81%D0%BA%D0%BE%D0%B9_%D0%A4%D0%B5%D0%B4%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%B8

https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%B4%D1%8B_%D1%81%D1%83%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%BE%D0%B2_%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D0%B9%D1%81%D0%BA%D0%BE%D0%B9_%D0%A4%D0%B5%D0%B4%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%B8

