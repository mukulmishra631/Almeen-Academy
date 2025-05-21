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

//   // Rules & Regulations Modal Functionality
// const openRulesModalBtn = document.getElementById("rulesReadMoreBtn");
// const closeRulesModalBtn = document.getElementById("closeRulesModalBtn");
// const rulesModalBox = document.getElementById("schoolRulesModal");

// if (openRulesModalBtn && rulesModalBox) {
//   openRulesModalBtn.addEventListener("click", () => {
//     rulesModalBox.style.display = "block";
//   });
// }

// if (closeRulesModalBtn && rulesModalBox) {
//   closeRulesModalBtn.addEventListener("click", () => {
//     rulesModalBox.style.display = "none";
//   });
// }

// window.addEventListener("click", (e) => {
//   if (e.target === rulesModalBox) {
//     rulesModalBox.style.display = "none";
//   }
// });

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