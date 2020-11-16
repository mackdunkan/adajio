import Swiper from 'swiper';
import swiper from 'swiper/bundle';
// import 'swiper/swiper-bundle.css';
// import slider from './page-slide/slide'

const breakpoint = window.matchMedia( '(max-width:767px)' );

const breakpointChecker = function() {
  // if larger viewport and multi-row layout needed
  if ( breakpoint.matches === true ) {
    // clean up old instances and inline styles when available
    // if ( swiperPage !== undefined ) swiperPage.destroy( true, true );
    // or/and do nothing
    return;
    // else if a small viewport and single column layout needed
  } else if ( breakpoint.matches === false ) {
    // fire small viewport version of swiper
    return enableSwiper();
  }
};

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
    slidesPerView: 1,
    mousewheel: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    observer: true,
    observeParents: true,
    parallax:true,
  });
};

// keep an eye on viewport size changes
breakpoint.addListener(breakpointChecker);
// kickstart
breakpointChecker();

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

      if(res === "success") {
        ym(61997986, 'reachGoal', data.idAndGoal)
        if(data.idAndGoal === "preza") {
          window.location.assign("https://drive.google.com/file/d/11mNuA62qrpNGC3qrvrpUjBA_LmahuxMo/view")
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
    XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    XHR.send( 'param=' + JSON.stringify(data) );
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
  // mask phone
  // https://javascript.ru/forum/dom-window/63870-kak-sdelat-masku-telefona-v-input-c-7-___-bez-jquery-5.html

  [].forEach.call( document.querySelectorAll('.phone'), function(input) {
    let keyCode;
    function mask(event) {
      event.key && (keyCode = event.key);
      let pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      let matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function(a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i)
      }
      let reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function(a) {
          return "\\d{1," + a.length + "}"
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  })

} );

