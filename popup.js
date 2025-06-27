let popupInterval;
let closeAlertTimeout;
let countdownInterval;
let countdownValue = 5;
let popupManuallyClosed = false; // Tracks if the popup was manually closed

// Function to check if the user is new or returning
function checkUserStatus() {
    const userStatus = localStorage.getItem('userStatus');

    let greetingMessage = '';
    let currentHour = new Date().getHours();

    if (currentHour < 12) {
        greetingMessage = 'Good morning! ☀️'; // Morning emoji
    } else if (currentHour < 18) {
        greetingMessage = 'Good afternoon! 🌞'; // Afternoon emoji
    } else {
        greetingMessage = 'Good evening! 🌙'; // Evening emoji
    }

    if (!userStatus) {
        // New user: Show welcome message and set status
        localStorage.setItem('userStatus', 'existingUser');
        return `${greetingMessage} Welcome! 👋`;
    } else {
        // Returning user: Show a different message
        return `${greetingMessage} Welcome back! 🙌`;
    }
}

// Function to show the popup
function showPopup() {
    if (popupManuallyClosed) return; // Prevent showing popup if it was manually closed

    const popup = document.getElementById('popup');
    const countdownElement = document.getElementById('countdown');
    const welcomeMessageElement = document.getElementById('welcomeMessage');

    // Set welcome message based on user status
    welcomeMessageElement.textContent = checkUserStatus();

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
    showPopup(); // Show the popup immediately on page load
    popupInterval = setInterval(() => {
        if (!popupManuallyClosed) {
            showPopup(); // Show the popup periodically if not manually closed
        }
    }, 175000); // Show popup every 175 seconds
}

// Start the popup loop when the page loads
window.onload = startPopupLoop;
