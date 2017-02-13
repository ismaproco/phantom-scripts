var koa = require('koa');
var serve = require('koa-static');
var send = require('koa-send');

var app = koa();

app.use(serve(`${__dirname}/static`));

const PORT = 8080;

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

// this last middleware catches any request that isn't handled by
// koa-static or koa-router, ie your index.html in your example
app.use(function* index() {
  yield send(this, __dirname + '/index.html');
});

// start listening in the port
app.listen(PORT);

console.log(`start listening in port ${PORT}`);
// curl http://localhost:8080