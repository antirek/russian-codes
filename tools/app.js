var request = require('request');

var fs = require('fs');
var cheerio = require('cheerio');
    
var url = 'https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%B4%D1%8B_%D1%81%D1%83%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%BE%D0%B2_%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D0%B9%D1%81%D0%BA%D0%BE%D0%B9_%D0%A4%D0%B5%D0%B4%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%B8';


request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    //console.log(body) // Show the HTML for the Google homepage. 

    $ = cheerio.load(body);

    var arr = [];

	$('table.sortable.standard tr').each(function (index, element){
		var q = $(this).text().split('\n');
		var w = {
			title: q[1],
			code: q[2],
			gibdd: q[3],
			okato: q[4],
			code_iso_31662: q[5],
			type: ''
		}
		arr.push(w);
		//console.log(index, $(this).text());
	});


	//$('h2').addClass('welcome');
	console.log(arr);
	fs.writeFile('1.json', JSON.stringify(arr, "", 4), function(){
		console.log('done');
	})
  }
})


