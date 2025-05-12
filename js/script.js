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

// Stats section
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

// Scroll trigger
let hasAnimated = false;

function handleScroll() {
  const section = document.getElementById('statsSection');
  const sectionTop = section.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (sectionTop < windowHeight && !hasAnimated) {
    hasAnimated = true;
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const suffix = counter.getAttribute('data-suffix') || "";
      animateCounter(counter, target, suffix);
    });
  }
}

window.addEventListener('scroll', handleScroll);
