/* ==========================================================================
   THEME — dark/light mode, persisted, respects system preference
   ========================================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'preferredTheme';
  const root = document.documentElement;

  function getStoredTheme() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function getSystemTheme() {
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    return prefersLight ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
  }

  function setTheme(theme) {
    applyTheme(theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* ignore */ }
  }

  function toggleTheme() {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  function init() {
    const stored = getStoredTheme();
    applyTheme(stored === 'light' || stored === 'dark' ? stored : getSystemTheme());
  }

  window.ThemeManager = {
    init: init,
    toggle: toggleTheme,
    setTheme: setTheme,
    getTheme: function () { return root.getAttribute('data-theme') || 'dark'; }
  };
})();
