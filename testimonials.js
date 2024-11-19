document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.testimonial-slide');
    let currentIndex = 0;

    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            slide.classList.add('hidden');
            if (i === index) {
                slide.classList.remove('hidden');
            }
        });
    };

    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
        showSlide(currentIndex);
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
        showSlide(currentIndex);
    });

    // Initialize the carousel
    showSlide(currentIndex);
});
