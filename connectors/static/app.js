function addImageToPage(src) {
  var img = document.createElement("img");
  img.src = src.split('/')[2];

  var container = document.querySelector('.img-container');
  var content = document.querySelector('.content');

  content.style.display = 'none';
  container.appendChild(img);
}

function getImage(_captchaResponse, _url) {
  fetch('http://localhost:3000/', {
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
  });
}


function getResponse(response) {
  let recaptchaResponse = response;
  let urlTxt = document.getElementById('urlTxt').value;
  console.warn(response);
  getImage(recaptchaResponse, urlTxt);
}