// Secure LLM Service - Uses Backend Instead of Local API Keys
class SecureLLMService {
    constructor(backendUrl = 'https://portfolio-abhimanyu-swaroops-projects.vercel.app') {
        this.backendUrl = backendUrl;
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
        
        this.currentProvider = null;
        this.usageStats = {
            google: { currentUsage: 0, lastReset: new Date().getDate() },
            cohere: { currentUsage: 0, lastReset: new Date().getDate() }
        };
    }

    // Check which providers are available from backend
    async getAvailableProviders() {
        try {
            const response = await fetch(`${this.backendUrl}/api/providers`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.providers.filter(provider => provider.configured && provider.name !== 'emailjs');
        } catch (error) {
            console.error('Error fetching providers:', error);
            return [];
        }
    }

    // Main method to get response from backend
    async getResponse(message, conversationHistory = []) {
        const availableProviders = await this.getAvailableProviders();
        
        if (availableProviders.length === 0) {
            throw new Error('No LLM providers available. Please check backend configuration.');
        }

        // Try each provider in order until one succeeds
        for (const provider of availableProviders) {
            try {
                console.log(`Trying ${provider.name}...`);
                const response = await this.callProvider(provider.name, message, conversationHistory);
                this.incrementUsage(provider.name);
                this.currentProvider = provider.name;
                console.log(`Successfully used ${provider.name}`);
                return response;
            } catch (error) {
                console.error(`Error with ${provider.name}:`, error);
                continue; // Try next provider
            }
        }

        // If all providers fail, fall back to local response
        console.log('All LLM providers failed, using local response');
        return this.getLocalResponse(message);
    }

    // Call specific provider through backend
    async callProvider(provider, message, conversationHistory) {
        const fullMessage = this.systemPrompt + '\n\nUser: ' + message;
        
        const response = await fetch(`${this.backendUrl}/api/llm/${provider}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: fullMessage,
                maxTokens: 150,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Backend API error: ${response.status} - ${errorData.error || 'Unknown error'}`);
        }

        const data = await response.json();
        
        // Extract response text based on provider
        let responseText = '';
        switch (provider) {
            case 'google':
                responseText = data.data.candidates[0].content.parts[0].text;
                break;
            case 'cohere':
                responseText = data.data.generations[0].text;
                break;
            default:
                responseText = 'Response received but format unknown';
        }
        
        return responseText;
    }

    // Increment usage for a provider
    incrementUsage(provider) {
        if (this.usageStats[provider]) {
            this.usageStats[provider].currentUsage++;
            this.saveUsageStats();
        }
    }

    // Save usage stats to localStorage
    saveUsageStats() {
        try {
            localStorage.setItem('secureLLMUsageStats', JSON.stringify(this.usageStats));
        } catch (error) {
            console.error('Error saving usage stats:', error);
        }
    }

    // Load usage stats from localStorage
    loadUsageStats() {
        try {
            const savedData = localStorage.getItem('secureLLMUsageStats');
            if (savedData) {
                this.usageStats = JSON.parse(savedData);
            }
        } catch (error) {
            console.error('Error loading usage stats:', error);
        }
    }

    // Get current provider
    getCurrentProvider() {
        return this.currentProvider;
    }

    // Get usage statistics
    getUsageStats() {
        return this.usageStats;
    }

    // Local fallback response
    getLocalResponse(message) {
        const responses = [
            "I'm Abhimanyu Swaroop, a Data Scientist at CVS Health specializing in healthcare analytics and GenAI.",
            "As a Data Scientist, I've saved $9.6M through healthcare claims optimization and earned the Premier Award.",
            "I hold a Master's in Data Science from Columbia University and a Bachelor's in Engineering from IIT Madras.",
            "My expertise includes Python, SQL, ML, big data, and healthcare analytics with a focus on large language models.",
            "I led pipeline development that earned the Premier Award and work extensively with healthcare analytics."
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Test backend connection
    async testBackendConnection() {
        try {
            console.log('Testing backend connection to:', this.backendUrl);
            const response = await fetch(`${this.backendUrl}/api/health`);
            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);
            
            if (response.ok) {
                const data = await response.json();
                console.log('✅ Backend connection successful:', data);
                return true;
            } else {
                const errorText = await response.text();
                console.error('❌ Backend connection failed:', response.status, errorText);
                return false;
            }
        } catch (error) {
            console.error('❌ Backend connection error:', error);
            console.error('Error details:', error.message);
            return false;
        }
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SecureLLMService };
} 