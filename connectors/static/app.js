var getImageBtn = document.getElementById('getImageBtn');
var urlTxt = document.getElementById('urlTxt');

var recaptchaResponse;

function getResponse(response) {
    console.warn(response);
    recaptchaResponse = response;
    getImageBtn.style.display = 'block';
}

function addImage(src) {
    var img = document.createElement("img");
    img.src = src.split('/')[2];

    var container = document.getElementById("imgContainer");
    container.appendChild(img);
}



(function init() {
    getImageBtn.addEventListener( 'click', function(event) {
    fetch('http://localhost:3000/', {
        method: 'POST', 
        mode: 'cors', 
        redirect: 'follow',
        headers: new Headers({
        'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
        recaptcha: recaptchaResponse, 
        url: urlTxt.value
        })
    }).then(function( response ) { 
        console.log('external response', response );
        return response.json();
    }).then(function(json){
        console.log('json -> ', json );
        addImage(json.imgSrc);
    });
    });

    //hide button
    getImageBtn.style.display = 'none';
})();