document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
    let currentIndex = 0;
    let autoPlayInterval;

    // Show the specified slide
    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            slide.classList.add('hidden');
            slide.classList.remove('animate-fade-in');
            if (i === index) {
                slide.classList.remove('hidden');
                slide.classList.add('animate-fade-in');
            }
        });
    };

    // Move to the previous slide
    const showPrevSlide = () => {
        currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
        showSlide(currentIndex);
    };

    // Move to the next slide
    const showNextSlide = () => {
        currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
        showSlide(currentIndex);
    };

    // Auto-play slides
    const startAutoPlay = () => {
        autoPlayInterval = setInterval(() => {
            showNextSlide();
        }, 5000); // Change slide every 5 seconds
    };

    // Stop auto-play
    const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
    };

    // Event listeners for navigation buttons
    prevButton.addEventListener('click', () => {
        stopAutoPlay(); // Pause auto-play on interaction
        showPrevSlide();
        startAutoPlay(); // Resume auto-play
    });

    nextButton.addEventListener('click', () => {
        stopAutoPlay(); // Pause auto-play on interaction
        showNextSlide();
        startAutoPlay(); // Resume auto-play
    });

    // Initialize the carousel
    showSlide(currentIndex);
    startAutoPlay(); // Start auto-play on page load
});
