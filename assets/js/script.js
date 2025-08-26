'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ----------------- Sidebar -----------------
  const sidebar = $('[data-sidebar]');
  const sidebarBtn = $('[data-sidebar-btn]');
  if (sidebar && sidebarBtn) {
    sidebarBtn.addEventListener('click', () => sidebar.classList.toggle('active'));
  }

  // ----------------- NAV & PAGES -----------------
  const navLinks = $$('[data-nav-link]');
  const pages = $$('[data-page]');

  // Map visible button text -> data-page names used in your HTML
  const labelToPage = {
    'about': 'about',
    'resume': 'resume',
    'portfolio': 'projects',      // Portfolio button should open data-page="projects"
    'projects': 'projects',
    'blog': 'certificates',       // Blog button should open data-page="certificates"
    'certificates': 'certificates',
    'contact': 'contact'
  };

  // show page by its data-page name, return true if found
  function showPageByName(pageName) {
    if (!pages.length) return false;
    const found = pages.find(p => p.dataset.page === pageName);
    if (found) {
      pages.forEach(p => p.classList.toggle('active', p === found));
      return true;
    }
    return false;
  }

  // set nav active appearance
  function setActiveNav(link) {
    if (!navLinks.length) return;
    navLinks.forEach(l => l.classList.toggle('active', l === link));
  }

  // initial sync: if a nav has .active, open its page; else open first page
  if (navLinks.length && pages.length) {
    const initial = navLinks.find(l => l.classList.contains('active')) || navLinks[0];
    let target = initial.dataset.target ? initial.dataset.target.trim() : initial.textContent.trim().toLowerCase();
    if (!initial.dataset.target) target = labelToPage[target] || target;
    if (!showPageByName(target)) {
      // fallback: show first page and mark first nav active
      pages.forEach((p, i) => p.classList.toggle('active', i === 0));
      if (navLinks[0]) navLinks[0].classList.add('active');
    } else {
      setActiveNav(initial);
    }
  }

  // nav click handlers
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // prefer explicit data-target if present, else use button text -> map
      let target = link.dataset.target ? link.dataset.target.trim() : link.textContent.trim().toLowerCase();
      if (!link.dataset.target) target = labelToPage[target] || target;

      if (!showPageByName(target)) {
        console.warn(`Navigation: no page found for "${target}". Falling back to first page.`);
        pages.forEach((p, i) => p.classList.toggle('active', i === 0));
      }

      setActiveNav(link);
      window.scrollTo(0, 0);
    });
  });

  // ----------------- CONTACT FORM (optional) -----------------
  const form = $('[data-form]');
  const formInputs = $$('[data-form-input]');
  const formBtn = $('[data-form-btn]');
  if (form && formInputs.length && formBtn) {
    formInputs.forEach(inp => {
      inp.addEventListener('input', () => {
        if (form.checkValidity()) formBtn.removeAttribute('disabled');
        else formBtn.setAttribute('disabled', '');
      });
    });
  }

  // ----------------- SELECT / FILTER (optional) -----------------
  const select = $('[data-select]');
  const selectItems = $$('[data-select-item]');
  const selectValue = $('[data-selecct-value]') || $('[data-select-value]'); // support both spellings
  const filterBtns = $$('[data-filter-btn]');
  const filterItems = $$('[data-filter-item]');

  function applyFilter(val) {
    if (!filterItems.length) return;
    filterItems.forEach(item => item.classList.toggle('active', val === 'all' || item.dataset.category === val));
  }

  if (select) {
    select.addEventListener('click', () => select.classList.toggle('active'));
  }

  if (selectItems.length) {
    selectItems.forEach(it => {
      it.addEventListener('click', () => {
        const text = it.textContent.trim();
        if (selectValue) selectValue.textContent = text;
        if (select) select.classList.remove('active');
        applyFilter(text.toLowerCase());
      });
    });
  }

  if (filterBtns.length) {
    let last = filterBtns[0];
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const v = btn.textContent.trim().toLowerCase();
        if (selectValue) selectValue.textContent = btn.textContent.trim();
        applyFilter(v);
        if (last) last.classList.remove('active');
        btn.classList.add('active');
        last = btn;
      });
    });
  }

}); // DOMContentLoaded end
