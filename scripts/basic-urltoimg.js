var page = require('webpage').create();

var url = 'http://www.google.com';
var img = 'img-'+encodeURIComponent(url)+ '-' + Date.now() + '.png';

page.viewportSize = { width: 1024, height: 768 };

page.open(url,function() {
    page.render(img);
    console.log('image generated');
    phantom.exit();
});


page.onError = function (msg, trace) {
      console.log(msg);
          trace.forEach(function(item) {
                    console.log('  ', item.file, ':', item.line);
                        });
};
