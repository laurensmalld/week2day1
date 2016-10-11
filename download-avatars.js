// repoOwner = lighthouse-labs, repoName = laser-shark

var request = require('request');

var repoOwner = process.argv[2];
var repoName = process.argv[3];
var endpoint = `repos/${repoOwner}/${repoName}/contributors`;


function githubRequest(endpoint, callback) {
  var options = {
    url: `https://api.github.com/${endpoint}`,
    headers: {
      'User-Agent': 'request'
    }
  };
  request.get(options, callback);
}

function getGithubCollabs(username, callback) {
  githubRequest(endpoint, callback);
}


getGithubCollabs(repoOwner, function (error, response, body) {
  if (error) {
    console.log("Something went horribly wrong:" + error);
    return;
  }

  var result = JSON.parse(body);

  console.log(result);

  result.forEach(function(image) {
    var avaImage = `${image.avatar_url}`;
    console.log(avaImage);



    var fs = require('fs');
    fs.writeFile("./url.txt", avaImage, function(err) {
    if(err) {
      return console.log(err);
    }

    console.log("The file was saved!");
    });
  });
});
