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
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}<div class="text-xs text-gray-500">${timestamp}</div>`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Ensure latest message is visible
    }

    function requestFeedback(botResponse) {
        const feedbackElement = document.createElement('div');
        feedbackElement.classList.add('p-2', 'rounded', 'bg-gray-100', 'flex', 'justify-between', 'items-center', 'mb-2');

        feedbackElement.innerHTML = `
            <span class="text-gray-600">Was this response helpful?</span>
            <div>
                <button class="feedback-btn bg-green-100 text-green-800 px-2 py-1 rounded mr-2" data-feedback="yes">👍 Yes</button>
                <button class="feedback-btn bg-red-100 text-red-800 px-2 py-1 rounded" data-feedback="no">👎 No</button>
            </div>
        `;

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
        suggestedPromptsContainer.innerHTML = '';
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
            appendMessage(sender, `${message} <span class="text-xs text-gray-500">${new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>`, bgColor);
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
