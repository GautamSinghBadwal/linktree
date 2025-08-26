'use strict';

// small helpers
const $  = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => p.querySelectorAll(s);

document.addEventListener('DOMContentLoaded', () => {

  // ----- element toggle
  const toggle = (el) => el && el.classList.toggle('active');

  // ----- sidebar (mobile)
  const sidebar    = $('[data-sidebar]');
  const sidebarBtn = $('[data-sidebar-btn]');
  if (sidebar && sidebarBtn) {
    sidebarBtn.addEventListener('click', () => toggle(sidebar));
  }

  // ===== NO TESTIMONIALS CODE =====

  // ----- custom select / filters (optional)
  const select      = $('[data-select]');
  const selectItems = $$('[data-select-item]');
  // support both spellings just in case
  const selectValue = $('[data-selecct-value]') || $('[data-select-value]');
  const filterBtns  = $$('[data-filter-btn]');
  const filterItems = $$('[data-filter-item]');

  const applyFilter = (val) => {
    if (!filterItems.length) return;
    filterItems.forEach(item => {
      const show = (val === 'all') || (val === item.dataset.category);
      item.classList.toggle('active', show);
    });
  };

  if (select) {
    select.addEventListener('click', () => toggle(select));
  }

  if (selectItems.length) {
    selectItems.forEach(it => {
      it.addEventListener('click', () => {
        const val = it.textContent.trim().toLowerCase();
        if (selectValue) selectValue.textContent = it.textContent.trim();
        toggle(select);
        applyFilter(val);
      });
    });
  }

  let lastFilterBtn = filterBtns[0] || null;
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.textContent.trim().toLowerCase();
        if (selectValue) selectValue.textContent = btn.textContent.trim();
        applyFilter(val);
        if (lastFilterBtn) lastFilterBtn.classList.remove('active');
        btn.classList.add('active');
        lastFilterBtn = btn;
      });
    });
  }

  // ----- contact form (optional)
  const form       = $('[data-form]');
  const formInputs = $$('[data-form-input]');
  const formBtn    = $('[data-form-btn]');

  if (form && formInputs.length && formBtn) {
    formInputs.forEach(inp => {
      inp.addEventListener('input', () => {
        if (form.checkValidity()) {
          formBtn.removeAttribute('disabled');
        } else {
          formBtn.setAttribute('disabled', '');
        }
      });
    });
  }

  // ----- page navigation
  const navLinks = $$('[data-nav-link]');
  const pages    = $$('[data-page]');

  if (navLinks.length && pages.length) {
    // ensure only the correct page is active at load
    const ensureSync = () => {
      const activeLink = [...navLinks].find(l => l.classList.contains('active'));
      const target = activeLink
        ? activeLink.textContent.trim().toLowerCase()
        : pages[0].dataset.page;

      pages.forEach(p => p.classList.toggle('active', p.dataset.page === target));
      navLinks.forEach(l => l.classList.toggle(
        'active',
        l.textContent.trim().toLowerCase() === target
      ));
    };

    ensureSync();

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const target = link.textContent.trim().toLowerCase();
        // switch pages
        pages.forEach(p => p.classList.toggle('active', p.dataset.page === target));
        // switch nav highlight
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        window.scrollTo(0, 0);
      });
    });
  }

});
