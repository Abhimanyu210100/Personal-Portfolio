// Secure LLM Service - Uses Backend Instead of Local API Keys
class SecureLLMService {
    constructor(backendUrl = 'https://portfolio-abhimanyu-swaroops-projects.vercel.app') {
        this.backendUrl = backendUrl;
        this.systemPrompt = this.buildSystemPrompt();
        
        this.currentProvider = null;
        this.usageStats = {
            google: { currentUsage: 0, lastReset: new Date().getDate() },
            cohere: { currentUsage: 0, lastReset: new Date().getDate() }
        };
    }

    // Build comprehensive system prompt from context data
    buildSystemPrompt() {
        const context = window.ABHIMANYU_CONTEXT;
        // Fallback prompt
        if (!context) {
            console.warn('Context data not found, using fallback prompt');
            return `Answer questions about Abhimanyu Swaroop in third person. Keep responses to 1-2 sentences max with specific examples.

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

        // Safely build comprehensive system prompt with error handling
        try {
            let prompt = `You are Abhimanyu Swaroop's AI assistant. Answer questions about him in third person using he/his/him. Keep responses to 1 sentence max - be concise and direct.

ABOUT ABHIMANYU SWAROOP:

CURRENT ROLE:
- ${context.currentRole?.position || 'Data Scientist'} at ${context.currentRole?.company || 'CVS Health'} (${context.currentRole?.duration || '2023-Present'})
- Focus: ${context.currentRole?.focus || 'Healthcare analytics, GenAI, large language models'}

EDUCATION:
${(context.education || []).map(edu => `- ${edu.degree} from ${edu.institution} (${edu.year})`).join('\n')}

KEY ACHIEVEMENTS:
${(context.experience || []).map(exp => (exp.achievements || []).map(achievement => `- ${achievement}`).join('\n')).join('\n')}

AWARDS & RECOGNITION:
${(context.awards || []).map(award => `- ${award.name} (${award.organization}, ${award.year}): ${award.description}`).join('\n')}

RESEARCH PUBLICATIONS:
${(context.publications || []).map(pub => `- "${pub.title}" (${pub.journal}, ${pub.year})`).join('\n')}

TECHNICAL SKILLS:
- Programming: ${(context.skills?.programming || []).join(', ')}
- Machine Learning: ${(context.skills?.machineLearning || []).join(', ')}
- Big Data: ${(context.skills?.bigData || []).join(', ')}
- Analytics: ${(context.skills?.analytics || []).join(', ')}
- Tools: ${(context.skills?.tools || []).join(', ')}

AREAS OF EXPERTISE:
${(context.expertise || []).join(', ')}

CONTACT:
- Email: ${context.personal?.email || 'abhiswaroop210100@gmail.com'}
- LinkedIn: ${context.personal?.linkedin || 'https://www.linkedin.com/in/abhimanyuswaroop'}

INSTRUCTIONS:
- Always speak about Abhimanyu in third person using he/his/him
- Write in natural, conversational tone - like a colleague speaking about him
- Focus on transferable skills and relevant experience for the context
- Connect achievements to why they matter for the specific question
- Avoid robotic listing of achievements - make it flow naturally
- Be specific but conversational
- If asked about hiring/fit for roles, emphasize relevant skills and experience
- Keep responses to 1 sentence max - be concise and direct
- If asked about contact, direct to LinkedIn or email`;

            return prompt;
        } catch (error) {
            console.error('Error building system prompt:', error);
            return `Answer questions about Abhimanyu Swaroop in third person. Keep responses to 1 sentence max - be concise and direct.

ABOUT ABHIMANYU:
- Data Scientist at CVS Health (2023-Present)
- Healthcare analytics, GenAI, large language models
- Master's in Data Science from Columbia University
- Bachelor's in Engineering Materials Science from IIT Madras
- Saved $9.6M through healthcare claims optimization
- Led pipeline development earning Premier Award
- Skills: Python, SQL, ML, big data, healthcare analytics

Speak about him using he/his/him. Keep responses short and direct.`;
        }
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
                maxTokens: 300,
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
        

        
        // Remove any attribution text (Powered by, Generated by, etc.)
        responseText = responseText
            .replace(/\*?Powered by [^*]+\*?/gi, '')
            .replace(/\*?Generated by [^*]+\*?/gi, '')
            .replace(/\*?Created by [^*]+\*?/gi, '')
            .replace(/\*?Using [^*]+\*?/gi, '')
            .replace(/\*?via [^*]+\*?/gi, '')
            .replace(/\*?with [^*]+\*?/gi, '')
            .replace(/\n\s*\*?[^*]*[Gg]oogle[^*]*\*?\s*\n?/gi, '')
            .replace(/\n\s*\*?[^*]*[Cc]ohere[^*]*\*?\s*\n?/gi, '')
            .trim();
        
        console.log(`Full response from ${provider}:`, responseText);
        console.log(`Response length: ${responseText.length} characters`);
        
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
            "The chat feature is currently down. Here is a short summary of Abhimanyu while we work on fixing it.",
            "Abhimanyu Swaroop is a Data Scientist at CVS Health specializing in healthcare analytics and GenAI.",
            "As a Data Scientist, he saved over $9.6M through healthcare claims optimization and earned the company Premier Award for his work.",
            "He holds a Master's in Data Science from Columbia University and a Bachelor's in Technology from IIT Madras.",
            "His expertise includes Python, SQL, ML, big data, and healthcare analytics with a focus on large language models.",
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