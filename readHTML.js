
var http = require('http');


var options = {
  host: 'www.example.com',
  path: '/'
};

callback = function(response) {
  var str = '';


  response.on('data', function (chunk) {
    str += chunk;
  });


  response.on('end', function () {
    console.log(str);
  });
}

http.request(options, callback).end();

