// Leadership Cards Read More/Read Less Functionality
function toggleMessage(button) {
  const messageContainer = button.parentElement;
  const messagePreview = messageContainer.querySelector('.message-preview');
  const messageFull = messageContainer.querySelector('.message-full');
  
  if (messageFull.style.display === 'none') {
    // Show full message
    messagePreview.style.display = 'none';
    messageFull.style.display = 'block';
    button.textContent = 'Read less';
    button.style.background = 'linear-gradient(90deg, #ff6b6b 0%, #e63946 100%)';
  } else {
    // Hide full message
    messagePreview.style.display = 'block';
    messageFull.style.display = 'none';
    button.textContent = 'Read more';
    button.style.background = 'linear-gradient(90deg, #e63946 0%, #ff6b6b 100%)';
  }
}

// Initialize all leadership cards on page load
document.addEventListener('DOMContentLoaded', function() {
  // Ensure all message previews are visible and full messages are hidden initially
  const messagePreviews = document.querySelectorAll('.message-preview');
  const messageFulls = document.querySelectorAll('.message-full');
  const readMoreBtns = document.querySelectorAll('.read-more-btn');
  
  messagePreviews.forEach(preview => {
    preview.style.display = 'block';
  });
  
  messageFulls.forEach(full => {
    full.style.display = 'none';
  });
  
  readMoreBtns.forEach(btn => {
    btn.textContent = 'Read more';
  });
});