var request = require('request');

var fs = require('fs');
var cheerio = require('cheerio');
    
var url = 'https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%BE%D0%B2_%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D0%B8';


request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    //console.log(body) // Show the HTML for the Google homepage. 

    $ = cheerio.load(body);

    var arr = [];


    var table = $('#mw-content-text').html();
    //console.log(table);

    $ = cheerio.load(table);
     var arr = [];

    $('table.wikitable tr').each(function (index, element) {

      //console.log($(this).text());
      var q = $(this).text().split('\n');

      var links = [];
      console.log(q[2] + ': ');
      $('td a', this).each(function (i, e) {
          
            console.log('q:' + $(this).attr('href'));
            links.push($(this).attr('href'));
      });

      var link = (links[2]) ? links[1] : links[0];

      var w = {
        title: q[2].replace('Оспаривается',''),
        link: 'https://ru.wikipedia.org' + link,
        region: q[3]
      }


      if (w.title != 'Город') arr.push(w); 

    });
    

    console.log(arr.length);

    fs.writeFile('cities.json', JSON.stringify(arr, "", 4), function(){
      console.log('done');
    })
  }

});