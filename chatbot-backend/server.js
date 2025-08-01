const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
    crossOriginEmbedderPolicy: false
}));

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',') 
    : ['http://localhost:3000', 'http://localhost:5500', 'http://localhost:8080', 'http://127.0.0.1:5500', 'http://127.0.0.1:3000', 'http://127.0.0.1:8080', 'https://abhimanyu210100.github.io'];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Allow localhost and 127.0.0.1 for development
        if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:') || origin.startsWith('https://localhost:')) {
            return callback(null, true);
        }
        
        // Allow GitHub Pages domain
        if (origin === 'https://abhimanyu210100.github.io') {
            return callback(null, true);
        }
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('CORS blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
    message: {
        error: 'Too many requests from this IP, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Key Management
const apiKeys = {
    google: process.env.GOOGLE_API_KEY,
    cohere: process.env.COHERE_API_KEY,
    emailjs: process.env.EMAILJS_API_KEY
};

// Validation middleware
const validateApiKeyRequest = (req, res, next) => {
    const { provider } = req.params;
    
    if (!provider) {
        return res.status(400).json({ error: 'Provider parameter is required' });
    }
    
    if (!apiKeys[provider]) {
        return res.status(404).json({ error: 'Provider not found or not configured' });
    }
    
    next();
};

// Routes
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Test endpoint for CORS debugging
app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'CORS test successful',
        origin: req.headers.origin,
        timestamp: new Date().toISOString()
    });
});

// Get API key for a specific provider
app.get('/api/keys/:provider', validateApiKeyRequest, (req, res) => {
    const { provider } = req.params;
    
    // Return a masked version for security
    const maskedKey = apiKeys[provider] ? 
        `${apiKeys[provider].substring(0, 8)}...${apiKeys[provider].substring(apiKeys[provider].length - 4)}` : 
        null;
    
    res.json({
        provider,
        hasKey: !!apiKeys[provider],
        maskedKey,
        message: apiKeys[provider] ? 'API key available' : 'API key not configured'
    });
});

// Get all available providers
app.get('/api/providers', (req, res) => {
    const providers = Object.keys(apiKeys).map(provider => ({
        name: provider,
        hasKey: !!apiKeys[provider],
        configured: !!apiKeys[provider]
    }));
    
    res.json({ providers });
});

// Proxy endpoint for LLM requests (more secure than exposing keys)
app.post('/api/llm/:provider', validateApiKeyRequest, async (req, res) => {
    const { provider } = req.params;
    const { message, model, temperature, maxTokens } = req.body;
    
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }
    
    try {
        const response = await makeLLMRequest(provider, {
            message,
            model: model || 'default',
            temperature: temperature || 0.7,
            maxTokens: maxTokens || 150
        });
        
        res.json(response);
    } catch (error) {
        console.error(`Error making ${provider} request:`, error);
        res.status(500).json({ 
            error: 'Failed to process request',
            details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
});

// LLM Request Handler
async function makeLLMRequest(provider, options) {
    const apiKey = apiKeys[provider];
    
    if (!apiKey) {
        throw new Error(`API key not configured for ${provider}`);
    }
    
    const configs = {
        google: {
            url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                contents: [{
                    parts: [{
                        text: options.message
                    }]
                }],
                generationConfig: {
                    maxOutputTokens: options.maxTokens,
                    temperature: options.temperature
                }
            }
        },
        cohere: {
            url: 'https://api.cohere.ai/v1/generate',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: {
                model: 'command-light',
                prompt: options.message,
                max_tokens: options.maxTokens,
                temperature: options.temperature
            }
        }
    };
    
    const config = configs[provider];
    if (!config) {
        throw new Error(`Unsupported provider: ${provider}`);
    }
    
    const response = await fetch(config.url, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(config.body)
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${response.status} ${errorText}`);
    }
    
    const data = await response.json();
    return { success: true, data, provider };
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🔒 Secure API Backend running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔑 Configured providers: ${Object.keys(apiKeys).filter(key => apiKeys[key]).join(', ')}`);
    
    if (process.env.NODE_ENV === 'development') {
        console.log(`📝 Health check: http://localhost:${PORT}/api/health`);
        console.log(`📝 Available providers: http://localhost:${PORT}/api/providers`);
    }
});

module.exports = app; 