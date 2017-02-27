function addImageToPage(src) {
  var imgContainer = document.querySelector('.img-container');
  var img = document.createElement("img");
  img.src = src.split('/')[2];
  imgContainer.appendChild(img);
}

function getImage(_captchaResponse, _url) {
  setTimeout(function(){
    containersVisibilityByState( 'loading' );
      fetch('/webimg', {
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          recaptcha: _captchaResponse,
          url: _url
        })
      }).then(function (response) {
        console.log('external response', response);
        return response.json();
      }).then(function (json) {
        console.log('json -> ', json);
        addImageToPage(json.imgSrc);
        containersVisibilityByState( 'image' );
      });
  },1000);
}

function containersVisibilityByState(state) {
  var imgContainer = document.querySelector('.img-container');
  var content = document.querySelector('.content');
  var loadingContent = document.querySelector('.loading-content');

  content.style.display = 'none';
  imgContainer.style.display = 'none';
  loadingContent.style.display = 'none';

  switch(state) {
    case 'init':
      content.style.display = 'block';
    break;
    case 'image':
      imgContainer.style.display = 'flex';
    break;
    case 'loading':
      loadingContent.style.display = 'block';
    break;
    default:

    break;
  }
}

function getResponse(response) {
  let recaptchaResponse = response;
  let urlTxt = document.getElementById('urlTxt').value;
  console.warn(response);
  getImage(recaptchaResponse, urlTxt);
}

window.onload = function() {
  var btnReload = document.querySelector('.another-btn');
  btnReload.addEventListener('click', function() {
    location.href = '/';
  });
}