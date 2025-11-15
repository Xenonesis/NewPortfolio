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

if (menuToggle && mobileMenu) {
    menuToggle.setAttribute('aria-controls', 'mobile-menu');
    menuToggle.setAttribute('aria-expanded', 'false');

    // Function to close mobile menu
    const closeMobileMenu = () => {
        mobileMenu.classList.add('hidden', 'opacity-0', 'invisible', 'pointer-events-none');
        mobileMenu.classList.remove('opacity-100', 'visible', 'pointer-events-auto', 'animate-slide-in');
        menuToggle.textContent = '☰';
        menuToggle.setAttribute('aria-expanded', 'false');
    };

    menuToggle.addEventListener('click', () => {
        const willOpen = mobileMenu.classList.contains('hidden');

        // Toggle display
        mobileMenu.classList.toggle('hidden');

        if (willOpen) {
            // Ensure it becomes visible and animated when opening
            mobileMenu.classList.remove('opacity-0', 'invisible', 'pointer-events-none');
            mobileMenu.classList.add('opacity-100', 'visible', 'pointer-events-auto', 'animate-slide-in');
            menuToggle.textContent = '✖';
            menuToggle.setAttribute('aria-expanded', 'true');
        } else {
            // Hide it fully and reset animation classes when closing
            closeMobileMenu();
        }
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!menuToggle.contains(event.target) && !mobileMenu.contains(event.target) && !mobileMenu.classList.contains('hidden')) {
            closeMobileMenu();
        }
    });
}
