// Multi-LLM Service for handling different API providers
class LLMService {
    constructor(llmConfig) {
        this.config = llmConfig;
        this.currentProvider = null;
    }

    // Main method to get response from any available LLM
    async getResponse(message, conversationHistory = []) {
        const availableProviders = this.config.getAvailableProviders();
        
        if (availableProviders.length === 0) {
            throw new Error('No LLM providers available. Please check API keys and usage limits.');
        }

        // Try each provider in order until one succeeds
        for (const provider of availableProviders) {
            try {
                console.log(`Trying ${provider}...`);
                const response = await this.callProvider(provider, message, conversationHistory);
                this.config.incrementUsage(provider);
                this.currentProvider = provider;
                console.log(`Successfully used ${provider}`);
                return response;
            } catch (error) {
                console.error(`Error with ${provider}:`, error);
                continue; // Try next provider
            }
        }

        // If all providers fail, fall back to local response
        console.log('All LLM providers failed, using local response');
        return this.getLocalResponse(message);
    }

    // Call specific provider
    async callProvider(provider, message, conversationHistory) {
        const config = this.config.getProviderConfig(provider);
        if (!config) {
            throw new Error(`Provider ${provider} not configured`);
        }

        switch (provider) {
            case 'openai':
                return await this.callOpenAI(config, message, conversationHistory);
            case 'anthropic':
                return await this.callAnthropic(config, message, conversationHistory);
            case 'google':
                return await this.callGoogle(config, message, conversationHistory);
            case 'cohere':
                return await this.callCohere(config, message, conversationHistory);
            default:
                throw new Error(`Unknown provider: ${provider}`);
        }
    }

    // OpenAI API call
    async callOpenAI(config, message, conversationHistory) {
        const messages = [
            { role: 'system', content: this.config.systemPrompt },
            ...conversationHistory,
            { role: 'user', content: message }
        ];

        const response = await fetch(config.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.apiKey}`
            },
            body: JSON.stringify({
                model: config.model,
                messages: messages,
                max_tokens: config.maxTokens,
                temperature: config.temperature
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    // Anthropic Claude API call
    async callAnthropic(config, message, conversationHistory) {
        const messages = [
            { role: 'user', content: this.config.systemPrompt + '\n\n' + message }
        ];

        const response = await fetch(config.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': config.apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: config.model,
                messages: messages,
                max_tokens: config.maxTokens,
                temperature: config.temperature
            })
        });

        if (!response.ok) {
            throw new Error(`Anthropic API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.content[0].text;
    }

    // Google Gemini API call
    async callGoogle(config, message, conversationHistory) {
        const fullMessage = this.config.systemPrompt + '\n\nUser: ' + message;
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${config.apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: fullMessage
                    }]
                }],
                generationConfig: {
                    maxOutputTokens: config.maxTokens,
                    temperature: config.temperature
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_NONE"
                    },
                    {
                        category: "HARM_CATEGORY_HATE_SPEECH", 
                        threshold: "BLOCK_NONE"
                    },
                    {
                        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                        threshold: "BLOCK_NONE"
                    },
                    {
                        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                        threshold: "BLOCK_NONE"
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Google API error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }

    // Cohere API call
    async callCohere(config, message, conversationHistory) {
        const response = await fetch('https://api.cohere.ai/v1/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.apiKey}`
            },
            body: JSON.stringify({
                model: 'command',
                prompt: `${this.config.systemPrompt}\n\nUser: ${message}\n\nAssistant:`,
                max_tokens: config.maxTokens,
                temperature: config.temperature,
                k: 0,
                stop_sequences: [],
                return_likelihoods: 'NONE'
            })
        });

        if (!response.ok) {
            throw new Error(`Cohere API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.generations[0].text;
    }

    // Local fallback response
    getLocalResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
            return "I have over 5 years of experience in data science and AI. I currently work at CVS Health as a Data Scientist, where I've led end-to-end development of pipelines and applied GenAI to healthcare problems. I've also worked at DIA Ventures and completed projects at Columbia University.";
        }
        
        if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
            return "My technical skills include Python, R, SQL, machine learning (TensorFlow, PyTorch), big data technologies (AWS, Spark, Hadoop), and healthcare analytics. I specialize in generative AI, large language models, and building scalable data systems.";
        }
        
        if (lowerMessage.includes('project') || lowerMessage.includes('achievement')) {
            return "One of my major achievements was leading a 0-1 pipeline development that enabled a new business unit at CVS Health, earning a Premier Award. I've also worked on GenAI applications for healthcare document understanding and code generation.";
        }
        
        if (lowerMessage.includes('education') || lowerMessage.includes('degree')) {
            return "I hold a Master's in Data Science from Columbia University and a Bachelor's in Engineering Materials Science from IIT Madras. My education focused on applied analytics and machine learning.";
        }
        
        if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('linkedin')) {
            return "You can reach me through the contact form on this page, or connect with me on LinkedIn. I'm always open to discussing data science, AI, and healthcare technology opportunities.";
        }
        
        if (lowerMessage.includes('healthcare') || lowerMessage.includes('cvs')) {
            return "At CVS Health, I work on healthcare analytics, applying data science to improve patient outcomes and operational efficiency. My work includes claims analysis, risk modeling, and implementing AI solutions for healthcare challenges.";
        }
        
        if (lowerMessage.includes('ai') || lowerMessage.includes('genai') || lowerMessage.includes('llm')) {
            return "I specialize in generative AI and large language models. I've applied these technologies to understand complex healthcare documents, generate production code, and create intelligent systems that reduce reliance on domain experts.";
        }
        
        return "That's an interesting question! I'm Abhimanyu's AI assistant, and I can help you learn more about his experience in data science, AI, healthcare analytics, and his projects. What would you like to know?";
    }

    // Get current provider info
    getCurrentProvider() {
        return this.currentProvider;
    }

    // Get usage statistics
    getUsageStats() {
        return this.config.getUsageStats();
    }
}

// Export for use in other files
window.LLMService = LLMService; 