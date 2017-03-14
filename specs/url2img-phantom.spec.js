var u2i = require('../connectors/url2img-phantom');

const URL = 'https://www.amazon.de/';
const IMAGE_PATH = `${Date.now()}-bg.png`;
const viewportSizes = {
    p800: { width: 800, height: 600 },
    p1024: { width: 1024, height: 768 },
    p1080: { width: 1920, height: 1080 },
    p4k: { width: 3840, height: 2160 },
}

var u2i$ = u2i.phantomUrl2Img( URL, 'p800'+IMAGE_PATH, viewportSizes.p800);

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


var u2i$ = u2i.phantomUrl2Img( URL, 'p1024_'+IMAGE_PATH,  viewportSizes.p1024);

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


var u2i$ = u2i.phantomUrl2Img( URL, 'p1080_'+IMAGE_PATH,  viewportSizes.p1080);

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

var u2i$ = u2i.phantomUrl2Img( URL, 'p4k_'+IMAGE_PATH,  viewportSizes.p4k);

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