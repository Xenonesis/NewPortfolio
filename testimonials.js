document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
    let currentIndex = 0;
    let autoPlayInterval;

    // Enhanced show slide function with animations
    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            if (i === index) {
                // Add entrance animations
                slide.style.opacity = '0';
                slide.classList.remove('hidden');
                slide.classList.add('animate-fade-in');
                
                // Add sliding effect
                slide.style.transform = 'translateX(0)';
                slide.style.opacity = '1';
                
                // Add testimonial card hover effect
                slide.classList.add('hover:shadow-2xl', 'hover:scale-105', 'transform', 'transition-all', 'duration-500');
            } else {
                slide.classList.add('hidden');
                slide.classList.remove('animate-fade-in');
            }
        });
    };

    // Enhanced navigation with smooth transitions
    const showPrevSlide = () => {
        const prevIndex = currentIndex;
        currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
        
        // Add slide-out animation for current slide
        slides[prevIndex].style.transform = 'translateX(100%)';
        slides[prevIndex].style.opacity = '0';
        
        // Add slide-in animation for new slide
        setTimeout(() => {
            showSlide(currentIndex);
        }, 300);
    };

    const showNextSlide = () => {
        const prevIndex = currentIndex;
        currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
        
        // Add slide-out animation for current slide
        slides[prevIndex].style.transform = 'translateX(-100%)';
        slides[prevIndex].style.opacity = '0';
        
        // Add slide-in animation for new slide
        setTimeout(() => {
            showSlide(currentIndex);
        }, 300);
    };

    // Auto-play with smooth transitions
    const startAutoPlay = () => {
        autoPlayInterval = setInterval(() => {
            showNextSlide();
        }, 5000);
    };

    const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
    };

    // Event listeners with hover effects
    prevButton.addEventListener('click', () => {
        stopAutoPlay();
        showPrevSlide();
        startAutoPlay();
    });

    nextButton.addEventListener('click', () => {
        stopAutoPlay();
        showNextSlide();
        startAutoPlay();
    });

    // Add hover effects to navigation buttons
    [prevButton, nextButton].forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.classList.add('scale-110', 'shadow-lg');
        });
        
        button.addEventListener('mouseleave', () => {
            button.classList.remove('scale-110', 'shadow-lg');
        });
    });

    // Add pause on hover functionality
    const testimonialContainer = document.getElementById('testimonial-carousel');
    testimonialContainer.addEventListener('mouseenter', stopAutoPlay);
    testimonialContainer.addEventListener('mouseleave', startAutoPlay);

    // Initialize the carousel
    showSlide(currentIndex);
    startAutoPlay();
});
