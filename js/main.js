import Swiper from 'swiper';
import swiper from 'swiper/bundle';
// import 'swiper/swiper-bundle.css';
// import slider from './page-slide/slide'
import $ from 'jquery';

const YTPlayer = require('yt-player')
const breakpoint = window.matchMedia( '(max-width:767px)' );
const breakpointLG = window.matchMedia( '(max-width:1023px)' );
const serviceVideo = new YTPlayer('#service-video', {autoplay: true, controls: false, related: false, loop: true})
const investmentsVideo = new YTPlayer('#investments-video', {autoplay: true, controls: false, related: false, loop: true})

serviceVideo.load('1Le9hBgGy64')
investmentsVideo.load('iSRzFpQF1PU')

serviceVideo.play()
serviceVideo.setVolume(0)
investmentsVideo.play()
investmentsVideo.setVolume(0)

serviceVideo.on('playing', () => {
  console.log(serviceVideo.getDuration()) // => 351.521
})

investmentsVideo.on('playing', () => {
  console.log(investmentsVideo.getDuration()) // => 351.521
})

serviceVideo.on('ended', () => {
  serviceVideo.play()
})

investmentsVideo.on('ended', () => {
  investmentsVideo.play()
})

$(window).on('load resize', function(){
  let w = $(window).width();
  let h = $(window).height();
  if(breakpoint.matches === false) {
    setVideoSize(h, w, serviceVideo, '#service-video')
    setVideoSize(h, w, investmentsVideo, '#investments-video')
  }
  else {
    console.log("no breakpoint LG")
  }

  if(breakpointLG.matches === false) {
    enableSwiper()
  }
  else {
    console.log("no breakpoint LG")
  }

});

const setVideoSize = (h,w, player, id) => {
  if (w/h > 16/9){
    player.setSize(w, w/16*9);
    $('.bg-video').css({'left': '0px'});
  } else {
    player.setSize(h/9*16, h);
    $(`${id}.bg-video`).css({'left': '0px'});
    $(`${id}.bg-video`).css({'left': -($(`${id}.bg-video`).outerWidth()-w)/2});
  }
}


// const breakpointChecker = function() {
//   // if larger viewport and multi-row layout needed
//   if ( breakpointLG.matches === true ) {
//     // clean up old instances and inline styles when available
//     // if ( swiperPage !== undefined ) swiperPage.destroy( true, true );
//     // or/and do nothing
//     return;
//     // else if a small viewport and single column layout needed
//   } else if ( breakpointLG.matches === false ) {
//     // fire small viewport version of swiper
//     return enableSwiper();
//   }
// };
// // keep an eye on viewport size changes
// breakpointLG.addListener(breakpointChecker);
// // kickstart
// breakpointChecker();

(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

ym(61997986, "init", {
  clickmap:true,
  trackLinks:true,
  accurateTrackBounce:true,
  webvisor:true
});

const enableSwiper = function() {
  let swiperPage = new Swiper('.slides-page', {
    direction: 'vertical',
    //effect: 'fade',
    speed: 1000,
    slidesPerView: 1,
    mousewheel: true,
    simulateTouch: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    observer: true,
    observeParents: true,
    parallax:true,
  });
};

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



// const mySlider = slider('.slides');

var galleryThumbs = new Swiper('.gallery-thumbs', {
  spaceBetween: 10,
  slidesPerView: 2,
  breakpoints: {
    640: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 10,
    },
    1280: {
      slidesPerView: 7,
      spaceBetween: 10,
    }
  }
});
var galleryTop = new Swiper('.gallery-top', {
  spaceBetween: 10,
  loop: true,
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
      const goal = () => (breakpoint.matches === false) ? data.idAndGoal : `${data.idAndGoal}_mobile`

      if(res === "success") {
        ym(61997986, 'reachGoal', goal())
        if(data.idAndGoal === "preza" || data.idAndGoal === "timeout") {
          modalClose();
          window.open('https://drive.google.com/file/d/1i9O7I3VtoB4-6n8MWgMcXxdof7EF3XzX/view', '_blank');
          }
        modalClose();
        openModal(null, 'success')
      } else {
        modalClose();
        openModal(null, 'error')
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
    XHR.setRequestHeader("Content-Type", "application/json");
    const sendData = JSON.stringify(data)
    XHR.send(sendData);
  }

  // Access the form element...
  const formModal = document.getElementById( "form-modal" );
  const formDownload = document.getElementById( "form-download" );

  formData(formModal);
  formData(formDownload);

  function formData(form) {
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
  }
} );


