document.addEventListener('DOMContentLoaded', () => {
    const botToggle = document.getElementById('bot-toggle');
    const chatbot = document.getElementById('chatbot');
    const botClose = document.getElementById('bot-close');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const sendMessageButton = document.getElementById('send-message');
    const pdfUpload = document.getElementById('upload-pdf');
    const suggestedPromptsContainer = document.createElement('div');

    suggestedPromptsContainer.id = "suggested-prompts";
    suggestedPromptsContainer.className = "p-2 border-t border-gray-200 bg-gray-50 flex gap-2 flex-wrap overflow-x-auto";
    chatbot.appendChild(suggestedPromptsContainer);

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
  skills: 'Here are some of my skills: 💻 Web Development, Cybersecurity, Ethical Hacking, Data Analysis.',
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
  work: 'What do you do for work? 🤔',
  favorite: 'I love chatting with you 🌈 What’s your favorite topic?',
  movie: 'I enjoy movies 🎬 What’s your favorite one?',
  music: 'Music is great 🎵 What’s your favorite song or artist?',

  cybersecurity: 'I am passionate about cybersecurity 🔒 I have experience with vulnerability assessments, security measures, and incident response.',
  universitylife: 'Life at Sushant University is great 🌟 I’m learning a lot and enjoying the campus life.',
  techinterests: 'I’m really into tech and innovation 🚀 What about you? Do you have any favorite tech topics?',
  communityservice: 'I believe in giving back to the community 🤝 I’m involved in several community service activities.',
  favoriteclass: 'My favorite class is probably computer science 📚 I find it really interesting and challenging.',
  projectideas: 'I have several project ideas in mind 📋 From web development to AI, I’m excited to explore different areas.',
 careeradvice: 'If you need career advice, I’m here to help 🤔 Just let me know what you’re looking for.',
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
    displaySuggestedPrompts();

    botToggle.addEventListener('click', () => {
        chatbot.classList.toggle('hidden');
        if (!chatbot.classList.contains('hidden')) {
            displayWelcomeMessage();
        }
        chatInput.focus();
    });

    botClose.addEventListener('click', () => {
        chatbot.classList.add('hidden');
    });

    sendMessageButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    pdfUpload.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            appendMessage('Bot', 'Processing PDF, please wait...', 'bg-yellow-200');
            try {
                pdfContent = await extractTextFromPDF(file);
                if (pdfContent) {
                    responses = { ...responses, ...parsePDFContentToResponses(pdfContent) };
                    localStorage.setItem('botResponses', JSON.stringify(responses));
                    appendMessage('Bot', 'I have processed and learned from the uploaded PDF!', 'bg-gray-200');
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

    async function sendMessage() {
        const messageText = chatInput.value.trim();
        if (!messageText) return;

        appendMessage(userPreferences.name, messageText, 'bg-blue-100');
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
            appendMessage('Bot', botResponse, 'bg-gray-200');
            saveChatToLocalStorage('Bot', botResponse);
            if (botResponse !== responses.default) requestFeedback(botResponse); // Request feedback for known responses
        }, 1000);
    }

    function appendMessage(sender, message, bgColor) {
        const messageElement = document.createElement('div');
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageElement.classList.add('p-2', 'rounded', 'mb-2', bgColor);
        // Prevent XSS by using textContent instead of innerHTML for user input
        const strongElement = document.createElement('strong');
        strongElement.textContent = `${sender}:`;
        messageElement.appendChild(strongElement);
        
        const messageText = document.createTextNode(` ${message}`);
        messageElement.appendChild(messageText);
        
        const timestampDiv = document.createElement('div');
        timestampDiv.classList.add('text-xs', 'text-gray-500');
        timestampDiv.textContent = timestamp;
        messageElement.appendChild(timestampDiv);
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Ensure latest message is visible
    }

    function requestFeedback(botResponse) {
        const feedbackElement = document.createElement('div');
        feedbackElement.classList.add('p-2', 'rounded', 'bg-gray-100', 'flex', 'justify-between', 'items-center', 'mb-2');

        // Prevent XSS by using DOM elements instead of innerHTML
        const spanElement = document.createElement('span');
        spanElement.classList.add('text-gray-600');
        spanElement.textContent = 'Was this response helpful?';
        feedbackElement.appendChild(spanElement);

        const buttonContainer = document.createElement('div');
        const yesButton = document.createElement('button');
        yesButton.classList.add('feedback-btn', 'bg-green-100', 'text-green-800', 'px-2', 'py-1', 'rounded', 'mr-2');
        yesButton.setAttribute('data-feedback', 'yes');
        yesButton.textContent = '👍 Yes';
        buttonContainer.appendChild(yesButton);

        const noButton = document.createElement('button');
        noButton.classList.add('feedback-btn', 'bg-red-100', 'text-red-800', 'px-2', 'py-1', 'rounded');
        noButton.setAttribute('data-feedback', 'no');
        noButton.textContent = '👎 No';
        buttonContainer.appendChild(noButton);

        feedbackElement.appendChild(buttonContainer);
        chatMessages.appendChild(feedbackElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;

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
        predefinedPrompts.forEach((prompt) => {
            const promptButton = document.createElement('button');
            promptButton.textContent = prompt;
            promptButton.className = "bg-blue-100 text-blue-800 px-2 py-1 text-sm rounded hover:bg-blue-200 cursor-pointer";
            promptButton.addEventListener('click', () => {
                chatInput.value = prompt;
                sendMessage();
            });
            suggestedPromptsContainer.appendChild(promptButton);
        });
    }

    async function generateBotResponse(message) {
        const lowerCaseMessage = message.toLowerCase();
        if (responses[lowerCaseMessage]) {
            return responses[lowerCaseMessage];
        } else {
            pendingQuestion = message; // Store question for user to answer
            return `I don't know the answer to "${message}". Can you tell me what it means?`;
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
        chatMessages.innerHTML = '';
        const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
        chatHistory.forEach(({ sender, message, timestamp }) => {
            const bgColor = sender === userPreferences.name ? 'bg-blue-100' : 'bg-gray-200';
            // Prevent XSS by passing message without HTML content, timestamp is handled separately in appendMessage
            appendMessage(sender, message, bgColor);
        });
    }

    function saveUserPreferences() {
        localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
    }

    function loadUserPreferences() {
        const { name, favoriteTopics } = userPreferences;
        if (name) {
            appendMessage('Bot', `Welcome back, ${name}!`, 'bg-gray-200');
        }
        if (favoriteTopics.length) {
            appendMessage('Bot', `I remember you're interested in ${favoriteTopics.join(', ')}.`, 'bg-gray-200');
        }
    }

    function displayWelcomeMessage() {
        appendMessage('Bot', `Hello ${userPreferences.name}! Let me know how I can assist you.`, 'bg-gray-200');
        appendMessage('Bot', 'Here are some suggested prompts:', 'bg-gray-100');
        displaySuggestedPrompts();
    }

    function showTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.id = 'typing-indicator';
        typingIndicator.classList.add('p-2', 'rounded', 'mb-2', 'bg-gray-200', 'italic', 'text-gray-600');
        typingIndicator.textContent = 'Bot is typing...';
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            chatMessages.removeChild(typingIndicator);
        }
    }
});
