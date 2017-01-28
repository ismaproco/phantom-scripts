var system = require('system');
var page = require('webpage').create();

var args = system.args;

var inputUrl, inputimg;

function generateImg(url, img, callback) {
  page.viewportSize = { width: 1024, height: 768 };
  page.open( url, function() {
    page.render(img);
    if(callback){
      callback();
    }
  });
}


if( args && args.length && args.length < 3) {
  console.log('error: no enough arguments provided')
} else {
    inputUrl = args[1]; 
    inputImg = args[2];

    generateImg(inputUrl, inputImg, function() {
      console.log('ok: image generated');
      phantom.exit();
    });
}

