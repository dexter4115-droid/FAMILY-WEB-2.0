// Lightweight RSVP handler: submits to Formspree or a Google Form proxy.
// Replace FORM_ENDPOINT with your own (e.g., https://formspree.io/f/xxxxxxx).
const FORM_ENDPOINT = ''; // TODO: add your endpoint

const form = document.getElementById('rsvp-form');
const statusEl = document.querySelector('.form-status');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!FORM_ENDPOINT) {
      statusEl.textContent = 'Form endpoint not configured.';
      statusEl.style.color = 'crimson';
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    statusEl.textContent = 'Sending...';

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      statusEl.textContent = 'Thank you! We received your RSVP.';
      statusEl.style.color = 'green';
      form.reset();
    } catch (err) {
      statusEl.textContent = 'Failed to send. Please try again later.';
      statusEl.style.color = 'crimson';
      console.error(err);
    }
  });
}
