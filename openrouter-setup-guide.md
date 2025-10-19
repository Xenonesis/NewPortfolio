# OpenRouter API Setup Guide

## Step 1: Get Your OpenRouter API Key

1. Go to [OpenRouter](https://openrouter.ai/keys)
2. Sign up or log in with your account
3. Click "Create Key" 
4. Copy the generated API key (starts with `sk-or-v1-...`)

## Step 2: Update Your Chatbot

1. Open `chatbot.js`
2. Find the line with `const apiKey = 'YOUR_OPENROUTER_API_KEY_HERE';` in the `fetchOpenRouterResponse` function
3. Replace `YOUR_OPENROUTER_API_KEY_HERE` with your actual OpenRouter API key

## Step 3: How the Dual API System Works

Your chatbot now has **redundancy** with two AI providers:

### Priority Order:
1. **Predefined Responses** (instant, always works)
2. **Gemini API** (primary AI provider)
3. **OpenRouter API** (backup AI provider)

### Smart Fallback:
- If Gemini hits quota limits → automatically tries OpenRouter
- If both APIs fail → shows helpful fallback message
- Responses are cached locally for faster future access

## Available Models on OpenRouter

### Free Models (No cost):
- `meta-llama/llama-3.3-8b-instruct:free` (currently used - latest Llama 3.3 model)
- `meta-llama/llama-3.1-8b-instruct:free`
- `microsoft/phi-3-mini-128k-instruct:free`
- `google/gemma-2-9b-it:free`

### Paid Models (Better quality):
- `anthropic/claude-3.5-sonnet`
- `openai/gpt-4o`
- `meta-llama/llama-3.1-70b-instruct`

## Benefits of OpenRouter

✅ **Multiple Models**: Access to 100+ AI models  
✅ **Competitive Pricing**: Often cheaper than direct APIs  
✅ **High Availability**: Better uptime than single providers  
✅ **Free Tier**: Some models are completely free  
✅ **No Vendor Lock-in**: Easy to switch between models  

## Testing Your Setup

1. Use the test file: `test-dual-api.html`
2. Enter both API keys
3. Test individual APIs and fallback behavior
4. Check browser console for detailed logs

## Troubleshooting

- **Invalid API Key**: Make sure you copied the full key correctly
- **CORS Errors**: OpenRouter supports browser requests with proper headers
- **Rate Limits**: Free models have usage limits, consider upgrading for heavy use
- **Model Unavailable**: Try switching to a different model in the code