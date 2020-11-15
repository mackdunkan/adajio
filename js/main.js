import Swiper from 'swiper';
import swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import slider from './page-slide/slide'

(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

ym(61997986, "init", {
  clickmap:true,
  trackLinks:true,
  accurateTrackBounce:true,
  webvisor:true
});


var mySwiper = new Swiper ('.invest-slide', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  centeredSlides: true,
  slidesPerView: 1,

  pagination: {
    el: '.invest-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.invest-button-next',
    prevEl: '.invest-button-prev',
  },
  observer: true,
  observeParents: true,
  parallax:true,
})



const mySlider = slider('.slides');

var galleryThumbs = new Swiper('.gallery-thumbs', {
  spaceBetween: 10,
  slidesPerView: 7,
  freeMode: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
});
var galleryTop = new Swiper('.gallery-top', {
  spaceBetween: 10,
  navigation: {
    nextEl: '.gallery-button-next',
    prevEl: '.gallery-button-prev',
  },
  thumbs: {
    swiper: galleryThumbs
  }
});

window.addEventListener( "load", function () {
  function sendData(data) {
    const XHR = new XMLHttpRequest();

    // Bind the FormData object and the form element
    // const FD = new FormData( data );

    // Define what happens on successful data submission
    XHR.addEventListener( "load", function(event) {
      const res = event.target.responseText
      console.log( 'res: ' + res );
      if(res === "success") {
        alert( res );
        ym(111, 'reachGoal', data.idAndGoal)
      } else {
        alert( event.target.responseText );
      }
    } );

    // Define what happens in case of error
    XHR.addEventListener( "error", function( event ) {
      alert( 'Oops! Something went wrong.' );
    } );

    // Set up our request
    XHR.open( "POST", "sendEmail.php" );

    // The data sent is what the user provided in the form
    console.log(data)
    XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    XHR.send( 'param=' + JSON.stringify(data) );
  }

  // Access the form element...
  const form = document.getElementById( "form" );

  // ...and take over its submit event.
  form.addEventListener( "submit", function ( event ) {
    event.preventDefault();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    sendData({
      phone: form.elements["phone"].value,
      idAndGoal: form.elements["goal"].value,
      location: queryString,
      utm_source: urlParams.get("utm_source"),
      utm_medium: urlParams.get("utm_medium"),
      utm_campaign: urlParams.get("utm_campaign"),
      utm_content: urlParams.get("utm_content"),
      utm_term: urlParams.get("utm_term"),
    });
  } );
} );

