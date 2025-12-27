// Year (guarded)
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Mobile nav (guarded)
const toggle = document.querySelector('.nav-toggle');
const list = document.querySelector('.nav-list');
if (toggle) {
  toggle.addEventListener('click', () => {
    if (!list) return;
    // Use computed style to detect visibility reliably
    const visible = getComputedStyle(list).display === 'block';
    list.style.display = visible ? 'none' : 'block';
  });
}