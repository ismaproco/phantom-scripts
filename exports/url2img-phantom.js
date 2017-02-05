var phantom = require("phantom");

function phantomUrl2Img( url, imagePath ) {
    var _ph, _page, _outObj;

    phantom.create().then(ph => {
        _ph = ph;
            return _ph.createPage();
    }).then(page => {
        _page = page;
            return _page.open( url );
    }).then(status => {
        console.log(status);
            return _page.render( imagePath )
    }).then( () => {
        console.log( 'process end');
            _page.close();
                _ph.exit();
    }).catch(e => console.log(e));
}

module.exports = { phantomUrl2Img };