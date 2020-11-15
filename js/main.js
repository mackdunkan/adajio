import Swiper from 'swiper';
import swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import slider from './page-slide/slide'

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
