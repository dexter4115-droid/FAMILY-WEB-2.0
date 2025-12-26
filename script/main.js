// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav
const toggle = document.querySelector('.nav-toggle');
const list = document.querySelector('.nav-list');
if (toggle) {
  toggle.addEventListener('click', () => {
    const visible = list.style.display === 'block';
    list.style.display = visible ? 'none' : 'block';
  });
}
