document.addEventListener('DOMContentLoaded', function() {
  let btnBurger = document.querySelector('.header__burger');
  let btnBurgerActive = document.querySelector('.burger__btn');
  let containBurger = document.querySelector('.burger__container');

  btnBurger.addEventListener('click', function() {
    containBurger.style.display = "block";
    btnBurgerActive.style.display = "block";
  });

  btnBurgerActive.addEventListener('click', function() {
    containBurger.style.display = "none";
    btnBurgerActive.style.display = "none";
  });

  document.querySelectorAll('.burger__item').forEach(function (item) {
    item.addEventListener('click', function() {
      containBurger.style.display = "none";
      btnBurgerActive.style.display = "none";
    });
  });
});
