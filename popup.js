let popupInterval;  
let closeAlertTimeout;
let countdownInterval;
let countdownValue = 5;
let popupManuallyClosed = false; // Tracks if the popup was manually closed

// Function to get a cookie value by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// Function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Set expiry in days
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

// Function to check if the popup has already been shown to the user
function hasPopupBeenShown() {
    return getCookie('popupShown') === 'true';
}

// Function to show the popup
function showPopup() {
    if (popupManuallyClosed || hasPopupBeenShown()) return; // Prevent showing popup if it was manually closed or already shown

    const popup = document.getElementById('popup');
    const countdownElement = document.getElementById('countdown');

    // Reset countdown value
    countdownValue = 5;
    countdownElement.textContent = countdownValue;

    // Display the popup
    popup.classList.remove('hidden');
    popup.classList.add('flex');
    popup.classList.add('animate-fade-in');
    popup.classList.remove('animate-fade-out');

    // Start countdown timer
    countdownInterval = setInterval(() => {
        countdownValue--;
        countdownElement.textContent = countdownValue;
        if (countdownValue <= 0) {
            closePopup(true);
        }
    }, 1000);

    // Set a timer to auto-close the popup after 5 seconds
    closeAlertTimeout = setTimeout(() => {
        closePopup(true);
    }, 5000);

    // Mark the popup as shown and store it in cookies
    setCookie('popupShown', 'true', 7); // Store for 7 days
}

// Function to close the popup
function closePopup(auto) {
    const popup = document.getElementById('popup');
    popup.classList.add('animate-fade-out');
    popup.classList.remove('animate-fade-in');

    // Clear countdown and alert timers
    clearTimeout(closeAlertTimeout);
    clearInterval(countdownInterval);

    setTimeout(() => {
        popup.classList.add('hidden');
        popup.classList.remove('flex');
    }, 500); // Allow fade-out animation to complete

    if (!auto) {
        popupManuallyClosed = true; // Prevent popup from showing again until refresh
    }
}

// Function to start the popup loop
function startPopupLoop() {
    if (!hasPopupBeenShown()) {
        showPopup(); // Show the popup immediately on page load
    }
    popupInterval = setInterval(() => {
        if (!popupManuallyClosed && !hasPopupBeenShown()) {
            showPopup(); // Show the popup periodically if not manually closed
        }
    }, 175000); // Show popup every 175 seconds
}

// Start the popup loop when the page loads
window.onload = startPopupLoop;
