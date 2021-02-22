const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navLinks = document.getElementsByClassName('nav-links')[0];

$(document).ready(function() {
    $('#summernote').summernote();
  });

toggleButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

navLinks.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});