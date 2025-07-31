// Frontend Integration Example
// This shows how to update your existing frontend code to use the secure backend

class SecureLLMService {
    constructor(backendUrl = 'http://localhost:3001') {
        this.backendUrl = backendUrl;
        this.providers = ['openai', 'anthropic', 'google', 'cohere'];
    }

    // Check which providers are available
    async getAvailableProviders() {
        try {
            const response = await fetch(`${this.backendUrl}/api/providers`);
            const data = await response.json();
            return data.providers.filter(provider => provider.configured);
        } catch (error) {
            console.error('Error fetching providers:', error);
            return [];
        }
    }

    // Make a secure LLM request through the backend
    async makeRequest(provider, message, options = {}) {
        try {
            const response = await fetch(`${this.backendUrl}/api/llm/${provider}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message,
                    model: options.model || 'default',
                    temperature: options.temperature || 0.7,
                    maxTokens: options.maxTokens || 150
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error making ${provider} request:`, error);
            throw error;
        }
    }

    // Try multiple providers in fallback order
    async makeRequestWithFallback(message, options = {}) {
        const availableProviders = await this.getAvailableProviders();
        
        for (const provider of availableProviders) {
            try {
                const result = await this.makeRequest(provider.name, message, options);
                return {
                    success: true,
                    provider: provider.name,
                    data: result.data
                };
            } catch (error) {
                console.warn(`Provider ${provider.name} failed, trying next...`);
                continue;
            }
        }
        
        throw new Error('All available providers failed');
    }
}

// Example usage:
/*
const llmService = new SecureLLMService();

// Single provider request
try {
    const response = await llmService.makeRequest('openai', 'Hello, how are you?');
    console.log('Response:', response);
} catch (error) {
    console.error('Request failed:', error);
}

// Fallback request (tries multiple providers)
try {
    const response = await llmService.makeRequestWithFallback('Hello, how are you?');
    console.log('Response from', response.provider, ':', response.data);
} catch (error) {
    console.error('All providers failed:', error);
}
*/

// Integration with your existing LLMConfig class
class UpdatedLLMConfig {
    constructor() {
        this.secureService = new SecureLLMService();
        this.systemPrompt = `Answer questions about Abhimanyu Swaroop in third person. Keep responses to 1-2 sentences max with specific examples.

ABOUT ABHIMANYU:
- Data Scientist at CVS Health (2023-Present)
- Healthcare analytics, GenAI, large language models
- Master's in Data Science from Columbia University
- Bachelor's in Engineering Materials Science from IIT Madras
- Saved $9.6M through healthcare claims optimization
- Led pipeline development earning Premier Award
- Skills: Python, SQL, ML, big data, healthcare analytics

Speak about him using he/his/him. Include specific examples to justify points. Keep responses short and readable.`;
    }

    async getResponse(userMessage) {
        try {
            const response = await this.secureService.makeRequestWithFallback(
                `${this.systemPrompt}\n\nUser: ${userMessage}`,
                {
                    temperature: 0.7,
                    maxTokens: 150
                }
            );
            
            // Extract the actual response text based on provider
            let responseText = '';
            switch (response.provider) {
                case 'openai':
                    responseText = response.data.choices[0].message.content;
                    break;
                case 'anthropic':
                    responseText = response.data.content[0].text;
                    break;
                case 'google':
                    responseText = response.data.candidates[0].content.parts[0].text;
                    break;
                case 'cohere':
                    responseText = response.data.generations[0].text;
                    break;
                default:
                    responseText = 'Response received but format unknown';
            }
            
            return {
                success: true,
                provider: response.provider,
                response: responseText
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
}

// Export for use in your main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SecureLLMService, UpdatedLLMConfig };
} 