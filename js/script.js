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
    1: `Dear Parents and Students,<br>Welcome to ALMEEN ACADEMY Sr. Sec. School... <br><br><b>- Ganesh Pandey</b>`,
    2: `This is the second principal message. Replace with real content.`,
    3: `This is the third principal message. Replace with real content.`,
  };

//   const messages = {
//   1: `
// Dear Parents and Students,<br>
// Welcome to ALMEEN ACADEMY Sr. Sec. School, Pokharbhinda, where every day is an opportunity for growth, learning, and excellence. As the principal of this esteemed institution, I am delighted to extend my warmest greetings to each one of you.<br><br>
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Our school is a place where students are encouraged to explore their passions, develop their talents, and achieve their full potential. We are committed to provide a nurturing and challenging environment that promotes academic excellence, character development and lifelong learning.<br><br>
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We believe in the power of education to transform lives. Our dedicated faculty and staff work tirelessly to create a supportive and inclusive community where every student feels valued and inspired. We offer a diverse range of programs and extracurricular activities designed to foster creativity, critical thinking, and collaboration.<br><br>
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Parents, your involvement and partnership are vital to our success. We encourage you to stay engaged in your child's education, participate in school events, and communicate with us regularly. Together, we ensure that our students receive the best possible educational experience.<br><br>
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Student, you are the heart of our school. I challenge you to embrace every opportunity, overcome obstacles with resilience, and strive excellence in all your endeavours. Remember that your education is a journey, and we are here to support you every step of the way.<br><br>
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;As we embark on this academic year, let us work together to create a vibrant and dynamic learning environment where everyone can thrive to look forward to witnessing the achievements and growth of our students and celebrating our collective successes.<br><br>
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The words of Swami Vivekananda "Arise! Awake! And stop not till the goal is reached" act as our motto and watchword that will always inspire our children throughout their lives.<br><br>
// Thank you for being a part of the ALMEEN family. Let's make this year a remarkable one!<br><br>
// <b>- Ganesh Pandey</b><br>
// <b>(Principal)</b>
//   `
// };


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