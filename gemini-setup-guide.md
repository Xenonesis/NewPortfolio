# Gemini API Setup Guide

## Step 1: Get Your API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

## Step 2: Update Your Chatbot

1. Open `chatbot.js`
2. Find line with `const apiKey = 'YOUR_GEMINI_API_KEY_HERE';`
3. Replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key

## Step 3: Test the Integration

1. Open your website
2. Click on the chatbot
3. Try asking: "What are your skills?" or "Tell me about your projects"
4. Check browser console (F12) for any error messages

## Troubleshooting

- **API Key Invalid**: Make sure you copied the full key correctly
- **CORS Errors**: The Gemini API should work from browser, but if you get CORS errors, you might need to implement a backend proxy
- **Rate Limits**: Free tier has usage limits, check your quota in Google AI Studio

## Alternative: Test with a Simple Question

Try asking the chatbot predefined questions first to make sure the basic functionality works:
- "hello"
- "skills" 
- "projects"
- "work"