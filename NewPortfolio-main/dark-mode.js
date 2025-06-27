document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const toggleIcon = document.getElementById('toggle-icon');

    // Function to apply the correct theme
    const applyTheme = () => {
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark');
            if (toggleIcon) {
                toggleIcon.textContent = '☀️';
            }
        } else {
            document.documentElement.classList.remove('dark');
            if (toggleIcon) {
                toggleIcon.textContent = '🌙';
            }
        }
    };

    // Apply theme on initial load
    applyTheme();

    // Event listener for the dark mode toggle button
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            
            // Save the user's preference to local storage
            if (document.documentElement.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
            
            // Update the toggle icon
            applyTheme();
        });
    }
});
