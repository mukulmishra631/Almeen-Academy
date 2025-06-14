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
class ModalController {
  constructor() {
    this.modal = document.getElementById('schoolRulesModal');
    this.openBtn = document.getElementById('rulesReadMoreBtn');
    this.closeBtn = document.getElementById('closeRulesModalBtn');
    this.tabButtons = document.querySelectorAll('.tabs__button');
    this.tabPanels = document.querySelectorAll('.tab-panel');
  }

  init() {
    if (!this.modal || !this.openBtn || !this.closeBtn) return;

    this.openBtn.addEventListener('click', () => this.openModal());
    this.closeBtn.addEventListener('click', () => this.closeModal());
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('is-active')) {
        this.closeModal();
      }
    });

    this.tabButtons.forEach(button => {
      button.addEventListener('click', () => this.switchTab(button));
    });
  }

  openModal() {
    this.modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  switchTab(button) {
    const targetId = button.getAttribute('aria-controls');
    const targetPanel = document.getElementById(targetId);

    // Update tab buttons
    this.tabButtons.forEach(btn => {
      btn.setAttribute('aria-selected', 'false');
      btn.classList.remove('active');
    });
    button.setAttribute('aria-selected', 'true');
    button.classList.add('active');

    // Update tab panels
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
class BackToTopController {
  constructor() {
    this.button = $('#backToTop');
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.handleScroll());
    this.button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  handleScroll() {
    if (window.pageYOffset > 300) {
      addClass(this.button, 'is-visible');
    } else {
      removeClass(this.button, 'is-visible');
    }
  }
}

// Initialize all controllers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const modalController = new ModalController();
  const animationController = new AnimationController();
  const backToTopController = new BackToTopController();

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

// Popup modal
function openModal() {
  document.getElementById("messageModal").style.display = "block";
}

function closeModal() {
  document.getElementById("messageModal").style.display = "none";
}

// Close modal when clicking outside the content
window.onclick = function (event) {
  const modal = document.getElementById("messageModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

const messages = {
  1: `Dear Parents and Students,<br>
Welcome to ALMEEN ACADEMY Sr. Sec. School, Pokharbhinda, where every day is an opportunity for growth, learning, and excellence. As the principal of this esteemed institution, I am delighted to extend my warmest greetings to each one of you.<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Our school is a place where students are encouraged to explore their passions, develop their talents, and achieve their full potential. We are committed to provide a nurturing and challenging environment that promotes academic excellence, character development and lifelong learning.<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We believe in the power of education to transform lives. Our dedicated faculty and staff work tirelessly to create a supportive and inclusive community where every student feels valued and inspired. We offer a diverse range of programs and extracurricular activities designed to foster creativity, critical thinking, and collaboration.<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Parents, your involvement and partnership are vital to our success. We encourage you to stay engaged in your child's education, participate in school events, and communicate with us regularly. Together, we ensure that our students receive the best possible educational experience.<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Student, you are the heart of our school. I challenge you to embrace every opportunity, overcome obstacles with resilience, and strive excellence in all your endeavours. Remember that your education is a journey, and we are here to support you every step of the way.<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;As we embark on this academic year, let us work together to create a vibrant and dynamic learning environment where everyone can thrive to look forward to witnessing the achievements and growth of our students and celebrating our collective successes.<br><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The words of Swami Vivekananda "Arise! Awake! And stop not till the goal is reached" act as our motto and watchword that will always inspire our children throughout their lives.<br><br>
Thank you for being a part of the ALMEEN family. Let's make this year a remarkable one!<br><br>
<b>- Ganesh Pandey</b><br>
<b>(Principal)</b>`,
  2: `This is the second principal message. Replace with real content.`,
  3: `This is the third principal message. Replace with real content.`,
};

function openModal(id) {
  document.getElementById('modalText').innerHTML = messages[id];
  document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

function closeOutside(e) {
  if (e.target.id === 'modal') {
    closeModal();
  }
}

// Rules & Regulations Modal Functionality
const openRulesModalBtn = document.getElementById("rulesReadMoreBtn");
const closeRulesModalBtn = document.getElementById("closeRulesModalBtn");
const rulesModalBox = document.getElementById("schoolRulesModal");

if (openRulesModalBtn && rulesModalBox) {
  openRulesModalBtn.addEventListener("click", () => {
    rulesModalBox.style.display = "block";
  });
}

if (closeRulesModalBtn && rulesModalBox) {
  closeRulesModalBtn.addEventListener("click", () => {
    rulesModalBox.style.display = "none";
  });
}

window.addEventListener("click", (e) => {
  if (e.target === rulesModalBox) {
    rulesModalBox.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("rulesReadMoreBtn");
  const modal = document.getElementById("schoolRulesModal");

  if (btn && modal) {
    // Button click → Modal show
    btn.addEventListener("click", () => {
      modal.style.display = "flex";
      // Uniform tab ko active karo
      document.getElementById("uniform").classList.add("active");
      document.querySelector(".tablink").classList.add("active"); // First tablink as active
    });

    // Close button se band karo
    document.getElementById("closeRulesModalBtn").addEventListener("click", () => {
      modal.style.display = "none";
      // Sabhi tab se active hata do
      document.querySelectorAll(".tabcontent").forEach(tab => tab.classList.remove("active"));
      document.querySelectorAll(".tablink").forEach(link => link.classList.remove("active"));
    });

    // Outside click se band karo
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.querySelectorAll(".tabcontent").forEach(tab => tab.classList.remove("active"));
        document.querySelectorAll(".tablink").forEach(link => link.classList.remove("active"));
      }
    });
  }

  // Tab Switching Functionality
  window.openTab = function (event, tabName) {
    const tablinks = document.querySelectorAll(".tablink");
    const tabcontents = document.querySelectorAll(".tabcontent");

    tabcontents.forEach(tab => tab.classList.remove("active"));
    tablinks.forEach(link => link.classList.remove("active"));

    document.getElementById(tabName).classList.add("active");
    event.currentTarget.classList.add("active");
  };
});

// Js for admission form
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("admissionForm");
  const messageBox = document.getElementById("formMessage");

  const nameInput = document.getElementById("studentName");
  const dobInput = document.getElementById("dob");
  const genderInput = document.getElementById("gender");
  const gradeInput = document.getElementById("grade");
  const parentNameInput = document.getElementById("parentName");
  const phoneInput = document.getElementById("parentPhone");
  const emailInput = document.getElementById("parentEmail");

  const nameError = document.getElementById("nameError");
  const dobError = document.getElementById("dobError");
  const genderError = document.getElementById("genderError");
  const gradeError = document.getElementById("gradeError");
  const parentNameError = document.getElementById("parentNameError");
  const phoneError = document.getElementById("phoneError");
  const emailError = document.getElementById("emailError");

  // Phone Regex
  const phoneRegex = /^[0-9]{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    // Reset errors
    document.querySelectorAll(".error").forEach(error => error.style.display = "none");

    // Validate Fields
    if (!nameInput.value.trim()) {
      nameError.style.display = "block";
      isValid = false;
    }

    if (!dobInput.value) {
      dobError.style.display = "block";
      isValid = false;
    }

    if (genderInput.value === "") {
      genderError.style.display = "block";
      isValid = false;
    }

    if (gradeInput.value === "") {
      gradeError.style.display = "block";
      isValid = false;
    }

    if (!parentNameInput.value.trim()) {
      parentNameError.style.display = "block";
      isValid = false;
    }

    if (phoneInput.value && !phoneRegex.test(phoneInput.value)) {
      phoneError.style.display = "block";
      isValid = false;
    }

    if (emailInput.value && !emailRegex.test(emailInput.value)) {
      emailError.style.display = "block";
      isValid = false;
    }

    if (isValid) {
      // Show loader or disable button
      const formData = new FormData(form);

      fetch(form.getAttribute("action"), {
        method: "POST",
        body: new URLSearchParams(formData),
        headers: {
          Accept: "application/json",
        },
      })
        .then(() => {
          showMessage("success", "✅ Your application has been submitted successfully!");
          form.reset();
        })
        .catch((err) => {
          showMessage("error", "❌ There was an error submitting your form. Please try again.");
        });
    } else {
      showMessage("error", "⚠️ Please fix the highlighted errors before submitting.");
    }
  });

  function showMessage(type, msg) {
    messageBox.className = `message-box ${type}`;
    messageBox.textContent = msg;
    messageBox.style.display = "block";

    // Auto hide after 5 seconds
    setTimeout(() => {
      messageBox.style.display = "none";
    }, 5000);
  }
});

