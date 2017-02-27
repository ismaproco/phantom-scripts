# PhantomJS scripts collection

- Basic example to generate img from url [scripts/basic-urltoimg.js]

## TODO


- return the path where the img will be accessible
- add the secret koa-img2url as a config parameter in a external file
- add the path to generate the images as a config parameter for the koa-img2url

- create build for simple deployment.
- create deployment strategy.
- test deploy in raspberry pi.
- make the image height to keep the aspect ratio.
- add dimensions to the image generation script.

- find a way to monitor the node js service


## DONE
- add a footer with the maxhine information.
- Added button to reload the page for new images to be loaded
- show animation while the url is being processed.
- Add the calls to the html to validate the url and recaptcha validity
- include img url as the result of the recaptcha resolve
- Added url validation to the koa's middleware
- Create koa's middleware to use the phantom class for image generation (connectors/koa-url2img.js)
- Created script for the image creation from url using phantom native node module
- Created basic middle ware in koa
- Created koa's fetch to validate the recaptchas validity
- Created static html with basic recaptchas
- Created spec scripts to check the image generation and recaptcha validation script
- improve the server created in the connector/koa-midd.js to execute the phantom script as part of the iteration process of the middleware of the server.
- remove unused scripts