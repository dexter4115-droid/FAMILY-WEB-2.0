// Auto-inject gallery images from a known folder pattern.
// Configure albums here. Keys map to data-album attributes in albums.html.
const ALBUMS = {
  '2025-christmas': {
    path: 'images/albums/2025-christmas', // change to your real folder
    count: 6,
    caption: 'Christmas 2025 • Marsabit'
  },
  '2025-newyear': {
    path: 'images/albums/2025-newyear',
    count: 6,
    caption: 'New Year 2026 • Karura Forest'
  },
  'newyear-picnic': {
    path: 'images/albums/newyear-picnic',
    count: 2,
    caption: 'New Year Picnic • Jan 1, 2026 • Karura Forest'
  },
  'recent-photos': {
    path: 'images/albums/recent-photos',
    count: 2,
    caption: 'Recent Photos • Latest family moments'
  },
  'isakos-photos': {
    path: 'images/albums/isakos-photos',
    count: 71,
    caption: 'ISAKOS Photos • Family moments'
  }
};

function buildFigure(src, alt, caption) {
  const fig = document.createElement('figure');
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.loading = 'lazy';
  fig.appendChild(img);

  const fc = document.createElement('figcaption');
  fc.textContent = caption;
  fig.appendChild(fc);
  return fig;
}

async function injectGalleries() {
  const galleries = document.querySelectorAll('.gallery');
  for (const g of galleries) {
    const albumKey = g.dataset.album;
    const album = ALBUMS[albumKey];
    if (!album) continue;

    let i = 1;
    while (true) {
      const src = `${album.path}/${String(i).padStart(2, '0')}.jpg`;
      try {
        // Check if image exists by trying to load it
        await new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });

        const fig = buildFigure(src, `Photo ${i}`, `${album.caption} — #${i}`);
        g.appendChild(fig);

        // Click -> open lightbox
        fig.addEventListener('click', () => openLightbox(src, `${album.caption} — #${i}`));
        i++;
      } catch (error) {
        // Image doesn't exist, stop loading for this album
        break;
      }
    }
  }
}

const lb = document.getElementById('lightbox');
const lbImg = document.querySelector('.lightbox-img');
const lbCap = document.querySelector('.lightbox-caption');
const lbClose = document.querySelector('.lightbox-close');

function openLightbox(src, caption) {
  lbImg.src = src;
  lbImg.alt = caption;
  lbCap.textContent = caption;
  lb.classList.add('open');
  lb.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden', 'true');
  lbImg.src = '';
  lbCap.textContent = '';
}

lbClose.addEventListener('click', closeLightbox);
lb.addEventListener('click', (e) => {
  if (e.target === lb) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

async function injectCarousels() {
  const carousels = document.querySelectorAll('.carousel-gallery');
  for (const c of carousels) {
    const albumKey = c.dataset.album;
    const album = ALBUMS[albumKey];
    if (!album) continue;

    let images = [];
    let i = 1;
    while (true) {
      const src = `${album.path}/${String(i).padStart(2, '0')}.jpg`;
      try {
        // Check if image exists by trying to load it
        await new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });

        images.push({ src, caption: `${album.caption} — #${i}` });
        i++;
      } catch (error) {
        // Image doesn't exist, stop loading for this album
        break;
      }
    }

    if (images.length > 0) {
      // Create carousel structure
      const container = c.parentElement;
      const prevBtn = container.querySelector('.carousel-prev');
      const nextBtn = container.querySelector('.carousel-next');

      let currentIndex = 0;

      function showImage(index) {
        c.innerHTML = '';
        const img = document.createElement('img');
        img.src = images[index].src;
        img.alt = images[index].caption;
        img.className = 'carousel-image';
        img.addEventListener('click', () => openLightbox(images[index].src, images[index].caption));
        c.appendChild(img);
      }

      function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      }

      function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
      }

      prevBtn.addEventListener('click', prevImage);
      nextBtn.addEventListener('click', nextImage);

      // Show first image
      showImage(0);
    }
  }
}

injectGalleries();
injectCarousels();
