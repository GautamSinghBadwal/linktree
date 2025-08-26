'use strict';

// ---------- SIDEBAR TOGGLE ----------
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
}

// ---------- NAVBAR + PAGES ----------
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    const target = link.dataset.target; // ✅ use data-target

    // Show matching page
    pages.forEach(page => {
      if (page.dataset.page === target) {
        page.classList.add("active");
      } else {
        page.classList.remove("active");
      }
    });

    // Update active link style
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    // Scroll to top on change
    window.scrollTo(0, 0);
  });
});

// ---------- CONTACT FORM ----------
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form) {
  formInputs.forEach(input => {
    input.addEventListener("input", () => {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  });
}

// ---------- CUSTOM SELECT ----------
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", () => {
    select.classList.toggle("active");
  });

  selectItems.forEach(item => {
    item.addEventListener("click", () => {
      let selectedValue = item.innerText.toLowerCase();
      selectValue.innerText = item.innerText;
      select.classList.remove("active");
      filterFunc(selectedValue);
    });
  });
}

// ---------- FILTERING ----------
const filterItems = document.querySelectorAll("[data-filter-item]");

function filterFunc(selectedValue) {
  filterItems.forEach(item => {
    if (selectedValue === "all" || selectedValue === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// ---------- FILTER BUTTONS ----------
let lastClickedBtn = filterBtn[0];

if (filterBtn.length > 0) {
  filterBtn.forEach(btn => {
    btn.addEventListener("click", () => {
      filterFunc(btn.innerText.toLowerCase());

      lastClickedBtn.classList.remove("active");
      btn.classList.add("active");
      lastClickedBtn = btn;
    });
  });
}
