var koa = require('koa');
var koaBody   = require('koa-body');
var fetch = require('node-fetch');
var FormData = require('form-data');

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
  let response = '';

  if ( this.request.body ) {
    response = this.request.body.response || '';
  }

  yield validateRecaptcha( response ).then(( json ) => {
      console.log('json -> ', json);
      this.body = json;
  });
  
});

// start listening in the port
app.listen(3000);

console.log(`start listening in port ${PORT}`);
// curl --data "response=x321321x321x13x12" http://localhost:3000