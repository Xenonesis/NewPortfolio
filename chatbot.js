document.addEventListener('DOMContentLoaded', () => {
    const botToggle = document.getElementById('bot-toggle');
    const chatbot = document.getElementById('chatbot');
    const botClose = document.getElementById('bot-close');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const chatScrollContainer = chatMessages?.parentElement; // Parent div for scrolling
    const sendMessageButton = document.getElementById('send-message');
    const pdfUpload = document.getElementById('upload-pdf'); // May be null if commented out
    const suggestedPromptsContainer = document.createElement('div');

    // Guard against missing elements
    if (!botToggle || !chatbot || !botClose || !chatInput || !chatMessages || !sendMessageButton) {
        console.warn('Chatbot: Some required elements are missing from the DOM');
        return;
    }

    // Add ARIA roles for accessibility
    chatbot.setAttribute('role', 'dialog');
    chatbot.setAttribute('aria-modal', 'true');
    chatbot.setAttribute('aria-label', 'Chatbot window');
    chatMessages.setAttribute('role', 'log');
    chatMessages.setAttribute('aria-live', 'polite');
    chatInput.setAttribute('aria-label', 'Type your message');
    sendMessageButton.setAttribute('aria-label', 'Send message');
    botClose.setAttribute('aria-label', 'Close chatbot');

    // Commented out - PDF quick action buttons
    // suggestedPromptsContainer.id = "suggested-prompts";
    // suggestedPromptsContainer.className = "p-2 border-t border-gray-200 bg-gray-50 flex gap-2 flex-wrap overflow-x-auto";
    // chatbot.appendChild(suggestedPromptsContainer);

    // Add smooth open/close animation
    chatbot.style.transition = 'transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s cubic-bezier(0.4,0,0.2,1)';
    chatbot.style.transform = chatbot.classList.contains('hidden') ? 'translateY(100%)' : 'translateY(0)';
    chatbot.style.opacity = chatbot.classList.contains('hidden') ? '0' : '1';

    // Track if welcome message has been shown this session
    let welcomeMessageShown = false;

    let responses = JSON.parse(localStorage.getItem('botResponses')) || {
        "hello": "Hi there! How can I assist you today?",
        "help": "Sure, let me know what you need help with.",
        "default": "I'm not sure about that. Can you provide more details?",
        hy: 'Hanji😁',
        hyy: 'Hanji😁',
        hey: 'Hey there 🙌 How’s it going?',
        greetings: 'Greetings 🎉 What can I do for you?',
        hellothere: 'Hi 😊 How are you doing today?',
        hithere: 'Hello 👋 What brings you here?',
        heythere: 'Hey 🤗 How can I help you?',
        greetingsfriend: 'Hello, friend 🌟 What’s new with you?',
        howto: 'Here’s a guide on how to do that: 📚 Let me know if you need more details!',
        tips: 'Here are some tips for you: 💡 Hope you find them helpful!',
        guide: 'Check out this comprehensive guide: 📖 It should answer all your questions.',
        website: 'You can find more information on our website: 🌐 Here’s the link: https://example.com',
        contactus: 'Feel free to contact us for more information: ✉️ We’re here to help',
        buy: 'You can purchase this product here: 🛒 Follow the link for more details.',
        order: 'To place an order, follow these steps: 📝 Let me know if you need assistance.',
        digitalmarketing: 'Here’s information on digital marketing: 🌐 It includes SEO, PPC, and more.',
        onlinemarketing: 'Online marketing is a broad field: 📊 It covers social media, email marketing, and more.',
        internetmarketing: 'Internet marketing involves various strategies: 📈 From SEO to content marketing.',
        competitoranalysis: 'Analyzing competitors can help you find new keywords: 🔍 See what they’re ranking for and adjust your strategy.',
        competitorkeywords: 'Check out the keywords your competitors are using: 📊 This can give you new ideas for your own campaign.',
        productfeatures: 'Here are some features of our product: 🛠️ Let me know if you have any questions.',
        servicebenefits: 'Our service offers several benefits: 🌟 Here are a few key ones.',
        productattributes: 'Here are some attributes of our product: 📊 From size to color, we’ve got you covered.',
        serviceattributes: 'Our service has several key attributes: 🌐 Here’s what you need to know.',
        howtogroomadogathome: 'Here’s a guide on how to groom a dog at home: 🐶 Step-by-step instructions inside.',
        bestdogroomingproducts: 'Here are the best dog grooming products: 🛒 Check out our recommendations.',
        doggroomingtipsforbeginners: 'Here are some dog grooming tips for beginners: 🐾 Start with these basics.',
        doggroomingtechniques: 'Here are some advanced dog grooming techniques: 🐶 For the pros and those looking to improve.',
        keywordperformance: 'Keep an eye on your keyword performance: 📊 Adjust your strategy based on the data.',
        searchtrends: 'Stay updated with the latest search trends: 🌐 This will help you refine your keyword list.',
        keywordadjustment: 'Adjust your keyword strategy regularly: 🔧 This ensures you stay competitive and relevant.',
        happy: 'That’s great 😄 What’s making you happy?',
        sad: 'I’m sorry to hear that. 😔 If you’d like to talk, I’m here for you.',
        skills: 'Here are some of my skills: 💻 Laravel Development, PHP, Web Development, Cybersecurity, Ethical Hacking, Data Analysis.',
        projects: 'Check out my projects on GitHub: 👨‍💻 https://github.com/Xenonesis.',
        contact: 'Feel free to email me at: ✉️ ffjawed@gmail.com.',
        thank: 'You’re welcome 😊 I’m glad I could help.',
        thanks: 'No problem Happy to assist 🙌',
        help: 'I’m here to help 🤔 What do you need assistance with?',
        bye: 'Goodbye 👋 Have a wonderful day!',
        goodbye: 'See you later 🌟',
        weather: 'I can’t check the weather, but you can look it up online ☀️🌧️',
        joke: 'Why don’t scientists trust atoms? Because they make up everything 😄',
        love: 'Love is a beautiful thing 💖 What about it?',
        work: 'I worked as a Laravel Developer at Prarang from September to October 2024 💼 I loved building web applications and working with PHP frameworks!',
        favorite: 'I love chatting with you 🌈 What’s your favorite topic?',
        movie: 'I enjoy movies 🎬 What’s your favorite one?',
        music: 'Music is great 🎵 What’s your favorite song or artist?',

        cybersecurity: 'I am passionate about cybersecurity 🔒 I have experience with vulnerability assessments, security measures, and incident response.',
        universitylife: 'I completed my BCA in Cybersecurity from Sushant University 🎓 It was a great experience and I learned a lot during my time there.',
        techinterests: 'I’m really into tech and innovation 🚀 What about you? Do you have any favorite tech topics?',
        communityservice: 'I believe in giving back to the community 🤝 I’m involved in several community service activities.',
        favoriteclass: 'My favorite class is probably computer science 📚 I find it really interesting and challenging.',
        projectideas: 'I have several project ideas in mind. From web development to AI, I am excited to explore different areas.',
        careeradvice: 'If you need career advice, I am here to help! Just let me know what you are looking for.',
        laravel: 'I love working with Laravel! It is an amazing PHP framework that makes web development so much easier and more enjoyable.',
        php: 'PHP is a powerful server-side language. I used it daily during my time at Prarang (Sep-Oct 2024) for building robust web applications.',
        prarang: 'I worked at Prarang as a Laravel Developer from September to October 2024. It was a great company where I got to work on exciting web development projects!',
        job: 'I worked as a Laravel Developer at Prarang from September to October 2024. I loved building web applications and working with PHP frameworks!',
        company: 'Prarang was an amazing company to work for during my time there (Sep-Oct 2024)! I was grateful to be part of such an innovative team.',
        name: 'My Name is Aditya.',
        character: 'He is very good boy.',

        //  Keywords from the PDF
        cybersecurity: 'I am passionate about cybersecurity 🔒 I have experience with vulnerability assessments, security measures, and incident response.',
        vulnerabilityassessments: 'I can help you understand your vulnerabilities 🔍 I can conduct assessments and recommend security improvements.',
        securitymeasures: 'I know about implementing security measures to protect your systems 🛡️ I can help you choose the right ones.',
        networktraffic: 'I can analyze network traffic to identify potential threats 🕵️‍♀️ I can also help you monitor your network for suspicious activity.',
        incidentresponse: 'I can assist in incident response to minimize damage 🚨 I can help you contain, investigate, and recover from security incidents.',
        remotework: 'I am comfortable working remotely 💻 I can work effectively from anywhere with a reliable internet connection.',
        internship: 'I recently completed a cybersecurity internship 💼 I gained valuable experience in practical security concepts.',
        universitysportsleader: 'I was a university sports leader 🏆 I have experience in organizing events and motivating others.',
        nssleader: 'I am an NSS leader 🤝 I am committed to community service and social responsibility.',
        googletechnicalsupport: 'I have learned technical support fundamentals from Google 📚 I have a strong understanding of troubleshooting and documentation.',
        ciscotraining: 'I have completed Cisco training courses 🎓 I have knowledge of network security, ethical hacking, and endpoint security.',
        osforensics: 'I am certified in OSForensics 💻 I have experience with digital investigations and forensic analysis.',
        promptengineering: 'I am learning about prompt engineering for generative AI 🧠 I am interested in the intersection of AI and language.',
        cybersecurityforeveryone: 'I have a certificate in cybersecurity for everyone 🔐 I am interested in educating others about cybersecurity best practices.',
        excel: 'I am proficient in Excel 📊 I can use it for data analysis, visualization, and automation.',
        datamapping: 'I understand how to map data effectively 🗺️ I can help you organize and structure your data.',
        datavisualization: 'I can visualize data to make it easier to understand 📈 I can create charts, graphs, and dashboards.',
        conditionalformatting: 'I am skilled in using conditional formatting in Excel 🎨 I can highlight important information and make spreadsheets more readable.',
        linux: 'I have experience working with Linux 🐧 I am familiar with its command line interface and common tools.',
        github: 'I use GitHub to manage my projects 💻 I am comfortable with version control and collaborating with others.',
        flappybird: 'I built a Flappy Bird game using HTML, CSS, and JavaScript 🎮 You can find it on GitHub: https://github.com/Xenonesis/NS-Flappy-Bird.git',
        moviewebsite: 'I developed a movie website called Cinesphere 🎬 You can check it out here: https://thecinesphere.netlify.app/',
        ecommercewebsite: 'I built a modern e-commerce website called Innova 🛒 You can find it on GitHub: https://github.com/Xenonesis/Innova.git',
        html: 'I am proficient in HTML 🌐 I can create web pages and structure content.',
        css: 'I have experience with CSS 🎨 I can style web pages and create visually appealing designs.',
        javascript: 'I am learning JavaScript 💻 I can use it to add interactivity and functionality to web pages.',
        python: 'I am proficient in Python 🐍 I can use it for data analysis, web development, and automation.',
        sql: 'I have experience working with SQL databases 🗃️ I can query and manage data.',
        firebase: 'I am familiar with Firebase 🔥 I can use it for real-time databases, authentication, and more.',
        vmware: 'I have experience using VMware 💻 I can create and manage virtual machines.',
        apachecloudstack: 'I am familiar with Apache CloudStack ☁️ I can use it for cloud computing and infrastructure management.',
        databasemanagement: 'I have experience with database management systems 🗃️ I can design, implement, and manage databases.',
        datastructures: 'I understand data structures 💻 I can use them to efficiently organize and store data.',
        git: 'I am familiar with Git 💻 I can use it for version control and collaboration.',
        golang: 'I am learning Go 💻 I am interested in its efficiency and concurrency.',
        mssqlserver: 'I am proficient in MS SQL Server 💻 I can use it for database management.',
        msoffice: 'I am proficient in MS Office 💻 I can use it for productivity and collaboration.',
        microsoftvisualstudio: 'I have experience using Microsoft Visual Studio 💻 I can use it for software development.',
        mongodb: 'I am familiar with MongoDB 💻 I can use it for NoSQL database management.',
        artificialintelligence: 'I am interested in artificial intelligence 🧠 I am learning about its applications and ethical considerations.',
        networksecurity: 'I have knowledge of network security 🔒 I can help you protect your network from attacks.',
        additionaldetails: 'I have experience in volunteering and leadership roles 🤝 I am a motivated and dedicated individual.',
        nss: 'I am a member of the NSS 🤝 I am committed to community service and social responsibility.',
        blaze: 'I participated in Blaze VII and Blaze VIII 🏆 I have experience in event organization and leadership.',
        marchpast: 'I led the march past in Blaze VII and Blaze VIII 🏆 I have experience in leading teams and coordinating activities.',
        goldmedal: 'I received a gold medal for the march past in Blaze VII and Blaze VIII 🏆 I am a dedicated and hard-working individual.',
        nssleader: 'I am an NSS leader 🤝 I am committed to community service and social responsibility.',
    };

    let analyticsData = JSON.parse(localStorage.getItem('botAnalytics')) || {
        interactions: 0,
        feedback: [],
    };

    let userPreferences = JSON.parse(localStorage.getItem('userPreferences')) || {
        name: "User",
        favoriteTopics: [],
    };

    let predefinedPrompts = JSON.parse(localStorage.getItem('botPrompts')) || [
        "What's in the PDF?",
        "Summarize the PDF content.",
        "What are the key points?",
        "Help me with [topic].",
    ];

    let pdfContent = ""; // Stores extracted PDF content
    let pendingQuestion = null; // To store the unanswered question

    loadChatFromLocalStorage();
    loadUserPreferences();
    // displaySuggestedPrompts(); // Commented out - PDF quick action buttons

    botToggle.addEventListener('click', () => {
        const isHidden = chatbot.classList.toggle('hidden');
        if (!isHidden) {
            chatbot.style.transform = 'translateY(0)';
            chatbot.style.opacity = '1';
            displayWelcomeMessage();
            setTimeout(() => chatInput.focus(), 200);
        } else {
            chatbot.style.transform = 'translateY(100%)';
            chatbot.style.opacity = '0';
        }
    });

    botClose.addEventListener('click', () => {
        chatbot.classList.add('hidden');
        chatbot.style.transform = 'translateY(100%)';
        chatbot.style.opacity = '0';
    });

    sendMessageButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    // Keyboard accessibility: ESC to close, Tab trap
    chatbot.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            chatbot.classList.add('hidden');
            chatbot.style.transform = 'translateY(100%)';
            chatbot.style.opacity = '0';
            botToggle.focus();
        }
        // Trap focus inside chatbot
        if (e.key === 'Tab') {
            const focusable = chatbot.querySelectorAll('button, [tabindex]:not([tabindex="-1"]), input, select, textarea, a[href]');
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
    });

    // Only add PDF upload listener if the element exists (it may be commented out in HTML)
    if (pdfUpload) {
        pdfUpload.addEventListener('change', async (event) => {
            const file = event.target.files[0];
            if (file && file.type === "application/pdf") {
                appendMessage('Bot', 'Processing PDF, please wait...', 'bg-yellow-200');
                try {
                    pdfContent = await extractTextFromPDF(file);
                    if (pdfContent) {
                        responses = { ...responses, ...parsePDFContentToResponses(pdfContent) };
                        localStorage.setItem('botResponses', JSON.stringify(responses));
                        appendMessage('Bot', 'I have processed and learned from the uploaded PDF!', 'bg-gray-200 dark:bg-gray-600 dark:text-gray-100');
                        displaySuggestedPrompts();
                    } else {
                        appendMessage('Bot', 'The PDF did not contain readable text.', 'bg-red-200');
                    }
                } catch (error) {
                    appendMessage('Bot', `Error processing PDF: ${error.message}`, 'bg-red-200');
                }
            } else {
                appendMessage('Bot', 'Please upload a valid PDF file.', 'bg-red-200');
            }
        });
    }

    async function sendMessage() {
        const messageText = chatInput.value.trim();
        if (!messageText) return;

        appendMessage(userPreferences.name, messageText, 'bg-blue-100 dark:bg-blue-800 dark:text-gray-100');
        saveChatToLocalStorage(userPreferences.name, messageText);

        chatInput.value = '';
        analyticsData.interactions++; // Increment interaction count
        saveAnalyticsData();

        showTypingIndicator();

        setTimeout(async () => {
            let botResponse;
            if (pendingQuestion) {
                // User is answering a pending question
                responses[pendingQuestion.toLowerCase()] = messageText;
                localStorage.setItem('botResponses', JSON.stringify(responses));
                botResponse = `Thank you! I've learned that "${pendingQuestion}" means "${messageText}".`;
                pendingQuestion = null; // Clear pending question
            } else {
                botResponse = await generateBotResponse(messageText);
            }
            hideTypingIndicator();
            appendMessage('Bot', botResponse, 'bg-gray-200 dark:bg-gray-600 dark:text-gray-100');
            saveChatToLocalStorage('Bot', botResponse);
            if (botResponse !== responses.default) requestFeedback(botResponse); // Request feedback for known responses
        }, 1000);
    }

    function appendMessage(sender, message, bgColor) {
        const messageElement = document.createElement('div');
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Modern bubble style with fade-in animation
        messageElement.classList.add('mb-2', 'flex', sender === 'Bot' ? 'justify-start' : 'justify-end', 'opacity-0', 'transition-opacity', 'duration-300');
        setTimeout(() => messageElement.classList.remove('opacity-0'), 10);

        // Avatar for sender
        const avatar = document.createElement('div');
        avatar.classList.add('w-4', 'h-4', 'flex-shrink-0', 'rounded-full', 'flex', 'items-center', 'justify-center', 'mr-2', 'mt-1');
        if (sender === 'Bot') {
            avatar.classList.add(
                'bg-white/30', // glassmorphic background
                'backdrop-blur-md',
                'border', 'border-blue-300',
                'shadow-lg',
                'ring-2', 'ring-blue-400/60',
                'relative',
                'overflow-hidden',
                'before:absolute', 'before:inset-0', 'before:rounded-full',
                'before:bg-gradient-to-br', 'before:from-blue-400/40', 'before:to-blue-700/30',
                'before:blur-md',
                'after:absolute', 'after:inset-0', 'after:rounded-full',
                'after:ring-2', 'after:ring-blue-400/40',
                'justify-center', 'items-center'
            );
            // Even smaller SVG robot face with subtle animation
            avatar.innerHTML = `
              <svg width="12" height="12" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" style="z-index:1;position:relative;">
                <defs>
                  <radialGradient id="bot-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#93c5fd" stop-opacity="0.7"/>
                    <stop offset="100%" stop-color="#2563eb" stop-opacity="0.3"/>
                  </radialGradient>
                  <linearGradient id="bot-face" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#e0e7ef"/>
                    <stop offset="1" stop-color="#60a5fa"/>
                  </linearGradient>
                </defs>
                <circle cx="16" cy="16" r="15" fill="url(#bot-glow)"/>
                <ellipse cx="16" cy="18" rx="9" ry="7" fill="url(#bot-face)" stroke="#2563eb" stroke-width="1.5"/>
                <ellipse cx="16" cy="12.5" rx="5.5" ry="3.5" fill="#fff" stroke="#60a5fa" stroke-width="1"/>
                <circle cx="13.5" cy="18" r="1.3" fill="#2563eb">
                  <animate attributeName="cy" values="18;17.7;18" dur="1.2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="18.5" cy="18" r="1.3" fill="#2563eb">
                  <animate attributeName="cy" values="18;17.7;18" dur="1.2s" repeatCount="indefinite"/>
                </circle>
                <rect x="14.5" y="21" width="3" height="1.2" rx="0.6" fill="#2563eb" opacity="0.7">
                  <animate attributeName="width" values="3;4;3" dur="1.5s" repeatCount="indefinite"/>
                </rect>
                <rect x="15.25" y="7" width="1.5" height="2.5" rx="0.75" fill="#2563eb"/>
              </svg>
            `;
        } else {
            avatar.classList.add('bg-gradient-to-br', 'from-gray-200', 'to-gray-400', 'text-gray-900', 'font-bold', 'shadow');
            avatar.textContent = userPreferences.name[0] ? userPreferences.name[0].toUpperCase() : 'U';
        }

        const bubble = document.createElement('div');
        bubble.classList.add('p-3', 'rounded-2xl', 'shadow', 'max-w-[80%]', 'relative', 'transition-colors', 'duration-200');
        
        // Apply styling based on sender directly here to ensure consistency
        if (sender === 'Bot') {
            bubble.classList.add(
                // Light mode
                'bg-gray-200', 'text-gray-800', 'border-gray-200', 'ring-blue-100',
                // Dark mode
                'dark:bg-gray-700', 'dark:text-gray-100', 'dark:border-gray-600', 'dark:ring-blue-900',
                // Shape
                'rounded-bl-none', 'border', 'ring-2'
            );
        } else {
            bubble.classList.add(
                // Light mode
                'bg-blue-100', 'text-gray-800', 'border-blue-200', 'ring-blue-50',
                // Dark mode - Using Blue-700 for better visibility
                'dark:bg-blue-700', 'dark:text-gray-100', 'dark:border-blue-600', 'dark:ring-blue-900',
                // Shape
                'rounded-br-none', 'border', 'ring-2'
            );
        }
        
        // Prevent XSS by using textContent instead of innerHTML for user input
        const strongElement = document.createElement('strong');
        strongElement.textContent = `${sender}:`;
        // Ensure sender label is visible in both modes
        strongElement.classList.add('text-gray-900', 'dark:text-white');
        bubble.appendChild(strongElement);
        
        // Message text with proper contrast
        const messageSpan = document.createElement('span');
        messageSpan.textContent = ` ${message}`;
        messageSpan.classList.add('text-gray-800', 'dark:text-gray-100');
        bubble.appendChild(messageSpan);
        
        const timestampDiv = document.createElement('div');
        timestampDiv.classList.add('text-xs', 'text-gray-500', 'dark:text-gray-300', 'mt-1', 'text-right');
        timestampDiv.textContent = timestamp;
        bubble.appendChild(timestampDiv);

        // Layout: avatar left for bot, right for user
        if (sender === 'Bot') {
            messageElement.appendChild(avatar);
            messageElement.appendChild(bubble);
        } else {
            messageElement.appendChild(bubble);
            messageElement.appendChild(avatar);
        }

        chatMessages.appendChild(messageElement);
        // Smooth scroll to bottom - use parent container which has overflow-y-auto
        const scrollContainer = chatScrollContainer || chatMessages;
        scrollContainer.scrollTo({ top: scrollContainer.scrollHeight, behavior: 'smooth' });
        // Auto-focus input after message
        setTimeout(() => chatInput.focus(), 100);
        // Highlight new bot message (only in light mode to avoid conflict)
        if (sender === 'Bot' && !document.documentElement.classList.contains('dark')) {
            bubble.classList.add('bg-gradient-to-br', 'from-blue-50', 'to-blue-100');
            setTimeout(() => bubble.classList.remove('bg-gradient-to-br', 'from-blue-50', 'to-blue-100'), 1200);
        }
    }

    function requestFeedback(botResponse) {
        const feedbackElement = document.createElement('div');
        feedbackElement.classList.add('p-2', 'rounded-xl', 'bg-gray-50', 'dark:bg-gray-800', 'flex', 'justify-between', 'items-center', 'mb-2', 'shadow', 'border', 'border-gray-200', 'dark:border-gray-600');

        // Prevent XSS by using DOM elements instead of innerHTML
        const spanElement = document.createElement('span');
        spanElement.classList.add('text-gray-700', 'dark:text-gray-200', 'font-medium', 'text-sm');
        spanElement.textContent = 'Was this response helpful?';
        feedbackElement.appendChild(spanElement);

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('flex', 'gap-2');
        
        const yesButton = document.createElement('button');
        yesButton.classList.add(
            'feedback-btn', 'px-3', 'py-1', 'rounded-full', 
            'focus:outline-none', 'focus:ring-2', 'focus:ring-green-400', 
            'transition', 'text-sm', 'font-medium',
            // Light mode colors
            'bg-green-100', 'text-green-700', 'hover:bg-green-200',
            // Dark mode colors
            'dark:bg-green-900/40', 'dark:text-green-300', 'dark:hover:bg-green-800/50'
        );
        yesButton.setAttribute('data-feedback', 'yes');
        yesButton.setAttribute('aria-label', 'Mark response as helpful');
        yesButton.textContent = '👍 Yes';
        buttonContainer.appendChild(yesButton);

        const noButton = document.createElement('button');
        noButton.classList.add(
            'feedback-btn', 'px-3', 'py-1', 'rounded-full', 
            'focus:outline-none', 'focus:ring-2', 'focus:ring-red-400', 
            'transition', 'text-sm', 'font-medium',
            // Light mode colors
            'bg-red-100', 'text-red-700', 'hover:bg-red-200',
            // Dark mode colors
            'dark:bg-red-900/40', 'dark:text-red-300', 'dark:hover:bg-red-800/50'
        );
        noButton.setAttribute('data-feedback', 'no');
        noButton.setAttribute('aria-label', 'Mark response as not helpful');
        noButton.textContent = '👎 No';
        buttonContainer.appendChild(noButton);

        feedbackElement.appendChild(buttonContainer);
        chatMessages.appendChild(feedbackElement);
        // Use correct scroll container with smooth scrolling
        const scrollContainer = chatScrollContainer || chatMessages;
        scrollContainer.scrollTo({ top: scrollContainer.scrollHeight, behavior: 'smooth' });

        feedbackElement.querySelectorAll('.feedback-btn').forEach((button) => {
            button.addEventListener('click', (e) => {
                const feedback = e.target.getAttribute('data-feedback');
                analyticsData.feedback.push({ response: botResponse, feedback });
                saveAnalyticsData();
                feedbackElement.remove();
            });
        });
    }

    function displaySuggestedPrompts() {
        // Prevent XSS by removing children instead of using innerHTML
        while (suggestedPromptsContainer.firstChild) {
            suggestedPromptsContainer.removeChild(suggestedPromptsContainer.firstChild);
        }
        predefinedPrompts.forEach((prompt, idx) => {
            const promptButton = document.createElement('button');
            promptButton.textContent = prompt;
            promptButton.className = "bg-blue-100 text-blue-900 px-3 py-1 text-sm rounded-full shadow border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition hover:bg-blue-200";
            promptButton.setAttribute('tabindex', '0');
            promptButton.setAttribute('aria-label', `Suggested prompt: ${prompt}`);
            promptButton.addEventListener('click', () => {
                chatInput.value = prompt;
                sendMessage();
            });
            promptButton.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    chatInput.value = prompt;
                    sendMessage();
                }
            });
            suggestedPromptsContainer.appendChild(promptButton);
        });
    }

    async function generateBotResponse(message) {
        const lowerCaseMessage = message.toLowerCase();

        // First check predefined responses
        if (responses[lowerCaseMessage]) {
            return responses[lowerCaseMessage];
        }

        // Try multiple AI providers in order of preference
        const aiProviders = [
            { name: 'OpenRouter', func: fetchOpenRouterResponse },
            { name: 'Gemini', func: fetchGeminiResponse }
        ];

        for (const provider of aiProviders) {
            try {
                console.log(`Trying ${provider.name} API...`);
                const aiResponse = await provider.func(message);
                if (aiResponse) {
                    // Cache the response for future use
                    responses[lowerCaseMessage] = aiResponse;
                    localStorage.setItem('botResponses', JSON.stringify(responses));
                    return aiResponse;
                }
            } catch (error) {
                console.error(`${provider.name} API Error:`, error);

                // If it's a quota/auth error, try next provider
                if (error.message.includes('QUOTA_EXCEEDED') || error.message.includes('429') ||
                    error.message.includes('API_KEY_INVALID') || error.message.includes('403')) {
                    console.log(`${provider.name} unavailable, trying next provider...`);
                    continue;
                }
            }
        }

        // If all AI providers fail, return helpful fallback message
        return `🤖 I'm currently having trouble with my AI services, but I can still help with questions about my skills, projects, work experience, and education using my built-in knowledge! Try asking about 'skills', 'projects', or 'work'.`;
    }

    async function fetchGeminiResponse(message) {
        // You need to get a valid API key from Google AI Studio: https://makersuite.google.com/app/apikey
        const apiKey = 'AIzaSyBRX1zp4FOL2V_juBXnMZes2cF6YB8xi10'; // Replace with your actual API key
        const model = 'models/gemini-2.5-flash'; // Using working model from API test
        const url = `https://generativelanguage.googleapis.com/v1beta/${model}:generateContent?key=${apiKey}`;

        // Enhanced context prompt with portfolio information
        const contextPrompt = `You are Aditya's personal portfolio chatbot. You should only answer questions about:
        - Aditya's skills: Laravel, PHP, JavaScript, Python, Cybersecurity, Web Development
        - His work at Prarang as a Laravel Developer
        - His education: BCA in Cybersecurity from Sushant University
        - His projects: Flappy Bird game, Cinesphere movie website, Innova e-commerce site
        - His certifications and experience in cybersecurity, ethical hacking
        - His leadership roles in NSS and university sports
        Keep responses concise and professional. If asked about something outside this scope, politely redirect to portfolio-related topics.`;

        try {
            console.log('Sending request to Gemini API...');

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `${contextPrompt}\n\nUser question: ${message}`
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 200,
                    },
                    safetySettings: [
                        {
                            category: "HARM_CATEGORY_HARASSMENT",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        },
                        {
                            category: "HARM_CATEGORY_HATE_SPEECH",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        }
                    ]
                })
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error:', errorText);
                throw new Error(`API request failed with status ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            console.log('API Response:', data);

            if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts) {
                const responseText = data.candidates[0].content.parts[0].text;
                if (responseText && responseText.trim()) {
                    return responseText.trim();
                }
            }

            console.warn('No valid response from API');
            return null;

        } catch (error) {
            console.error('Gemini API Error:', error);
            throw error;
        }
    }

    async function fetchOpenRouterResponse(message) {
        // Get your OpenRouter API key from: https://openrouter.ai/keys
        const apiKey = 'YOUR_OPENROUTER_API_KEY_HERE'; // Replace with your actual OpenRouter API key
        const url = 'https://openrouter.ai/api/v1/chat/completions';

        // Enhanced context prompt with portfolio information
        const contextPrompt = `You are Aditya's personal portfolio chatbot. You should only answer questions about:
        - Aditya's skills: Laravel, PHP, JavaScript, Python, Cybersecurity, Web Development
        - His work at Prarang as a Laravel Developer
        - His education: BCA in Cybersecurity from Sushant University
        - His projects: Flappy Bird game, Cinesphere movie website, Innova e-commerce site
        - His certifications and experience in cybersecurity, ethical hacking
        - His leadership roles in NSS and university sports
        Keep responses concise and professional. If asked about something outside this scope, politely redirect to portfolio-related topics.`;

        try {
            console.log('Sending request to OpenRouter API...');

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': window.location.origin, // Required for OpenRouter
                    'X-Title': 'Aditya Portfolio Chatbot' // Optional but recommended
                },
                body: JSON.stringify({
                    model: 'meta-llama/llama-3.3-8b-instruct:free', // Free meta-llama/llama-3.3-8b-instruct:free model
                    messages: [
                        {
                            role: 'system',
                            content: contextPrompt
                        },
                        {
                            role: 'user',
                            content: message
                        }
                    ],
                    max_tokens: 200,
                    temperature: 0.7,
                    top_p: 0.9,
                    stream: false
                })
            });

            console.log('OpenRouter Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('OpenRouter API Error:', errorText);
                throw new Error(`OpenRouter API request failed with status ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            console.log('OpenRouter API Response:', data);

            if (data.choices && data.choices.length > 0 && data.choices[0].message) {
                const responseText = data.choices[0].message.content;
                if (responseText && responseText.trim()) {
                    return responseText.trim();
                }
            }

            console.warn('No valid response from OpenRouter API');
            return null;

        } catch (error) {
            console.error('OpenRouter API Error:', error);
            throw error;
        }
    }

    function saveAnalyticsData() {
        localStorage.setItem('botAnalytics', JSON.stringify(analyticsData));
    }

    async function extractTextFromPDF(file) {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onload = async () => {
                try {
                    const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(reader.result) }).promise;
                    const pageTexts = await Promise.all(
                        Array.from({ length: pdf.numPages }, (_, i) =>
                            pdf.getPage(i + 1).then((page) => page.getTextContent())
                        )
                    );
                    const text = pageTexts
                        .flatMap((content) => content.items.map((item) => item.str))
                        .join(' ');
                    resolve(text || null);
                } catch (error) {
                    reject(error);
                }
            };
            reader.readAsArrayBuffer(file);
        });
    }

    function parsePDFContentToResponses(text) {
        const lines = text.split('\n').filter((line) => line.includes(':'));
        const parsedResponses = {};
        lines.forEach((line) => {
            const [question, answer] = line.split(':');
            if (question && answer) {
                parsedResponses[question.trim().toLowerCase()] = answer.trim();
            }
        });
        return parsedResponses;
    }

    function saveChatToLocalStorage(sender, message) {
        const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
        chatHistory.push({ sender, message, timestamp: new Date().toISOString() });
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }

    function loadChatFromLocalStorage() {
        // Clear the static HTML welcome message and any existing messages
        chatMessages.innerHTML = '';
        const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
        
        // If there's chat history, load it; otherwise show initial greeting
        if (chatHistory.length > 0) {
            chatHistory.forEach(({ sender, message, timestamp }) => {
                const bgColor = sender === userPreferences.name ? 'bg-blue-100 dark:bg-blue-800 dark:text-gray-100' : 'bg-gray-200 dark:bg-gray-600 dark:text-gray-100';
                // Prevent XSS by passing message without HTML content, timestamp is handled separately in appendMessage
                appendMessage(sender, message, bgColor);
            });
            // Mark welcome message as already shown since we have history
            welcomeMessageShown = true;
        }
    }

    function saveUserPreferences() {
        localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
    }

    function loadUserPreferences() {
        // Don't show welcome messages here - they will be shown in displayWelcomeMessage()
        // This function just loads preferences, not displays them
        // The messages are only shown when the chatbot is opened
    }

    function displayWelcomeMessage() {
        // Only show welcome message once per session
        if (welcomeMessageShown) {
            return;
        }
        welcomeMessageShown = true;
        
        const { name, favoriteTopics } = userPreferences;
        
        // Show welcome back message or initial greeting
        if (name && name !== 'User') {
            appendMessage('Bot', `Welcome back, ${name}! Let me know how I can assist you.`, 'bg-gray-200 dark:bg-gray-600 dark:text-gray-100');
        } else {
            appendMessage('Bot', `Hello! I'm Aditya's portfolio assistant. How can I help you today?`, 'bg-gray-200 dark:bg-gray-600 dark:text-gray-100');
        }
        
        // Only show favorite topics if they exist
        if (favoriteTopics && favoriteTopics.length > 0) {
            appendMessage('Bot', `I remember you're interested in ${favoriteTopics.join(', ')}.`, 'bg-gray-200 dark:bg-gray-600 dark:text-gray-100');
        }
    }

    function showTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.id = 'typing-indicator';
        typingIndicator.classList.add('p-2', 'rounded-xl', 'mb-2', 'bg-gray-100', 'dark:bg-gray-600', 'italic', 'text-gray-600', 'dark:text-gray-300', 'shadow', 'max-w-[60%]');
        typingIndicator.setAttribute('role', 'status');
        typingIndicator.textContent = 'Bot is typing...';
        chatMessages.appendChild(typingIndicator);
        // Use correct scroll container with smooth scrolling
        const scrollContainer = chatScrollContainer || chatMessages;
        scrollContainer.scrollTo({ top: scrollContainer.scrollHeight, behavior: 'smooth' });
    }

    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            chatMessages.removeChild(typingIndicator);
        }
    }
});
