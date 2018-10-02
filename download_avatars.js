var request = require('request');
var secrets = require('./secrets.js')


function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    if (err) {
      console.error("Error :", err)

    }
    else {
      var allData = JSON.parse(body);
      cb(null, getAvatar(allData));
    }
  });
}

function getAvatar(element) {
  return element.map(function(value) {
    return value.avatar_url;
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

