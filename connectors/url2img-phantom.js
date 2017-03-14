var phantom = require("phantom");

function phantomUrl2Img( url, imagePath, viewportSize ) {
    var _ph, _page, _outObj = {};
    var resultPromise;
    viewportSize = viewportSize || { width: 1024, height: 768 };

    resultPromise = phantom.create().then(ph => {
        _ph = ph;
        return _ph.createPage();
    }).then(page => {
        _page = page;
        _page.property('viewportSize', viewportSize );
        return _page.open( url );
    }).then(status => {
        // store the status of the page open
        _outObj.pageStatus = status;
        return _page.render( imagePath )
    }).then( (render) => {
        // store the status of the image rendering
        _outObj.renderStatus = render;
        _page.close();
        _ph.exit();
        return _outObj;
    }).catch(e => {
        // close and finish instances
        if( _page) {
            _page.close();
        }

        if(_ph) {
            _ph.exit();
        }

        // store error
        _outObj.error = e;
        return _outObj;
    });

    return resultPromise;
}

module.exports = { phantomUrl2Img };