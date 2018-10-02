var request = require('request');
var secrets = require('./secrets.js')
var fs = require('fs');
var owner = process.argv[2];
var repo = process.argv[3];

//If parameters missing, throw error"
if (!(process.argv[2] && process.argv[3])){
  console.log("Missing Parameter - Enter repoOwner, repoName");
  return;
}

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secrets.GITHUB_TOKEN
    }
  };
//Actions completed to requested information
  request(options, function(err, res, body) {
    if (err) {
      console.error("Error :", err)

    }
    else {
      var allData = JSON.parse(body); //string to JSON
      cb(null, getAvatar(allData));
    }
  });
}

//loop to download images from data
function getAvatar(element) {
  return element.forEach(function(value) {
    downloadImageByURL(value.avatar_url, "avatars/" + value.login + ".jpg")
  });
}

//download and save image
function downloadImageByURL(url, filePath) {
request.get(url)
       .on('error', function (err) {
         throw err;
         console.log("ERROR!")
       })
       .on('response', function (response) {
         console.log('Downloading!')
         console.log('Response Message: ', response.statusMessage)
         console.log('Content Type: ', response.headers['content-type'])
       })
       .on('end', function () {
          console.log("Download Complete!")
       })
       .pipe(fs.createWriteStream(filePath))

};

getRepoContributors(owner, repo, function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

