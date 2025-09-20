document.addEventListener('DOMContentLoaded', () => {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    // Enhanced entrance animations for testimonial cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Intersection Observer for scroll-based animations
    const testimonialObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delays
                setTimeout(() => {
                    entry.target.classList.add('animate-fade-in');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 200);
            }
        });
    }, observerOptions);

    // Apply observer to all testimonial cards
    testimonialCards.forEach((card, index) => {
        // Set initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.9)';
        
        // Add enhanced hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });

        // Add pulse effect to quote icons
        const quoteIcon = card.querySelector('.fa-quote-left');
        if (quoteIcon) {
            setInterval(() => {
                quoteIcon.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    quoteIcon.style.transform = 'scale(1)';
                }, 200);
            }, 3000 + (index * 1000)); // Staggered pulse animation
        }

        // Add shimmer effect to stars
        const stars = card.querySelectorAll('.fa-star');
        stars.forEach((star, starIndex) => {
            setTimeout(() => {
                star.style.color = '#fbbf24';
                star.style.textShadow = '0 0 10px rgba(251, 191, 36, 0.5)';
            }, (starIndex * 100) + (index * 500));
        });

        // Observe the card
        testimonialObserver.observe(card);
    });

    // Add floating animation to testimonial cards
    testimonialCards.forEach((card, index) => {
        // Create subtle floating effect
        setInterval(() => {
            card.style.transform += ' translateY(-2px)';
            setTimeout(() => {
                card.style.transform = card.style.transform.replace(' translateY(-2px)', '');
            }, 2000);
        }, 4000 + (index * 1000));
    });

    // Add click to expand functionality
    testimonialCards.forEach((card) => {
        card.addEventListener('click', () => {
            // Toggle expanded state
            if (card.classList.contains('expanded')) {
                card.classList.remove('expanded');
                card.style.transform = 'scale(1)';
                card.style.zIndex = '1';
            } else {
                // Remove expanded from other cards
                testimonialCards.forEach(otherCard => {
                    otherCard.classList.remove('expanded');
                    otherCard.style.transform = 'scale(1)';
                    otherCard.style.zIndex = '1';
                });
                
                // Expand this card
                card.classList.add('expanded');
                card.style.transform = 'scale(1.05)';
                card.style.zIndex = '10';
            }
        });
    });
});
