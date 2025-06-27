function showPopup(element) {
    const skillName = element.querySelector('p').textContent;
    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popup-text');

    // Set the popup text to the clicked skill
    popupText.textContent = `You clicked on ${skillName}! This skill has a proficiency level of ${element.querySelector('.progress-bar').style.width}.`;

    // Show the popup
    popup.classList.remove('hidden');
    popup.classList.add('flex');
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.classList.add('hidden');
}