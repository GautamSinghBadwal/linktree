'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // ---------- Sidebar toggle ----------
  const sidebar = $('[data-sidebar]');
  const sidebarBtn = $('[data-sidebar-btn]');
  if (sidebar && sidebarBtn) {
    sidebarBtn.addEventListener('click', () => sidebar.classList.toggle('active'));
  }

  // ---------- NAV & PAGES ----------
  const navLinks = $$('[data-nav-link]');
  const pages = $$('[data-page]');

  // map labels -> actual data-page names used in your HTML
  const labelToPage = {
    'about': 'about',
    'resume': 'resume',
    'portfolio': 'projects',
    'projects': 'projects',
    'blog': 'certificates',
    'certificates': 'certificates',
    'contact': 'contact'
  };

  function showPageByName(pageName) {
    if (!pages.length) return false;
    const found = pages.find(p => p.dataset.page === pageName);
    if (found) {
      pages.forEach(p => p.classList.toggle('active', p === found));
      return true;
    }
    return false;
  }

  function setActiveNav(link) {
    if (!navLinks.length) return;
    navLinks.forEach(l => l.classList.toggle('active', l === link));
  }

  // initial sync: if a nav has .active, open its page; otherwise open first page
  if (navLinks.length && pages.length) {
    const initial = navLinks.find(l => l.classList.contains('active')) || navLinks[0];
    let target = initial.dataset.target ? initial.dataset.target.trim() : initial.textContent.trim().toLowerCase();
    if (!initial.dataset.target) target = labelToPage[target] || target;
    if (!showPageByName(target)) {
      pages.forEach((p, i) => p.classList.toggle('active', i === 0));
      if (navLinks[0]) navLinks[0].classList.add('active');
    } else {
      setActiveNav(initial);
    }
  }

  // click handlers
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      let target = link.dataset.target ? link.dataset.target.trim() : link.textContent.trim().toLowerCase();
      if (!link.dataset.target) target = labelToPage[target] || target;

      if (!showPageByName(target)) {
        console.warn(`Navigation: no page found for "${target}". Showing first page as fallback.`);
        pages.forEach((p, i) => p.classList.toggle('active', i === 0));
      }

      setActiveNav(link);
      window.scrollTo(0, 0);
    });
  });

  // ---------- CONTACT FORM (optional) ----------
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

  // ---------- SELECT / FILTER (optional) ----------
  const select = $('[data-select]');
  const selectItems = $$('[data-select-item]');
  const selectValue = $('[data-selecct-value]') || $('[data-select-value]');
  const filterBtns = $$('[data-filter-btn]');
  const filterItems = $$('[data-filter-item]');

  const applyFilter = val => {
    if (!filterItems.length) return;
    filterItems.forEach(item => item.classList.toggle('active', val === 'all' || item.dataset.category === val));
  };

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

}); // DOMContentLoaded
