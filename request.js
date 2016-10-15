var request = require('request');

request({
    url: 'https://api.com/categories',
    headers: {
        'Bearer': 'sampleapitoken'
    }
}, function(error, response, body) {
    if(error || response.statusCode !== 200) {
        // handle error
    } else {
        var json = JSON.parse(body);
        res.render('list.html', {
            title: 'Listing',
            data: json
        });
    }
});