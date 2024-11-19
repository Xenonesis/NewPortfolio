let popupInterval;
let closeAlertTimeout;
let countdownInterval;
let countdownValue = 5;
let autoClosed = true; // To track if the popup was auto-closed

// Function to show the popup
function showPopup() {
    const popup = document.getElementById('popup');
    const countdownElement = document.getElementById('countdown');

    // Reset countdown value
    countdownValue = 5;
    countdownElement.textContent = countdownValue;
    autoClosed = true;

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

    // Set a timer to close the popup after 5 seconds automatically
    closeAlertTimeout = setTimeout(() => {
        if (autoClosed) alert('Popup closed automatically!');
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

    // Alert only if the popup was closed automatically
    if (!auto) {
        autoClosed = false;
    }
}

// Loop to show the popup every 60 seconds
function startPopupLoop() {
    showPopup(); // Show the popup immediately on page load
    popupInterval = setInterval(showPopup, 60000); // Show popup every 60 seconds
}

// Start the popup loop when the page loads
window.onload = startPopupLoop;
