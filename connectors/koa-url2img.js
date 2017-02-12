var koa = require('koa');
var koaBody   = require('koa-body');
var fetch = require('node-fetch');
var FormData = require('form-data');
var parseDomain = require('parse-domain');
var validUrl = require('valid-url');
var url2img = require('../exports/url2img-phantom');
var cors = require('koa-cors');


var app = koa();

// enable cors in the server
app.use(cors());

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
function getImgSrcFromUrl ( URL = '' , path = '') {
  let $result;
  
  $result = url2img.phantomUrl2Img(URL, path );
  
  return $result;
}

// validate fetch response
//
function validateRecaptcha ( recaptcha_response ) {  
  const recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
  const SECRET = '6LdsvRQUAAAAAMis59qfkEXLNcTslrVdjvZSB3Bs';
  
  let _headers = {};
  var _form = new FormData();
  var result$ = {};

  _form.append('secret', SECRET);
  _form.append('response', recaptcha_response);

  console.log('response', recaptcha_response, SECRET);


  let options = { 
      method: 'POST',
      headers: _headers,
      body: _form
  };

  result$ = fetch( recaptcha_url , options)
  .then(function(response) {
      return response.json();
  });

  return result$;
}

// response
//
app.use(function *(){
  let url = '';
  let recaptcha = '';
  let captcha_result = false;
  const imgPathPrefix = '../static';
  let imgName; 
  

  if ( this.request.body ) {
    url = this.request.body.url || '';
    recaptcha = this.request.body.recaptcha || '';
  }

  yield validateRecaptcha( recaptcha ).then(( json ) => {
      if( json ) {
        captcha_result = json.success;
      }
      console.log('+ captcha_result', captcha_result);
  });

  // parse input domain
  let domainParts = parseDomain( url );
  
  if( captcha_result && domainParts ) {
    imgName = `${Date.now()}-${domainParts.domain}-img.png`;
  } else {
    console.log('++ Invalid URL');
    captcha_result = false;
  }

  const imgPath = `${imgPathPrefix}/${imgName}`;

  console.log('++ proceding to generate image', captcha_result, url);

  if (captcha_result && validUrl.isUri(url) ) {
    yield getImgSrcFromUrl( url, imgPath ).then(( json ) => {
      
      //this should be updated to return the full image path.
      json.imgSrc = imgPath;

      console.log('json -> ', json);
      this.body = json;
    });
  } else {
    this.body = '{error: "Input parameters are invalid"}';
  }

});

// start listening in the port
app.listen(3000);

console.log(`start listening in port ${PORT}`);
// curl --data "recaptcha=abc&&url=http://www.google.com" http://localhost:3000