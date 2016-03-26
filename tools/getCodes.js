var request = require('request');
var promiseChain = require("promise-chain");

var fs = require('fs');
var cheerio = require('cheerio');
  
var arr = [];
var cities = require('../data/cities.json');  
var url;
//var url = 'https://ru.wikipedia.org/wiki/%D0%90%D0%B4%D1%8B%D0%B3%D0%B5%D0%B9%D1%81%D0%BA';


var promise = function (city, i, arr) {

    return new Promise (function (resolve, reject) {
        var url = city.link;

        request(url, function (error, response, body) {
          //console.log('i: ' + i);
          if (!error && response.statusCode == 200) {
            //console.log(body) // Show the HTML for the Google homepage. 

            $ = cheerio.load(body);

            var table = $('table.infobox.vcard').html();
            //console.log(table);
            var code = null;
            if (table) {
              $ = cheerio.load(table);
               var qqq = null;

              $('table tr').each(function (index, element) {

                //console.log($(this).text());

                //console.log($(this).html());
                //console.log('qq: ' + $('td', this).text());

                var p = $('td', this).text().split('\n');

                if (p[0] == 'Телефонный код') {
                  //console.log('pppp: ' + p[1])
                  code = p[1].split(' ')[1];

                };


              });
            }
            
            console.log('i: ' + i);
            console.log('city: ' + city.title);
            console.log('code: ' + code);

            var t = {
              title: city.title,
              code: code,
              link: url,
              region: city.region
            };

            //arr.push(t);


 
            resolve(t);
            
            
          } else {
            reject('connection error')
          }

        });

    })   
    
};


var promises = [];


/*
var p = new Promise(function(resolve, reject){
    resolve()
  });
  
for (var i = cities.length - 1; i >= 0; i--) {
  
  console.log('i:', i, 'city:', cities[i]);
  p = p.then(function () {
    console.log('i:', i, 'city:', cities[i]);
    return promise(cities[i], i).then(function(res){
      console.log(res);
    }).catch(function(err){
      //console.log(err);
    })
  });
};
*/

for (var i = cities.length - 1; i >= 0; i--) {
  promises[i] = promise(cities[i], i, arr);
}

/*
promises.reduce(function(s, n, i){
  console.log('iq:', i);
  return s.then(n);
}, new Promise(function (resolve, reject) {resolve()}))
*/

/*
promiseChain(promises).then(function() {
    console.log("done");
});
*/



Promise.all( promises )
.then(
    function( values ) {
        //console.log(values);
        console.log('done: ');
        fs.writeFile('cities.json', JSON.stringify(values, "", 4), function(){
          console.log('done');
        })
    }
).catch(
    function( exeption ) {
        console.warn( exeption );
    }
);

