// repoOwner = lighthouse-labs, repoName = laser-shark

var request = require('request');
var fs = require('fs');

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

function getGithubCollaborators(username , repo, callback) {
  var endpoint = `/repos/${username}/${repo}/contributors`;
  githubRequest(endpoint, callback );
}

function getRepoContributors(repoOwner, repoName,  callback) {
  githubRequest(endpoint, callback);
}

getRepoContributors(repoOwner, repoName, function(error, response, body) {
  if (error) {
    console.log("Something went horribly wrong" + error);
    return;
  }

  var result = JSON.parse(body);
  result.forEach(function(contributor){
    downloadImageByUrl(contributor.avatar_url, `avatars/${contributor.login}`);
  });
});


function downloadImageByUrl (url, filePath) {
  request.head(url, function(err, res, body){
    var fileNameExt = res.headers['content-type'].split('/').pop();
    request(url).pipe(fs.createWriteStream(`${filePath}.${fileNameExt}`));
  });
}