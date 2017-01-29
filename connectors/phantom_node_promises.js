var phantom = require("phantom");
var _ph, _page, _outObj;

phantom.create().then(ph => {
      _ph = ph;
          return _ph.createPage();
}).then(page => {
      _page = page;
          return _page.open('https://stackoverflow.com/');
}).then(status => {
      console.log(status);
          return _page.render('page.png')
}).then( () => {
      console.log( 'process end');
          _page.close();
              _ph.exit();
}).catch(e => console.log(e));
