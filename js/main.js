/* ==========================================================================
   MAIN — app wiring and dynamic rendering
   ========================================================================== */

(function () {
  'use strict';

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
  }

  /* ---- Projects ------------------------------------------------------- */
  function projectCardHTML(project) {
    const t = window.I18n ? window.I18n.t : function (k) { return k; };
    const title = t(project.titleKey);
    const desc = t(project.descKey);
    const tags = project.tags.map(function (tag) {
      return '<span class="tag">' + escapeHTML(tag) + '</span>';
    }).join('');

    let links = '<a class="btn btn--secondary btn--sm" href="' + project.github + '" target="_blank" rel="noopener noreferrer">' +
      '<svg><use href="#icon-github"></use></svg><span>' + escapeHTML(t('projectsLinkCode')) + '</span></a>';

    if (project.demo) {
      links += '<a class="btn btn--ghost btn--sm" href="' + project.demo + '" target="_blank" rel="noopener noreferrer">' +
        '<svg><use href="#icon-external-link"></use></svg><span>' + escapeHTML(t('projectsLinkDemo')) + '</span></a>';
    }
    if (project.download) {
      const downloadAttr = project.downloadFilename ? ' download="' + project.downloadFilename + '"' : ' download';
      links += '<a class="btn btn--ghost btn--sm" href="' + project.download + '"' + downloadAttr + '>' +
        '<svg><use href="#icon-download"></use></svg><span>' + escapeHTML(t('projectsLinkDownload')) + '</span></a>';
    }

    const motionImg = project.gif
      ? '<img class="project-card__img project-card__img--motion" src="' + project.gif + '" alt="" aria-hidden="true" loading="lazy">'
      : '';

    return (
      '<article class="card card--interactive project-card reveal">' +
        '<div class="project-card__media">' +
          '<img class="project-card__img project-card__img--static" src="' + project.image + '" alt="' + escapeHTML(title) + '" loading="lazy">' +
          motionImg +
        '</div>' +
        '<div class="project-card__body">' +
          '<h3 class="project-card__title">' + escapeHTML(title) + '</h3>' +
          '<p class="project-card__desc">' + escapeHTML(desc) + '</p>' +
          '<div class="tag-row project-card__tags">' + tags + '</div>' +
          '<div class="project-card__links">' + links + '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid || typeof PROJECTS_DATA === 'undefined') return;
    grid.innerHTML = PROJECTS_DATA.map(projectCardHTML).join('');
    if (window.PortfolioAnimations) {
      window.PortfolioAnimations.initScrollReveal(grid);
    }
    initMobileProjectPreviews(grid);
  }

  /* ---- Mobile project GIF preview ---------------------------------------
     Devices without a real hover state (phones/tablets) can't trigger the
     desktop hover crossfade, so once a card is fully on screen for a couple
     of seconds we play its GIF briefly instead, then revert to the static
     thumbnail. Skipped entirely on devices that DO support hover, and on
     reduced-motion — the desktop CSS :hover effect already covers those. */
  const PREVIEW_DELAY_MS = 2500;
  const PREVIEW_DURATION_MS = 3000;
  let mobilePreviewObserver = null;
  let mobilePreviewActiveCard = null;

  function canHover() {
    return !!(window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }

  function stopMobilePreview(card) {
    if (card.dataset.previewTimer) {
      window.clearTimeout(Number(card.dataset.previewTimer));
      delete card.dataset.previewTimer;
    }
    if (mobilePreviewActiveCard === card) {
      card.classList.remove('is-previewing');
      mobilePreviewActiveCard = null;
    }
  }

  function initMobileProjectPreviews(root) {
    if (mobilePreviewObserver) {
      mobilePreviewObserver.disconnect();
      mobilePreviewObserver = null;
    }
    mobilePreviewActiveCard = null;

    if (canHover()) return; // desktop hover already handles this via CSS
    if (window.PortfolioAnimations && window.PortfolioAnimations.reducedMotion()) return;
    if (!('IntersectionObserver' in window)) return;

    const scope = root || document;
    const cards = Array.prototype.slice.call(scope.querySelectorAll('.project-card'));
    if (!cards.length) return;

    mobilePreviewObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        const card = entry.target;
        if (!card.querySelector('.project-card__img--motion')) return;

        const fullyVisible = entry.isIntersecting && entry.intersectionRatio >= 0.99;
        if (!fullyVisible) {
          stopMobilePreview(card);
          return;
        }
        if (card.dataset.previewTimer || mobilePreviewActiveCard === card) return;

        const timerId = window.setTimeout(function () {
          delete card.dataset.previewTimer;
          if (mobilePreviewActiveCard) return; // another card is already playing — skip this cycle
          mobilePreviewActiveCard = card;
          card.classList.add('is-previewing');
          window.setTimeout(function () {
            if (mobilePreviewActiveCard === card) {
              card.classList.remove('is-previewing');
              mobilePreviewActiveCard = null;
            }
          }, PREVIEW_DURATION_MS);
        }, PREVIEW_DELAY_MS);
        card.dataset.previewTimer = String(timerId);
      });
    }, { threshold: 1.0 });

    cards.forEach(function (card) { mobilePreviewObserver.observe(card); });
  }

  function renderDynamicContent() {
    renderProjects();
  }

  /* ---- Mobile nav ------------------------------------------------------- */
  function initMobileNav() {
    const toggle = document.getElementById('mobileNavToggle');
    const panel = document.getElementById('mobileNav');
    if (!toggle || !panel) return;

    function close() {
      panel.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.classList.remove('is-active');
      document.body.style.overflow = '';
    }
    function open() {
      panel.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    }

    toggle.addEventListener('click', function () {
      if (panel.classList.contains('is-open')) close(); else open();
    });
    Array.prototype.forEach.call(panel.querySelectorAll('a'), function (link) {
      link.addEventListener('click', close);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  /* ---- Language switch ---------------------------------------------------*/
  function initLangSwitch() {
    const wrap = document.getElementById('langSwitch');
    const btn = document.getElementById('langSwitchBtn');
    const menu = document.getElementById('langSwitchMenu');
    if (!wrap || !btn || !menu) return;

    function close() {
      wrap.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    }
    function open() {
      wrap.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
    }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (wrap.classList.contains('is-open')) close(); else open();
    });

    Array.prototype.forEach.call(menu.querySelectorAll('.lang-switch__option'), function (opt) {
      opt.addEventListener('click', function () {
        const lang = opt.getAttribute('data-lang');
        if (window.I18n) window.I18n.setLanguage(lang);
        close();
      });
    });

    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  /* ---- Theme toggle button ------------------------------------------------*/
  function initThemeToggleButton() {
    const btn = document.getElementById('themeToggle');
    if (!btn || !window.ThemeManager) return;
    btn.addEventListener('click', function () {
      window.ThemeManager.toggle();
    });
  }

  /* ---- Copy to clipboard ---------------------------------------------------*/
  function announce(msg) {
    const el = document.getElementById('a11yAnnouncer');
    if (el) el.textContent = msg;
  }

  function fallbackCopy(value, cb) {
    const input = document.createElement('textarea');
    input.value = value;
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.focus();
    input.select();
    try { document.execCommand('copy'); } catch (e) { /* clipboard unavailable */ }
    document.body.removeChild(input);
    cb();
  }

  function initCopyButtons() {
    Array.prototype.forEach.call(document.querySelectorAll('.contact-method__copy'), function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const value = btn.getAttribute('data-copy-value');
        if (!value) return;

        const done = function () {
          btn.classList.add('is-copied');
          announce(window.I18n ? window.I18n.t('copiedFeedback') : 'Copied!');
          setTimeout(function () { btn.classList.remove('is-copied'); }, 1600);
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(value).then(done).catch(function () { fallbackCopy(value, done); });
        } else {
          fallbackCopy(value, done);
        }
      });
    });
  }

  /* ---- Contact form (Formspree) ---------------------------------------------*/
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const MIN_MESSAGE_LENGTH = 10;
  const VALIDATED_FIELD_IDS = ['formName', 'formEmail', 'formSubject', 'formMessage'];

  function t(key) {
    return window.I18n ? window.I18n.t(key) : key;
  }

  /** Returns an i18n key describing why `field` is invalid, or null if it's fine. */
  function getFieldErrorKey(field) {
    const value = field.value.trim();
    if (!value) return 'formErrorRequired';
    if (field.id === 'formEmail' && !EMAIL_PATTERN.test(value)) return 'formErrorEmailInvalid';
    if (field.id === 'formMessage' && value.length < MIN_MESSAGE_LENGTH) return 'formErrorMessageTooShort';
    return null;
  }

  function setFieldValidity(field, errorKey) {
    const wrap = field.closest('.field');
    const errorEl = document.getElementById(field.id + '-error');
    const isValid = !errorKey;

    if (wrap) wrap.classList.toggle('has-error', !isValid);
    field.setAttribute('aria-invalid', isValid ? 'false' : 'true');
    if (errorEl) {
      errorEl.textContent = isValid ? '' : t(errorKey);
      errorEl.classList.toggle('field__error--visible', !isValid);
    }
    return isValid;
  }

  function validateField(field) {
    return setFieldValidity(field, getFieldErrorKey(field));
  }

  function validateForm(form) {
    let firstInvalidField = null;
    let formIsValid = true;

    VALIDATED_FIELD_IDS.forEach(function (id) {
      const field = form.querySelector('#' + id);
      if (!field) return;
      const fieldIsValid = validateField(field);
      if (!fieldIsValid) {
        formIsValid = false;
        if (!firstInvalidField) firstInvalidField = field;
      }
    });

    if (firstInvalidField) firstInvalidField.focus();
    return formIsValid;
  }

  function initContactForm() {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    if (!form || !status) return;

    function showStatus(type, message) {
      status.textContent = message;
      status.className = 'form-status is-visible form-status--' + type;
    }

    /* Re-validate a field as the person fixes it, but only once it has
       already been flagged — this avoids nagging while they're still typing. */
    VALIDATED_FIELD_IDS.forEach(function (id) {
      const field = form.querySelector('#' + id);
      if (!field) return;
      field.addEventListener('blur', function () { validateField(field); });
      field.addEventListener('input', function () {
        const wrap = field.closest('.field');
        if (wrap && wrap.classList.contains('has-error')) validateField(field);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!validateForm(form)) {
        showStatus('error', t('formErrorFixFields'));
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const idleLabel = t('formSend');
      const sendingLabel = t('formSending');

      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = sendingLabel; }
      showStatus('info', sendingLabel);

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            form.reset();
            VALIDATED_FIELD_IDS.forEach(function (id) {
              const field = form.querySelector('#' + id);
              if (field) setFieldValidity(field, null);
            });
            showStatus('success', t('formSuccess'));
          } else {
            showStatus('error', t('formErrorServer'));
          }
        })
        .catch(function () {
          showStatus('error', t('formErrorNetwork'));
        })
        .finally(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = idleLabel; }
        });
    });
  }

  /* ---- Footer year ---------------------------------------------------------*/
  function initFooterYear() {
    const el = document.getElementById('footerYear');
    if (el) el.textContent = new Date().getFullYear();
  }

  window.PortfolioMain = { renderDynamicContent: renderDynamicContent };

  document.addEventListener('DOMContentLoaded', function () {
    if (window.ThemeManager) window.ThemeManager.init();
    if (window.I18n) window.I18n.init(); /* also triggers the first renderProjects() */

    initMobileNav();
    initLangSwitch();
    initThemeToggleButton();
    initCopyButtons();
    initContactForm();
    initFooterYear();

    if (window.PortfolioAnimations) {
      window.PortfolioAnimations.initScrollReveal();
      window.PortfolioAnimations.initNavScrollState();
      window.PortfolioAnimations.initActiveNavLink();
      window.PortfolioAnimations.initBackToTop();
    }
  });
})();
