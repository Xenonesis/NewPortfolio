document.addEventListener('DOMContentLoaded', () => {
    const botToggle = document.getElementById('bot-toggle');
    const chatbot = document.getElementById('chatbot');
    const botClose = document.getElementById('bot-close');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const sendMessageButton = document.getElementById('send-message');

    // Initial responses object
    let responses = JSON.parse(localStorage.getItem('botResponses')) || {
        "hello": "Hi there! How can I assist you today?",
        "help": "Sure, let me know what you need help with.",
        "default": "I'm not sure about that. Could you provide more details?",
    };

    // Load chat history on page load
    loadChatFromLocalStorage();

    // Toggle Chatbot Window
    botToggle.addEventListener('click', () => {
        chatbot.classList.toggle('hidden');
        if (!chatbot.classList.contains('hidden')) {
            loadChatFromLocalStorage();
        }
        chatInput.focus();
    });

    // Close Chatbot Window
    botClose.addEventListener('click', () => {
        chatbot.classList.add('hidden');
    });

    // Handle Sending Messages
    sendMessageButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Send Message Function
    function sendMessage() {
        const messageText = chatInput.value.trim().toLowerCase();
        if (messageText === '') return;

        // Append and save user message
        appendMessage('You', messageText, 'bg-blue-100');
        saveChatToLocalStorage('You', messageText);

        // Clear the input field
        chatInput.value = '';

        // Generate bot response
        setTimeout(() => {
            const botResponse = generateBotResponse(messageText);
            appendMessage('Bot', botResponse, 'bg-gray-200');
            saveChatToLocalStorage('Bot', botResponse);
        }, 500);
    }

    // Append Message to Chat Window
    function appendMessage(sender, message, bgColor) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('p-2', 'rounded', 'mb-2', bgColor);
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Save Chat to Local Storage
    function saveChatToLocalStorage(sender, message) {
        const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
        chatHistory.push({ sender, message, timestamp: new Date().toISOString() });
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }

    // Load Chat from Local Storage
    function loadChatFromLocalStorage() {
        chatMessages.innerHTML = ''; // Clear the chat window
        const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
        chatHistory.forEach(({ sender, message }) => {
            const bgColor = sender === 'You' ? 'bg-blue-100' : 'bg-gray-200';
            appendMessage(sender, message, bgColor);
        });
    }

    // Generate Bot Response
    function generateBotResponse(message) {
        if (responses[message]) {
            return responses[message];
        } else {
            // Ask the user for the appropriate response
            const defaultResponse = responses["default"];
            const userLearnPrompt = `I don't know how to respond to "${message}". Can you teach me a suitable reply?`;
            const combinedResponse = `${defaultResponse}\n\n${userLearnPrompt}`;

            // Add the default response to the chat
            setTimeout(() => {
                learnFromUser(message);
            }, 2000);

            return combinedResponse;
        }
    }

    // Learn From User Input
    function learnFromUser(userMessage) {
        const promptMessage = `Please type the reply you want me to remember for "${userMessage}":`;
        const userReply = prompt(promptMessage);

        if (userReply) {
            // Save the new response to the responses object
            responses[userMessage] = userReply;

            // Update localStorage
            localStorage.setItem('botResponses', JSON.stringify(responses));

            // Inform the user
            appendMessage('Bot', `Thanks! I've learned how to respond to "${userMessage}".`, 'bg-gray-200');
        } else {
            appendMessage('Bot', "No response provided. I'll ask again next time.", 'bg-gray-200');
        }
    }
});
