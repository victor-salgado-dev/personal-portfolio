/* ==========================================================================
   ANIMATIONS — scroll reveal, nav state, active link, back-to-top
   ========================================================================== */

(function () {
  'use strict';

  let firstRenderDone = false;

  function reducedMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  /**
   * Progressively reveals `.reveal` elements as they enter the viewport.
   * Safe to call more than once (e.g. after a language switch re-renders
   * the projects grid) — already-bound elements are skipped, and content
   * that is already on screen at re-bind time appears instantly instead
   * of replaying the animation.
   */
  function initScrollReveal(root) {
    const scope = root || document;
    const elements = Array.prototype.slice.call(scope.querySelectorAll('.reveal:not([data-reveal-bound])'));
    if (!elements.length) { firstRenderDone = true; return; }

    const groups = new Map();
    elements.forEach(function (el) {
      el.setAttribute('data-reveal-bound', 'true');
      const parent = el.parentElement;
      if (!groups.has(parent)) groups.set(parent, []);
      groups.get(parent).push(el);
    });
    groups.forEach(function (children) {
      children.forEach(function (el, i) {
        el.style.setProperty('--reveal-delay', Math.min(i * 70, 420) + 'ms');
      });
    });

    if (reducedMotion()) {
      elements.forEach(function (el) { el.classList.add('is-visible'); });
      firstRenderDone = true;
      return;
    }

    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(function (el) {
      if (firstRenderDone) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('is-visible');
          return;
        }
      }
      io.observe(el);
    });

    firstRenderDone = true;
  }

  function initNavScrollState() {
    const nav = document.getElementById('siteNav');
    if (!nav) return;
    function update() {
      if (window.scrollY > 12) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  function initActiveNavLink() {
    const sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
    const links = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
    if (!sections.length || !links.length) return;

    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          links.forEach(function (link) {
            link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { io.observe(s); });
  }

  function initBackToTop() {
    const btn = document.getElementById('toTopBtn');
    if (!btn) return;
    function update() {
      if (window.scrollY > 480) btn.classList.add('is-visible');
      else btn.classList.remove('is-visible');
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' });
    });
  }

  window.PortfolioAnimations = {
    initScrollReveal: initScrollReveal,
    initNavScrollState: initNavScrollState,
    initActiveNavLink: initActiveNavLink,
    initBackToTop: initBackToTop,
    reducedMotion: reducedMotion
  };
})();
