var request = require('request');
var fs = require('fs');

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
       .pipe(fs.createWriteStream("./" + filePath))

};

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")