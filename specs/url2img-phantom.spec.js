var u2i = require('../exports/url2img-phantom');

const URL = 'http://www.maxhine.com';
const IMAGE_PATH = `${Date.now()}-bg.png`;

var u2i$ = u2i.phantomUrl2Img( URL, IMAGE_PATH);

// wait for the promise to complete
u2i$.then((resultObj) => {
    if(resultObj.error) {
        console.log('error');
    } else if( resultObj.pageStatus === 'fail') {
        console.log('cannot get url');
    } else if( !resultObj.renderStatus ) {
        console.log('error generating image');
    } else {
        console.log( 'finish!',resultObj );    
    }
});
