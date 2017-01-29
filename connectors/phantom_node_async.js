const phantom = require('phantom');
const url = 'http://google.com';
const imagePath = 'page_async.png';
(async function() {
      const instance = await phantom.create();
          const page = await instance.createPage();

              await page.property('viewportSize', {width: 1024, height: 600});
                  const status = await page.open( url );
                      console.log(`Page opened with status [${status}].`);

                          await page.render( imagePath );
                              console.log(`File created at [${imagePath}]`);

                                  await instance.exit();
}());

// node --harmony-async-await render.js
