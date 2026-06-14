// ── PROJECT PAGE OVERLAY TRANSITIONS + DARK MODE ──
(function() {
  const path = window.location.pathname;
  const isProjectPage = path.includes('project-') || path.includes('about.html') || path.includes('journal.html') || path.includes('mddocs.html') || path.includes('figmamake.html') || path.includes('aiprompts.html') || path.includes('intick.html') || path.includes('darkroom.html');

  if (!isProjectPage) return;

  // Apply dark mode immediately to <html> (body may not exist yet if script is in <head>)
  const savedDark = localStorage.getItem('pg_dark');
  if (savedDark === null || savedDark === 'true') {
    document.documentElement.classList.add('dark');
  }

  const sunIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
  const moonIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

  // Scroll-aware header: make buttons fully visible once user scrolls
  // On mobile, fade the header out after scrolling past it
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 40);
    if (window.innerWidth <= 600) {
      header.classList.toggle('faded', window.scrollY > 80);
    }
  }, { passive: true });

  document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class for entrance transition
    requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add('loaded')));

    // Inject toggle into header
    const rightTitle = document.querySelector('.right-title');
    if (rightTitle) {
      const btn = document.createElement('button');
      btn.className = 'project-dark-toggle';
      btn.title = 'Toggle dark mode';
      btn.innerHTML = document.documentElement.classList.contains('dark') ? sunIcon : moonIcon;
      rightTitle.appendChild(btn);
      btn.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('pg_dark', isDark);
        btn.innerHTML = isDark ? sunIcon : moonIcon;
      });
    }
  });

  // Fast exit on close / back links
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href="index.html"], a[href="journal.html"], a.close-link');
    if (!link) return;
    e.preventDefault();
    const href = link.getAttribute('href') || 'index.html';
    document.body.classList.add('overlay-exit');
    setTimeout(() => { window.location.href = href; }, 150);
  });
})();

document.addEventListener('DOMContentLoaded', () => {
  const filterTags = document.querySelectorAll('.filter-tag');
  const gridItems = document.querySelectorAll('.grid-item');

  // Select the "All" filter tag initially and add "active" class
  const allFilter = document.querySelector('.filter-tag[data-category="all"]');
  if (allFilter) allFilter.classList.add('active');
  if (!filterTags.length) return;

  filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const category = tag.getAttribute('data-category');

      if (category === 'all') {
        gridItems.forEach(item => item.style.display = 'block');
      } else {
        gridItems.forEach(item => {
          if (item.classList.contains(category)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      }

      filterTags.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
    });
  });

  const rotatingTitle = document.getElementById('rotatingTitle');
  if (!rotatingTitle) return;
  const titles = [
    { text: 'UX', color: '#68BB8F' },
    { text: 'UI', color: '#98B8DB' },
    { text: '& Research', color: '#E69279' },
    { text: 'Patrick Guilfoyle', color: '#333333' }
  ];
  let currentIndex = 0;

  setInterval(() => {
    rotatingTitle.style.filter = 'blur(1px)';

    setTimeout(() => {
      rotatingTitle.textContent = titles[currentIndex].text;
      rotatingTitle.style.color = titles[currentIndex].color;
      rotatingTitle.style.filter = 'blur(0px)';
      currentIndex = (currentIndex + 1) % titles.length;
    }, 300);

  }, 5000);

  // Staggered fade-in animation for project grid items on page load
  gridItems.forEach((item, index) => {
    item.style.opacity = 0;
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

    setTimeout(() => {
      item.style.opacity = 1;
      item.style.transform = 'translateY(0)';
    }, index * 100); // 100ms delay between each item
  });

  // Removed London time and weather code as per your request
});



// For the carousel

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel-container').forEach((carousel) => {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    const dotContainer = carousel.querySelector('.carousel-dots');
    let currentIndex = 0;
    let autoPlay;

    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('carousel-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        currentIndex = index;
        showSlide(currentIndex);
        resetAutoplay();
      });
      dotContainer.appendChild(dot);
    });

    const dots = carousel.querySelectorAll('.carousel-dot');

    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    };

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    };

    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    };

    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });

    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });

    const startAutoplay = () => {
      autoPlay = setInterval(nextSlide, 100000);
    };

    const resetAutoplay = () => {
      clearInterval(autoPlay);
      startAutoplay();
    };

    // Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 40) {
        nextSlide();
        resetAutoplay();
      }
      if (touchEndX > touchStartX + 40) {
        prevSlide();
        resetAutoplay();
      }
    });

    showSlide(currentIndex);
    startAutoplay();
  });
});