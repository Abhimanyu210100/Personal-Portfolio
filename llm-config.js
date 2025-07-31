// LLM Configuration and Multi-Provider System
class LLMConfig {
    constructor() {
        // LLM Providers Configuration
        this.providers = {
            openai: {
                name: 'OpenAI',
                endpoint: 'https://api.openai.com/v1/chat/completions',
                apiKey: '', // Add your OpenAI API key here
                model: 'gpt-3.5-turbo',
                maxTokens: 150,
                temperature: 0.7,
                enabled: true,
                usageLimit: 1000, // Monthly usage limit
                currentUsage: 0,
                lastReset: new Date().getMonth()
            },
            anthropic: {
                name: 'Anthropic Claude',
                endpoint: 'https://api.anthropic.com/v1/messages',
                apiKey: '', // Add your Anthropic API key here
                model: 'claude-3-haiku-20240307',
                maxTokens: 150,
                temperature: 0.7,
                enabled: true,
                usageLimit: 1000,
                currentUsage: 0,
                lastReset: new Date().getMonth()
            },
            google: {
                name: 'Google Gemini',
                endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
                apiKey: '', // Add your Google API key here
                model: 'gemini-1.5-flash',
                maxTokens: 150,
                temperature: 0.7,
                enabled: true,
                usageLimit: 1500, // Free tier: 1500 requests/day
                currentUsage: 0,
                lastReset: new Date().getMonth()
            },
            cohere: {
                name: 'Cohere',
                endpoint: 'https://api.cohere.ai/v1/generate',
                apiKey: '', // Add your Cohere API key here
                model: 'command',
                maxTokens: 150,
                temperature: 0.7,
                enabled: true,
                usageLimit: 100, // Free tier: 100 requests/day
                currentUsage: 0,
                lastReset: new Date().getMonth()
            }
        };

        // Load saved usage data from localStorage
        this.loadUsageData();
        
        // Load saved API keys from localStorage
        this.loadApiKeys();
        
        // System prompt for all LLMs
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

    // Load usage data from localStorage
    loadUsageData() {
        try {
            const savedData = localStorage.getItem('llmUsageData');
            if (savedData) {
                const data = JSON.parse(savedData);
                Object.keys(this.providers).forEach(provider => {
                    if (data[provider]) {
                        this.providers[provider].currentUsage = data[provider].currentUsage || 0;
                        this.providers[provider].lastReset = data[provider].lastReset || new Date().getMonth();
                    }
                });
            }
        } catch (error) {
            console.error('Error loading usage data:', error);
        }
    }

    // Save usage data to localStorage
    saveUsageData() {
        try {
            const data = {};
            Object.keys(this.providers).forEach(provider => {
                data[provider] = {
                    currentUsage: this.providers[provider].currentUsage,
                    lastReset: this.providers[provider].lastReset
                };
            });
            localStorage.setItem('llmUsageData', JSON.stringify(data));
        } catch (error) {
            console.error('Error saving usage data:', error);
        }
    }

    // Reset usage counters (daily for free tiers, monthly for paid)
    resetUsageCounters() {
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth();
        
        Object.keys(this.providers).forEach(provider => {
            const config = this.providers[provider];
            
            // Google and Cohere reset daily (free tiers)
            if (provider === 'google' || provider === 'cohere') {
                if (config.lastReset !== currentDay) {
                    config.currentUsage = 0;
                    config.lastReset = currentDay;
                }
            } 
            // OpenAI and Anthropic reset monthly (paid tiers)
            else {
                if (config.lastReset !== currentMonth) {
                    config.currentUsage = 0;
                    config.lastReset = currentMonth;
                }
            }
        });
        this.saveUsageData();
    }

    // Get available providers (enabled and under usage limit)
    getAvailableProviders() {
        this.resetUsageCounters();
        return Object.keys(this.providers).filter(provider => {
            const config = this.providers[provider];
            return config.enabled && 
                   config.apiKey && 
                   config.currentUsage < config.usageLimit;
        });
    }

    // Get the best available provider (prioritize by order)
    getBestProvider() {
        const available = this.getAvailableProviders();
        return available.length > 0 ? available[0] : null;
    }

    // Increment usage for a provider
    incrementUsage(provider) {
        if (this.providers[provider]) {
            this.providers[provider].currentUsage++;
            this.saveUsageData();
        }
    }

    // Get provider configuration
    getProviderConfig(provider) {
        return this.providers[provider] || null;
    }

    // Update API key for a provider
    updateApiKey(provider, apiKey) {
        if (this.providers[provider]) {
            this.providers[provider].apiKey = apiKey;
            // Save API key to localStorage for persistence
            this.saveApiKeys();
            return true;
        }
        return false;
    }
    
    // Save API keys to localStorage
    saveApiKeys() {
        try {
            const apiKeys = {};
            Object.keys(this.providers).forEach(provider => {
                if (this.providers[provider].apiKey) {
                    apiKeys[provider] = this.providers[provider].apiKey;
                }
            });
            localStorage.setItem('llmApiKeys', JSON.stringify(apiKeys));
            console.log('✅ API keys saved to localStorage');
        } catch (error) {
            console.error('Error saving API keys:', error);
        }
    }
    
    // Load API keys from localStorage
    loadApiKeys() {
        try {
            const savedKeys = localStorage.getItem('llmApiKeys');
            if (savedKeys) {
                const apiKeys = JSON.parse(savedKeys);
                Object.keys(apiKeys).forEach(provider => {
                    if (this.providers[provider]) {
                        this.providers[provider].apiKey = apiKeys[provider];
                    }
                });
                console.log('✅ API keys loaded from localStorage');
            }
        } catch (error) {
            console.error('Error loading API keys:', error);
        }
    }
    
    // Clear all API keys (for security)
    clearApiKeys() {
        try {
            Object.keys(this.providers).forEach(provider => {
                this.providers[provider].apiKey = '';
            });
            localStorage.removeItem('llmApiKeys');
            console.log('✅ API keys cleared from localStorage');
        } catch (error) {
            console.error('Error clearing API keys:', error);
        }
    }

    // Enable/disable a provider
    setProviderEnabled(provider, enabled) {
        if (this.providers[provider]) {
            this.providers[provider].enabled = enabled;
            return true;
        }
        return false;
    }

    // Get usage statistics
    getUsageStats() {
        const stats = {};
        Object.keys(this.providers).forEach(provider => {
            const config = this.providers[provider];
            stats[provider] = {
                name: config.name,
                enabled: config.enabled,
                hasApiKey: !!config.apiKey,
                currentUsage: config.currentUsage,
                usageLimit: config.usageLimit,
                remaining: config.usageLimit - config.currentUsage,
                percentage: Math.round((config.currentUsage / config.usageLimit) * 100)
            };
        });
        return stats;
    }
}

// Export for use in other files
window.LLMConfig = LLMConfig; 