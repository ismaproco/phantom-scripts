# PhantomJS scripts collection

- Basic example to generate img from url [scripts/basic-urltoimg.js]

## TODO


- Add the calls to the html to validate the url and recaptcha validity
- include img url as the result of the recaptcha resolve


## DONE
- Added url validation to the koa's middleware
- Create koa's middleware to use the phantom class for image generation (connectors/koa-url2img.js)
- Created script for the image creation from url using phantom native node module
- Created basic middle ware in koa
- Created koa's fetch to validate the recaptchas validity
- Created static html with basic recaptchas
- Created spec scripts to check the image generation and recaptcha validation script
- improve the server created in the connector/koa-midd.js to execute the phantom script as part of the iteration process of the middleware of the server.
- remove unused scripts