document.addEventListener('DOMContentLoaded', () => {
  const filterTags = document.querySelectorAll('.filter-tag');
  const gridItems = document.querySelectorAll('.grid-item');

  // Select the "All" filter tag initially and add "active" class
  const allFilter = document.querySelector('.filter-tag[data-category="all"]');
  allFilter.classList.add('active');

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