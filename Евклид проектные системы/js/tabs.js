document.addEventListener ('DOMContentLoaded', function() {
  document.querySelectorAll('.section-how-we-work__tabs').forEach(function(tabsBtn) {
    tabsBtn.addEventListener ('click', function(event) {
      const path = event.currentTarget.dataset.path;

      document.querySelectorAll('.wrapper-info').forEach(function(tabContent) {
        tabContent.classList.remove('wrapper-info_active');
      });

      document.querySelectorAll('.section-how-we-work__tabs').forEach(function(tabBtn) {
        tabBtn.classList.remove('section-how-we-work__tabs_active');
      });

      document.querySelector(` [data-target="${path}"] `).classList.add('wrapper-info_active');
      document.querySelector(` [data-path="${path}"] `).classList.add('section-how-we-work__tabs_active');
    });
  });
});
