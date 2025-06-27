/**
 * Script to update all blog post HTML files with the new responsive template
 */
const fs = require('fs');
const path = require('path');

// Directory containing blog posts
const blogPostsDir = path.join(__dirname, 'blog_posts');

// Get all HTML files in the blog_posts directory
const blogFiles = fs.readdirSync(blogPostsDir)
    .filter(file => file.endsWith('.html'))
    // Skip files that have already been updated
    .filter(file => !['web_security_fundamentals.html', 'web_dev_roadmap.html', 
                      'web_assembly_wasm_intro.html', 'web_accessibility_basics.html',
                      'understanding_zero_trust_security.html', 'understanding_threat_modeling.html',
                      'understanding_software_supply_chain_security.html',
                      'cybersecurity_basics.html', 'ethical_hacking_intro.html'].includes(file));

console.log(`Found ${blogFiles.length} blog files to update`);

// Process each file
blogFiles.forEach(file => {
    const filePath = path.join(blogPostsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Update the head section
    content = content.replace(
        /<head>[\s\S]*?<\/head>/,
        `<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${getTitle(content)}</title>
    <link rel="stylesheet" href="../blog-style.css">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js" crossorigin="anonymous"></script>
    <script src="../dark-mode.js" defer></script>
    <script src="../blog-script.js" defer></script>
</head>`
    );
    
    // Update the header/navbar
    content = content.replace(
        /<header[\s\S]*?<\/header>/,
        `<!-- Enhanced Navbar -->
    <nav class="navbar bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white fixed top-0 w-full z-50 shadow-lg backdrop-blur-md bg-opacity-90">
        <div class="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
            <a href="../index.html" class="text-2xl font-bold tracking-wide hover:text-yellow-300 transition-all duration-300">
                Aditya Kumar Tiwari
            </a>
            
            <ul class="hidden md:flex space-x-6 text-sm font-medium">
                <li><a href="../index.html" class="nav-link">Home</a></li>
                <li><a href="../blog.html" class="nav-link">Blog</a></li>
                <li><a href="../index.html#about" class="nav-link">About</a></li>
                <li><a href="../index.html#projects" class="nav-link">Projects</a></li>
                <li><a href="../index.html#contact" class="nav-link">Contact</a></li>
            </ul>

            <div class="flex items-center space-x-4">
                <button id="dark-mode-toggle" class="text-xl bg-blue-800 hover:bg-blue-900 text-white px-3 py-2 rounded-full shadow-md transition duration-300">
                    <span id="toggle-icon">🌙</span>
                </button>
                <button id="menu-toggle" class="md:hidden text-2xl focus:outline-none">
                    ☰
                </button>
            </div>
        </div>
        
        <div id="mobile-menu" class="hidden md:hidden bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4">
            <ul class="space-y-4">
                <li><a href="../index.html" class="mobile-link">Home</a></li>
                <li><a href="../blog.html" class="mobile-link">Blog</a></li>
                <li><a href="../index.html#about" class="mobile-link">About</a></li>
                <li><a href="../index.html#projects" class="mobile-link">Projects</a></li>
                <li><a href="../index.html#contact" class="mobile-link">Contact</a></li>
            </ul>
        </div>
    </nav>`
    );
    
    // Update the main container and article header
    content = content.replace(
        /<main class="container[\s\S]*?<p class="text-gray-600 mb-6">(.*?)(?:<\/p>|\n)/,
        (match, authorDate) => {
            const [author, date] = authorDate.split('|').map(s => s.trim());
            return `<main class="article-container">
        <a href="../blog.html" class="back-to-blog">Back to Blog</a>
        
        <article>
            <div class="article-header">
                <h1 class="article-title">${getTitle(content)}</h1>
                <div class="article-meta">
                    <span>${author}</span>
                    <span>•</span>
                    <span>${date}</span>
                    <span>•</span>
                    <span>8 min read</span>
                </div>
            </div>`;
        }
    );
    
    // Update the prose class to article-content
    content = content.replace(
        /<div class="prose max-w-none">/,
        '<div class="article-content">'
    );
    
    // Update all heading styles
    content = content.replace(
        /<h2 class="text-2xl font-semibold mt-6 mb-3 text-blue-600">(.*?)<\/h2>/g,
        '<h2>$1</h2>'
    );
    
    content = content.replace(
        /<h3 class="text-xl font-medium mt-4 mb-2 text-blue-500">(.*?)<\/h3>/g,
        '<h3>$1</h3>'
    );
    
    // Update the footer
    content = content.replace(
        /<footer[\s\S]*?<\/footer>/,
        `<!-- Enhanced Footer -->
    <footer class="footer">
        <div class="footer-content">
            <div class="social-links">
                <a href="https://www.linkedin.com/in/itisaddy/" target="_blank" class="social-link" aria-label="LinkedIn">
                    <i class="fab fa-linkedin-in"></i>
                </a>
                <a href="https://www.instagram.com/i__aditya7" target="_blank" class="social-link" aria-label="Instagram">
                    <i class="fab fa-instagram"></i>
                </a>
                <a href="https://github.com/Xenonesis" target="_blank" class="social-link" aria-label="GitHub">
                    <i class="fab fa-github"></i>
                </a>
            </div>
            <div class="copyright">
                &copy; <span id="currentYear"></span> Aditya Kumar Tiwari. All rights reserved.
            </div>
        </div>
    </footer>

    <!-- Script functionality moved to blog-script.js -->`
    );
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
});

console.log('All blog files have been updated!');

// Helper function to extract title from HTML content
function getTitle(content) {
    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    if (titleMatch && titleMatch[1]) {
        return titleMatch[1];
    }
    
    // Fallback to h1 if title tag not found
    const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/);
    if (h1Match && h1Match[1]) {
        return h1Match[1];
    }
    
    return 'Blog Post';
}