const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach(navLink => {
  navLink.addEventListener("click", function () {
    const targetPage = this.textContent.trim().toLowerCase();

    // Show/hide articles
    pages.forEach(page => {
      if (page.dataset.page === targetPage) {
        page.classList.add("active");
      } else {
        page.classList.remove("active");
      }
    });

    navigationLinks.forEach(navLink => {
  navLink.addEventListener("click", handleNavClick);
  navLink.addEventListener("touchend", handleNavClick);
});



    // Set the correct nav button as active
    navigationLinks.forEach(btn => {
      if (btn.textContent.trim().toLowerCase() === targetPage) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Optionally scroll to top
    window.scrollTo(0, 0);
  });
});
