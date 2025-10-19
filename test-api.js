// Simple test script to verify Gemini API
async function listAvailableModels() {
    const apiKey = 'AIzaSyBRX1zp4FOL2V_juBXnMZes2cF6YB8xi10';
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    
    try {
        console.log('🔍 Checking available models...');
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Error listing models:', errorText);
            return [];
        }
        
        const data = await response.json();
        console.log('Available models:');
        
        const models = data.models || [];
        models.forEach(model => {
            if (model.supportedGenerationMethods && model.supportedGenerationMethods.includes('generateContent')) {
                console.log(`✅ ${model.name} - ${model.displayName}`);
            }
        });
        
        return models.filter(model => 
            model.supportedGenerationMethods && 
            model.supportedGenerationMethods.includes('generateContent')
        );
        
    } catch (error) {
        console.error('❌ Failed to list models:', error.message);
        return [];
    }
}

async function testGeminiAPI() {
    // First, get available models
    const availableModels = await listAvailableModels();
    
    if (availableModels.length === 0) {
        console.log('❌ No available models found');
        return;
    }
    
    // Use the first available model
    const modelToUse = availableModels[0].name;
    console.log(`\n🔄 Testing with model: ${modelToUse}`);
    
    const apiKey = 'AIzaSyBRX1zp4FOL2V_juBXnMZes2cF6YB8xi10';
    const url = `https://generativelanguage.googleapis.com/v1beta/${modelToUse}:generateContent?key=${apiKey}`;
    
    const testMessage = "What are your skills?";
    
    const contextPrompt = `You are Aditya's personal portfolio chatbot. You should only answer questions about:
    - Aditya's skills: Laravel, PHP, JavaScript, Python, Cybersecurity, Web Development
    - His work at Prarang as a Laravel Developer
    - His education: BCA in Cybersecurity from Sushant University
    - His projects: Flappy Bird game, Cinesphere movie website, Innova e-commerce site
    Keep responses concise and professional.`;
    
    try {
        console.log('Question:', testMessage);
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `${contextPrompt}\n\nUser question: ${testMessage}`
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 200,
                }
            })
        });
        
        console.log('Response Status:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ API Error:', errorText);
            return;
        }
        
        const data = await response.json();
        
        if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
            const responseText = data.candidates[0].content.parts[0].text;
            console.log('✅ Success! API Response:');
            console.log(responseText);
            console.log(`\n🎉 Gemini API is working! Use model: ${modelToUse}`);
        } else {
            console.log('❌ No valid response from API');
            console.log('Full response:', JSON.stringify(data, null, 2));
        }
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

// Run the test
testGeminiAPI();