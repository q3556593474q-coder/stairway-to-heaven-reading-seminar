'use strict';
// Enhancements are intentionally optional; all pages and PDF links work without JavaScript.
document.documentElement.classList.add('enhanced');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

for (const dropdown of document.querySelectorAll('[data-nav-dropdown]')) {
  const trigger = dropdown.querySelector('summary');
  const wrap = dropdown.querySelector('.nav-menu-wrap');
  const links = [...dropdown.querySelectorAll('.nav-menu a')];
  if (!trigger || !wrap) continue;
  let isOpen = false;
  let closeTimer;
  let leaveTimer;
  dropdown.classList.add('nav-ready');
  trigger.setAttribute('aria-expanded', 'false');
  wrap.inert = true;

  function fitMenu() {
    const top = dropdown.getBoundingClientRect().bottom + parseFloat(getComputedStyle(wrap).paddingTop);
    wrap.style.setProperty('--menu-max-height', `${Math.max(72, window.innerHeight - top - 16)}px`);
  }

  function setOpen(next) {
    window.clearTimeout(closeTimer);
    window.clearTimeout(leaveTimer);
    isOpen = next;
    trigger.setAttribute('aria-expanded', String(next));
    if (next) {
      dropdown.open = true;
      wrap.inert = false;
      fitMenu();
      // Start from the collapsed visual state even after native details hid the panel.
      wrap.getBoundingClientRect();
      dropdown.classList.add('is-open');
    } else {
      if (wrap.contains(document.activeElement)) trigger.focus({preventScroll:true});
      wrap.inert = true;
      dropdown.classList.remove('is-open');
      closeTimer = window.setTimeout(() => { dropdown.open = false; }, reducedMotion.matches ? 0 : 220);
    }
  }

  dropdown.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse') setOpen(true);
  });
  dropdown.addEventListener('pointerleave', event => {
    if (event.pointerType === 'mouse') leaveTimer = window.setTimeout(() => setOpen(false), 100);
  });
  trigger.addEventListener('click', event => {
    event.preventDefault();
    setOpen(!isOpen);
  });
  trigger.addEventListener('keydown', event => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    setOpen(true);
    (event.key === 'ArrowDown' ? links[0] : links.at(-1))?.focus();
  });
  dropdown.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      trigger.focus({preventScroll:true});
    }
  });
  dropdown.addEventListener('focusout', event => {
    if (event.relatedTarget === null && dropdown.matches(':hover')) return;
    if (!dropdown.contains(event.relatedTarget)) setOpen(false);
  });
  document.addEventListener('pointerdown', event => {
    if (!dropdown.contains(event.target)) setOpen(false);
  });
  window.addEventListener('resize', () => { if (isOpen) fitMenu(); });
  window.addEventListener('pageshow', () => setOpen(false));
}

for (const details of document.querySelectorAll('[data-accordion]')) {
  const summary = details.querySelector('summary');
  if (!summary) continue;
  let animation = null;
  let closing = false;
  summary.addEventListener('click', event => {
    if (reducedMotion.matches || !details.animate) return;
    event.preventDefault();
    const start = details.getBoundingClientRect().height;
    const willOpen = !details.open || closing;
    if (animation) { animation.onfinish = null; animation.cancel(); }
    closing = !willOpen;
    details.style.height = `${start}px`;
    details.open = true;
    // Measure the actual expanded layout, including content padding and margins.
    details.style.height = '';
    const naturalHeight = details.getBoundingClientRect().height;
    const style = getComputedStyle(details);
    const edges = ['paddingTop','paddingBottom','borderTopWidth','borderBottomWidth'].reduce((sum,key) => sum + (parseFloat(style[key]) || 0), 0);
    details.style.height = `${start}px`;
    const end = willOpen ? naturalHeight : summary.getBoundingClientRect().height + edges;
    animation = details.animate([{height:`${start}px`},{height:`${end}px`}], {duration:420,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'});
    animation.onfinish = () => {
      details.open = willOpen;
      details.style.height = '';
      animation.cancel();
      animation = null;
      closing = false;
    };
  });
}

function revealLinkedEntry() {
  let id;
  try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
  if (!id) return;
  const target = document.getElementById(id);
  if (target && target.matches('.seminar-entry')) {
    target.open = true;
    target.scrollIntoView({behavior: reducedMotion.matches ? 'instant' : 'smooth',block:'start'});
  }
}
window.addEventListener('hashchange',revealLinkedEntry);
revealLinkedEntry();
