"use strict";

// -------------------- NAVBAR PAGE SWITCHING --------------------
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("article[data-page]");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    const targetPage = link.dataset.pageTarget; // from HTML button

    // show/hide pages
    pages.forEach(page => {
      if (page.dataset.page === targetPage) {
        page.classList.add("active");
      } else {
        page.classList.remove("active");
      }
    });

    // update active navbar button
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});


// -------------------- SIDEBAR TOGGLE --------------------
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
const moreInfo = document.querySelector(".sidebar-info_more");

if (sidebarBtn && moreInfo) {
  sidebarBtn.addEventListener("click", () => {
    moreInfo.classList.toggle("active");

    // change button text
    if (moreInfo.classList.contains("active")) {
      sidebarBtn.querySelector("span").innerText = "Hide Contacts";
    } else {
      sidebarBtn.querySelector("span").innerText = "Show Contacts";
    }
  });
}


// -------------------- PROJECT / BLOG FILTER --------------------
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;

    // highlight selected button
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // filter items
    filterItems.forEach(item => {
      if (category === "all" || item.dataset.category === category) {
        item.classList.add("active");
        item.style.display = "block";
      } else {
        item.classList.remove("active");
        item.style.display = "none";
      }
    });
  });
});
