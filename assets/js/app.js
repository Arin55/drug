// Mobile nav toggle
(function() {
  const toggle = document.getElementById('navToggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }
  // Footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// Simple auth guard helpers using localStorage
const auth = {
  key: 'dis_user',
  get() { try { return JSON.parse(localStorage.getItem(this.key) || 'null'); } catch { return null; } },
  set(user) { localStorage.setItem(this.key, JSON.stringify(user)); },
  clear() { localStorage.removeItem(this.key); }
};

// Theme toggle with persistence
(function() {
  const root = document.documentElement;
  const saved = localStorage.getItem('dis_theme');
  if (saved === 'light') root.classList.add('light');
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    root.classList.toggle('light');
    localStorage.setItem('dis_theme', root.classList.contains('light') ? 'light' : 'dark');
  });
})();


