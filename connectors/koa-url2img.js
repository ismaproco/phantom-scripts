var koa = require('koa');
var koaBody   = require('koa-body');
var fetch = require('node-fetch');
var FormData = require('form-data');
var parseDomain = require('parse-domain');
var validUrl = require('valid-url');
var url2img = require('../exports/url2img-phantom');

var app = koa();

app.use(koaBody({formidable:{uploadDir: __dirname}}));

const PORT = 3000;

// x-response-time
//
app.use(function *(next){
    yield next;
     // set application headers
     this.set('Content-Type', 'application/json');
});

// logger
//
app.use(function *(next){
  yield next;
  let ms = new Date();
  console.log('%s %s - %s', this.method, this.url, ms);
});

// get promise with the image's src from url
//
function getImgSrcFromUrl ( URL = '' ) {
  let $result;
  // parse input domain
  let domainParts = parseDomain(URL);
  
  if( domainParts ) {
    $result = url2img.phantomUrl2Img(URL, `${Date.now()}-${domainParts.domain}-img.png`);
  } else {
    $result = new Promise((resolve)=>{
      resolve('{error: "domain undefined"}');
    });
  }
  
  return $result;
}

// response
//
app.use(function *(){
  let url = '';

  if ( this.request.body ) {
    url = this.request.body.url || '';
  }

  if ( validUrl.isUri(url) ) {
    yield getImgSrcFromUrl( url ).then(( json ) => {
      console.log('json -> ', json);
      this.body = json;
    });
  } else {
    this.body = '{error: "Invalid URL"}';
  }

});

// start listening in the port
app.listen(3000);

console.log(`start listening in port ${PORT}`);
// curl --data "url=http://www.google.com" http://localhost:3000