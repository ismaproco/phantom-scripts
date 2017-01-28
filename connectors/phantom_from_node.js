var http = require('http');
var phantom = require('phantom');

phantom.create(function (ph) {
    ph.createPage(function (page) {
          http.createServer(function (req, res) {
              // TODO: parse `request` and determine where to go
              page.open(someURL, function (status) {
                  res.writeHead(200, {'Content-Type': 'text/plain'});
                  // TODO: do something on the page and generate `result`
                  res.end(result);
              });
          }).listen(8080);
    });
});
