// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const toggleIcon = document.getElementById('toggle-icon');
const htmlElement = document.documentElement;

// Function to update footer styles
function updateFooter() {
    const footer = document.querySelector('footer');
    const isDark = htmlElement.classList.contains('dark');
    
    if (footer) {
        if (isDark) {
            footer.setAttribute('style', 'background-color: #1e1e1e !important; color: #e4e4e4 !important;');
        } else {
            footer.setAttribute('style', 'background-color: #fefce8 !important; color: #374151 !important;');
        }
    }
}

// Check if the user has a saved theme preference in localStorage
if (localStorage.getItem('theme') === 'dark') {
    htmlElement.classList.add('dark');
    if (toggleIcon) toggleIcon.textContent = '☀️';
} else {
    if (toggleIcon) toggleIcon.textContent = '🌙';
}

// Update footer on initial load
updateFooter();

// Toggle dark mode on button click
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            if (toggleIcon) toggleIcon.textContent = '🌙';
            localStorage.setItem('theme', 'light'); // Save preference
        } else {
            htmlElement.classList.add('dark');
            if (toggleIcon) toggleIcon.textContent = '☀️';
            localStorage.setItem('theme', 'dark'); // Save preference
        }
        updateFooter(); // Update footer when toggling
    });
}

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    menuToggle.textContent = mobileMenu.classList.contains('hidden') ? '☰' : '✖';
});
