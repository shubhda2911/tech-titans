const chatBtn = document.getElementById('chatbot-button');
const chatPopup = document.getElementById('chatbot-popup');
const closeBtn = document.getElementById('close-chat');

chatBtn.addEventListener('click', () => {
  chatPopup.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  chatPopup.style.display = 'none';
});
