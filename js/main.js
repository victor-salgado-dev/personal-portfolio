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
    links += '<button class="btn btn--ghost btn--sm project-card__details" type="button" data-project-details="' + escapeHTML(project.id) + '">' +
      escapeHTML(t('projectDetailsButton')) + '</button>';

    const motionImg = project.gif
      ? '<img class="project-card__img project-card__img--motion" src="' + project.gif + '" alt="" aria-hidden="true" loading="lazy">'
      : '';

    return (
      '<article class="card card--interactive project-card reveal" data-project-id="' + escapeHTML(project.id) + '" tabindex="0" aria-label="' + escapeHTML(title + ' — ' + t('projectDetailsButton')) + '">' +
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
    buildProjectCarousel(grid);
    if (window.PortfolioAnimations) {
      window.PortfolioAnimations.initScrollReveal(grid);
    }
    initMobileProjectPreviews(grid);
  }

  const CAROUSEL_TRANSITION_MS = 520;
  let projectCarouselCount = 0;
  let projectCarouselTimer = null;
  let projectCarouselLocked = false;
  let projectCarouselTouchStart = null;
  let projectCarouselSuppressClick = false;
  let projectCarouselSuppressTimer = null;
  let projectCarouselHintTimer = null;

  function setProjectCarouselBusy(isBusy) {
    ['projectsPrevious', 'projectsNext'].forEach(function (id) {
      const button = document.getElementById(id);
      if (!button) return;
      button.setAttribute('aria-disabled', String(isBusy));
      button.classList.toggle('is-moving', isBusy);
    });
  }

  function projectCarouselStep(grid) {
    const firstCard = grid.firstElementChild;
    if (!firstCard) return 0;
    return firstCard.getBoundingClientRect().width + parseFloat(window.getComputedStyle(grid).gap || 0);
  }

  function buildProjectCarousel(grid) {
    if (projectCarouselTimer) window.clearTimeout(projectCarouselTimer);
    projectCarouselLocked = false;
    setProjectCarouselBusy(false);
    projectCarouselCount = grid.children.length;
    grid.style.transition = 'none';
    grid.style.transform = 'translateX(0px)';
    window.requestAnimationFrame(function () { grid.style.transition = ''; });
  }

  function moveProjectCarousel(direction) {
    const grid = document.getElementById('projectsGrid');
    if (!grid || projectCarouselCount < 2) return;
    if (projectCarouselLocked) return;
    const carousel = grid.closest('.project-carousel');
    if (carousel) carousel.classList.remove('is-swipe-hint');
    hideProjectCarouselHint();
    projectCarouselLocked = true;
    setProjectCarouselBusy(true);
    const step = projectCarouselStep(grid);
    if (direction < 0) {
      grid.style.transition = 'none';
      grid.insertBefore(grid.lastElementChild, grid.firstElementChild);
      grid.style.transform = 'translateX(-' + step + 'px)';
      grid.offsetWidth;
    }
    grid.style.transition = '';
    grid.style.transform = direction > 0 ? 'translateX(-' + step + 'px)' : 'translateX(0px)';

    let normalized = false;
    function onTransitionEnd(event) {
      if (event.target !== grid || event.propertyName !== 'transform') return;
      grid.removeEventListener('transitionend', onTransitionEnd);
      finishTransition();
    }
    function finishTransition() {
      if (normalized) return;
      normalized = true;
      grid.removeEventListener('transitionend', onTransitionEnd);
      if (projectCarouselTimer) window.clearTimeout(projectCarouselTimer);
      projectCarouselTimer = null;
      if (direction > 0) grid.appendChild(grid.firstElementChild);
      grid.style.transition = 'none';
      grid.style.transform = 'translateX(0px)';
      grid.offsetWidth;
      window.requestAnimationFrame(function () {
        grid.style.transition = '';
        projectCarouselLocked = false;
        setProjectCarouselBusy(false);
      });
    }

    grid.addEventListener('transitionend', onTransitionEnd);
    projectCarouselTimer = window.setTimeout(finishTransition, CAROUSEL_TRANSITION_MS + 80);
  }

  function hideProjectCarouselHint() {
    const carousel = document.querySelector('.project-carousel');
    const hint = document.getElementById('projectsSwipeHint');
    if (projectCarouselHintTimer) window.clearTimeout(projectCarouselHintTimer);
    projectCarouselHintTimer = null;
    if (carousel) carousel.classList.remove('is-swipe-hint');
    if (hint) hint.setAttribute('aria-hidden', 'true');
  }

  function initProjectCarousel() {
    const previous = document.getElementById('projectsPrevious');
    const next = document.getElementById('projectsNext');
    const grid = document.getElementById('projectsGrid');
    const viewport = document.getElementById('projectsViewport');
    if (!previous || !next || !grid || !viewport) return;

    previous.addEventListener('click', function () { moveProjectCarousel(-1); });
    next.addEventListener('click', function () { moveProjectCarousel(1); });

    viewport.addEventListener('pointerdown', function (event) {
      if (event.pointerType !== 'touch' && event.pointerType !== 'pen') return;
      projectCarouselTouchStart = { x: event.clientX, y: event.clientY, pointerId: event.pointerId };
    });
    viewport.addEventListener('pointerup', function (event) {
      if (!projectCarouselTouchStart || projectCarouselTouchStart.pointerId !== event.pointerId) return;
      const deltaX = event.clientX - projectCarouselTouchStart.x;
      const deltaY = event.clientY - projectCarouselTouchStart.y;
      projectCarouselTouchStart = null;
      if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) return;

      event.preventDefault();
      hideProjectCarouselHint();
      projectCarouselSuppressClick = true;
      if (projectCarouselSuppressTimer) window.clearTimeout(projectCarouselSuppressTimer);
      projectCarouselSuppressTimer = window.setTimeout(function () {
        projectCarouselSuppressClick = false;
        projectCarouselSuppressTimer = null;
      }, 350);
      moveProjectCarousel(deltaX < 0 ? 1 : -1);
    });
    viewport.addEventListener('pointercancel', function () { projectCarouselTouchStart = null; });
    grid.addEventListener('click', function (event) {
      if (!projectCarouselSuppressClick) return;
      projectCarouselSuppressClick = false;
      if (projectCarouselSuppressTimer) window.clearTimeout(projectCarouselSuppressTimer);
      projectCarouselSuppressTimer = null;
      event.preventDefault();
      event.stopImmediatePropagation();
    }, true);

    const carousel = viewport.closest('.project-carousel');
    const narrowScreen = window.matchMedia && window.matchMedia('(max-width: 560px)').matches;
    const hint = document.getElementById('projectsSwipeHint');
    if (carousel && hint && narrowScreen && 'IntersectionObserver' in window) {
      const hintObserver = new IntersectionObserver(function (entries) {
        if (!entries.some(function (entry) { return entry.isIntersecting; })) return;
        carousel.classList.add('is-swipe-hint');
        hint.setAttribute('aria-hidden', 'false');
        projectCarouselHintTimer = window.setTimeout(hideProjectCarouselHint, 4000);
        hintObserver.disconnect();
      }, { threshold: 0.35 });
      hintObserver.observe(viewport);
    }
  }

  let activeProjectId = null;
  let projectDialogOpener = null;

  function updateProjectDialog(projectId) {
    const project = PROJECTS_DATA.find(function (item) { return item.id === projectId; });
    const dialog = document.getElementById('projectDialog');
    if (!project || !dialog) return;

    document.getElementById('projectDialogTitle').textContent = t(project.titleKey);
    const dialogImage = document.getElementById('projectDialogImage');
    dialogImage.src = project.gif || project.image;
    dialogImage.alt = t(project.titleKey);
    document.getElementById('projectDialogDescription').textContent = t(project.detailsKey);
    document.getElementById('projectDialogEstimate').textContent = t(project.estimateKey);
    document.getElementById('projectDialogTags').innerHTML = project.tags.map(function (tag) {
      return '<span class="tag">' + escapeHTML(tag) + '</span>';
    }).join('');

    let links = '<a class="btn btn--secondary btn--sm" href="' + project.github + '" target="_blank" rel="noopener noreferrer">' +
      '<svg><use href="#icon-github"></use></svg><span>' + escapeHTML(t('projectsLinkCode')) + '</span></a>';
    if (project.demo) {
      links += '<a class="btn btn--ghost btn--sm" href="' + project.demo + '" target="_blank" rel="noopener noreferrer">' +
        '<svg><use href="#icon-external-link"></use></svg><span>' + escapeHTML(t('projectsLinkDemo')) + '</span></a>';
    }
    if (project.download) {
      const downloadAttr = project.downloadFilename ? ' download="' + escapeHTML(project.downloadFilename) + '"' : ' download';
      links += '<a class="btn btn--ghost btn--sm" href="' + project.download + '"' + downloadAttr + '>' +
        '<svg><use href="#icon-download"></use></svg><span>' + escapeHTML(t('projectsLinkDownload')) + '</span></a>';
    }
    document.getElementById('projectDialogLinks').innerHTML = links;
  }

  function openProjectDialog(projectId, opener) {
    const dialog = document.getElementById('projectDialog');
    if (!dialog || typeof dialog.showModal !== 'function') return;
    activeProjectId = projectId;
    projectDialogOpener = opener || document.activeElement;
    updateProjectDialog(projectId);
    if (!dialog.open) dialog.showModal();
  }

  function initProjectDialog() {
    const grid = document.getElementById('projectsGrid');
    const dialog = document.getElementById('projectDialog');
    const closeButton = document.getElementById('projectDialogClose');
    if (!grid || !dialog || !closeButton) return;

    grid.addEventListener('click', function (event) {
      const card = event.target.closest('.project-card');
      if (!card || !grid.contains(card)) return;
      if (event.target.closest('a')) return;
      const detailsButton = event.target.closest('[data-project-details]');
      if (event.target.closest('button') && !detailsButton) return;
      openProjectDialog(card.getAttribute('data-project-id'), detailsButton || card);
    });
    grid.addEventListener('keydown', function (event) {
      const card = event.target.closest('.project-card');
      if (!card || event.target !== card || (event.key !== 'Enter' && event.key !== ' ')) return;
      event.preventDefault();
      openProjectDialog(card.getAttribute('data-project-id'), card);
    });

    closeButton.addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('cancel', function (event) {
      event.preventDefault();
      dialog.close();
    });
    dialog.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        dialog.close();
      }
    });
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', function () {
      const closedProjectId = activeProjectId;
      activeProjectId = null;
      if (projectDialogOpener && projectDialogOpener.isConnected) {
        projectDialogOpener.focus();
      } else if (closedProjectId) {
        const card = grid.querySelector('[data-project-id="' + closedProjectId + '"]');
        if (card) card.focus();
      }
      projectDialogOpener = null;
    });
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
    const dialog = document.getElementById('projectDialog');
    if (dialog && dialog.open && activeProjectId) updateProjectDialog(activeProjectId);
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

    initProjectDialog();
    initProjectCarousel();
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
