
    // Function to increment view count
    function incrementViewCount() {
        // Check if 'viewCount' is already in localStorage
        let viewCount = localStorage.getItem('viewCount');
        
        // If it's not in localStorage, initialize it to 0
        if (!viewCount) {
            viewCount = 0;
        }

        // Increment view count
        viewCount++;

        // Save updated view count back to localStorage
        localStorage.setItem('viewCount', viewCount);

        // Update the view count on the page
        document.getElementById('view-count').textContent = viewCount;
    }

    // Call the function when the page loads
    window.onload = incrementViewCount;

