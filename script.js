// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const toggleIcon = document.getElementById('toggle-icon');
const htmlElement = document.documentElement;

// Check if the user has a saved theme preference in localStorage
if (localStorage.getItem('theme') === 'dark') {
    htmlElement.classList.add('dark');
    toggleIcon.textContent = '☀️';
} else {
    toggleIcon.textContent = '🌙';
}

// Toggle dark mode on button click
darkModeToggle.addEventListener('click', () => {
    if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        toggleIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light'); // Save preference
    } else {
        htmlElement.classList.add('dark');
        toggleIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark'); // Save preference
    }
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    menuToggle.textContent = mobileMenu.classList.contains('hidden') ? '☰' : '✖';
});
