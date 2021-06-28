const swiper = new Swiper('.swiper-container', {
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  autoplay : {
    delay: 2000,
    disableOnInteraction: false,
  },

  speed: 500,

});

