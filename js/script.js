// Utility Functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const addClass = (element, className) => element.classList.add(className);
const removeClass = (element, className) => element.classList.remove(className);
const hasClass = (element, className) => element.classList.contains(className);
const toggleClass = (element, className) => element.classList.toggle(className);

const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
};

// Mobile Navigation
function toggleMenu() {
  const hamburger = $('.hamburger');
  const navLinks = $('#nav-links');
  
  toggleClass(hamburger, 'active');
  toggleClass(navLinks, 'active');
  hamburger.setAttribute('aria-expanded', hasClass(hamburger, 'active'));
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const hamburger = $('.hamburger');
  const navLinks = $('#nav-links');
  
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target) && hasClass(navLinks, 'active')) {
    removeClass(hamburger, 'active');
    removeClass(navLinks, 'active');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

// Modal Controller
class SchoolPoliciesModalController {
  constructor() {
    this.modal = document.getElementById('schoolRulesModal');
    this.openBtn = document.getElementById('rulesReadMoreBtn');
    this.closeBtn = document.getElementById('closeRulesModalBtn');
    this.tabButtons = document.querySelectorAll('.tabs__button');
    this.tabPanels = document.querySelectorAll('.tab-panel');
  }

  init() {
    if (!this.modal || !this.openBtn || !this.closeBtn) return;

    // Open modal
    this.openBtn.addEventListener('click', () => {
      this.modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      // Activate first tab
      this.tabButtons.forEach((btn, i) => {
        btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        btn.classList.toggle('active', i === 0);
      });
      this.tabPanels.forEach((panel, i) => {
        panel.hidden = i !== 0;
        panel.classList.toggle('active', i === 0);
      });
    });

    // Close modal
    this.closeBtn.addEventListener('click', () => this.closeModal());
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('is-active')) {
        this.closeModal();
      }
    });

    // Tab switching
    this.tabButtons.forEach(button => {
      button.addEventListener('click', () => this.switchTab(button));
    });
  }

  closeModal() {
    this.modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  switchTab(button) {
    const targetId = button.getAttribute('aria-controls');
    const targetPanel = document.getElementById(targetId);
    this.tabButtons.forEach(btn => {
      btn.setAttribute('aria-selected', 'false');
      btn.classList.remove('active');
    });
    button.setAttribute('aria-selected', 'true');
    button.classList.add('active');
    this.tabPanels.forEach(panel => {
      panel.hidden = true;
      panel.classList.remove('active');
    });
    targetPanel.hidden = false;
    targetPanel.classList.add('active');
  }
}

// Animation Controller
class AnimationController {
  constructor() {
    this.animatedElements = $$('.animate-on-scroll');
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            addClass(entry.target, 'is-visible');
            this.observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );
  }

  init() {
    this.animatedElements.forEach((element) => {
      this.observer.observe(element);
    });
  }
}

// Back to Top Button
(function() {
  const backToTopButton = document.getElementById('backToTop');
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    });
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();

// Initialize all controllers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const modalController = new SchoolPoliciesModalController();
  const animationController = new AnimationController();

  animationController.init();
  modalController.init();
});

// Scroll animations for sections
const animateOnScroll = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-left', 'animate-right');
      observer.unobserve(entry.target); // Animation only once
    }
  });
};

const observer = new IntersectionObserver(animateOnScroll, { threshold: 0.2 });

document.querySelectorAll('.principal-container').forEach(section => {
  observer.observe(section);
});

// Stats section animation on scroll
function animateCounter(el, target, suffix = "") {
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const currentValue = Math.floor(progress * target);
    el.textContent = currentValue + suffix;
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target + suffix;
    }
  }
  requestAnimationFrame(update);
}

// Intersection Observer for stats
let statsAnimated = false;
const statsSection = document.getElementById('statsSection');
const statElements = document.querySelectorAll('.stat');

function handleStatsIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      statElements.forEach((stat, idx) => {
        setTimeout(() => {
          stat.classList.add('visible');
          const counter = stat.querySelector('.counter');
          const target = +counter.getAttribute('data-target');
          const suffix = counter.getAttribute('data-suffix') || "";
          animateCounter(counter, target, suffix);
        }, idx * 200);
      });
      observer.unobserve(statsSection);
    }
  });
}

if (statsSection) {
  const statsObserver = new IntersectionObserver(handleStatsIntersection, { threshold: 0.3 });
  statsObserver.observe(statsSection);
}

// Notice Card Modal
(function() {
  const noticeModal = document.getElementById('noticeModal');
  const noticeModalTitle = document.getElementById('noticeModalTitle');
  const noticeModalDate = document.getElementById('noticeModalDate');
  const noticeModalBody = document.getElementById('noticeModalBody');

  document.querySelectorAll('.notice-card').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      noticeModalTitle.textContent = this.getAttribute('data-title');
      noticeModalDate.textContent = this.getAttribute('data-date');
      noticeModalBody.innerHTML = this.getAttribute('data-content');
      noticeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  window.closeNoticeModal = function() {
    noticeModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Close modal on outside click
  noticeModal.addEventListener('click', function(e) {
    if (e.target === noticeModal) closeNoticeModal();
  });
})();

document.addEventListener('DOMContentLoaded', function() {
  var hero = document.querySelector('.hero-center-content');
  if (hero) {
    hero.style.opacity = '1';
    hero.style.transform = 'none';
    hero.style.transition = 'opacity 2s cubic-bezier(0.23, 1, 0.32, 1) 0.4s, transform 2s cubic-bezier(0.23, 1, 0.32, 1) 0.4s';
  }
});

// ====== LIGHTBOX GALLERY (for gallery.html) ======
(function() {
  let currentImageIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;
  let images = [];

  function updateLightboxImage() {
    const lightboxImg = document.getElementById('lightbox-img');
    if (!images.length) return;
    const img = images[currentImageIndex];
    // Fade out
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxImg.style.opacity = '1';
    }, 300);
  }

  window.openLightbox = function(element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const img = element.querySelector('img');
    images = Array.from(document.querySelectorAll('.grid-item img'));
    currentImageIndex = images.indexOf(img);
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    setTimeout(() => {
      lightbox.classList.add('active');
    }, 10);
    document.body.style.overflow = 'hidden';
  };

  // Only close when clicking overlay or close button, not the image
  function lightboxClickHandler(e) {
    const lightboxImg = document.getElementById('lightbox-img');
    if (e.target.classList.contains('close-btn')) {
      window.closeLightbox();
    } else if (e.target === e.currentTarget) {
      window.closeLightbox();
    }
    // Do nothing if clicking the image
  }

  window.closeLightbox = function() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  function showNextImage() {
    if (!images.length) return;
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateLightboxImage();
  }
  function showPreviousImage() {
    if (!images.length) return;
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateLightboxImage();
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        showPreviousImage();
      } else {
        showNextImage();
      }
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
      lightbox.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
      });
      lightbox.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      });
      // Fix: Only close when clicking overlay or close button
      lightbox.addEventListener('click', lightboxClickHandler);
    }
    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
      if (lightbox && lightbox.classList.contains('active')) {
        if (event.key === 'Escape') {
          window.closeLightbox();
        } else if (event.key === 'ArrowLeft') {
          showPreviousImage();
        } else if (event.key === 'ArrowRight') {
          showNextImage();
        }
      }
    });
  });
})();
