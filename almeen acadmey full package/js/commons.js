function toggleMenu() {
  const navLinks = document.getElementById("nav-links");
  if (navLinks) {
    navLinks.classList.toggle("active");
  }
}

// Close menu when clicking outside
document.addEventListener('click', function(e) {
  const navLinks = document.getElementById("nav-links");
  const hamburger = document.querySelector('.hamburger');

  if (navLinks && hamburger && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    navLinks.classList.remove("active");
  }
});

// // Dark Mode Toggle
// const darkModeToggle = document.getElementById("darkModeToggle");

// if (darkModeToggle) {
//   darkModeToggle.addEventListener("click", () => {
//     document.body.classList.toggle("dark-mode");
    
//     // Optional: Change icon/text
//     darkModeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
//   });
// }