//learn more button on homepage
window.addEventListener("DOMContentLoaded", () => {
  // Back to Top button logic
  const backToTopButton = document.getElementById("backToTop");
  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        backToTopButton.classList.add("show");
      } else {
        backToTopButton.classList.remove("show");
      }
    });

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Animated button click logic
  const animatedBtn = document.querySelector(".animated-button");
  if (animatedBtn) {
    animatedBtn.addEventListener("click", () => {
      window.location.href = "about.html";
    });
  }
});

// Leadership Messages
const leadershipMessages = {
  principal: {
    title: "Message from Principal",
    message: `Welcome to ALMEEN ACADEMY, where excellence meets opportunity. Our commitment to academic excellence, character development, and holistic growth sets us apart.

At Almeen Academy, we believe in nurturing not just academic brilliance but also the character and values that make our students outstanding citizens. Our dedicated faculty works tirelessly to create an environment where every student can discover and develop their unique potential.

We focus on:
• Academic Excellence
• Character Development
• Leadership Skills
• Innovation and Creativity
• Global Citizenship

Join us in this journey of learning, growth, and success.`
  },
  director: {
    title: "Message from Director",
    message: `At Almeen Academy, we believe in creating an environment that nurtures innovation, critical thinking, and leadership skills. Our vision is to shape future leaders who will make a positive impact on society.

Our commitment to excellence is reflected in:
• State-of-the-art facilities
• Experienced faculty
• Comprehensive curriculum
• Focus on practical learning
• Global exposure opportunities

We are dedicated to providing a transformative educational experience that prepares students for the challenges of tomorrow.`
  }
};

// Modal Functions
function openMessage(role) {
  const modal = document.getElementById('messageModal');
  const title = document.getElementById('modalTitle');
  const message = document.getElementById('modalMessage');
  
  title.textContent = leadershipMessages[role].title;
  message.textContent = leadershipMessages[role].message;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMessage() {
  const modal = document.getElementById('messageModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Close modal when clicking outside
document.getElementById('messageModal').addEventListener('click', function(e) {
  if (e.target === this) {
    closeMessage();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeMessage();
  }
});

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
  // Trigger hero section animations if needed (for browsers that don't auto-play CSS animations)
  document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons').forEach(el => {
    el.classList.add('animated');
  });
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
