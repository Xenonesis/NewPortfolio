// cookie.js

// Set a cookie with user data
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Get the value of a cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Function to track user interactions (project clicks)
function trackUserInteraction(project) {
    let viewedProjects = getCookie("viewedProjects");
    if (viewedProjects) {
        viewedProjects = JSON.parse(viewedProjects);
    } else {
        viewedProjects = [];
    }
    // Add the clicked project to the viewed projects array
    viewedProjects.push(project);
    setCookie("viewedProjects", JSON.stringify(viewedProjects), 7); // Store for 7 days
}

// Function to recommend projects based on user behavior
function getRecommendations() {
    const viewedProjects = getCookie("viewedProjects");
    if (viewedProjects) {
        const viewedProjectsArr = JSON.parse(viewedProjects);
        const recommendations = getRecommendedProjects(viewedProjectsArr);
        return recommendations;
    } else {
        return [];
    }
}

// Sample function to provide recommendations based on viewed projects
function getRecommendedProjects(viewedProjects) {
    const allProjects = [
        { id: 1, name: "Flappy", category: "Game Development" },
        { id: 2, name: "Movie Website (Cinesphere)", category: "Web Development" },
        { id: 3, name: "Innova", category: "E-commerce" },
        { id: 4, name: "SEO Optimized Website", category: "Web Development" },
        { id: 5, name: "MovieVerse Explorer", category: "Movie API" },
        { id: 6, name: "Animate Responsive Tales", category: "Animation" },
        { id: 7, name: "PropDekho", category: "Real Estate" },
        { id: 8, name: "Real Estate Chatbot", category: "Chatbot" }
    ];

    // Recommend projects based on similar categories
    let recommendedProjects = [];
    viewedProjects.forEach((viewedProject) => {
        const similarProjects = allProjects.filter(
            (project) => project.category === viewedProject.category
        );
        recommendedProjects = [...recommendedProjects, ...similarProjects];
    });

    // Remove duplicates by project ID
    recommendedProjects = [...new Set(recommendedProjects.map(a => a.id))].map(id => recommendedProjects.find(a => a.id === id));

    return recommendedProjects;
}

// Event listener to track project clicks
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        const project = {
            name: this.querySelector('h3').textContent,
            category: this.dataset.category
        };
        trackUserInteraction(project);
    });
});
