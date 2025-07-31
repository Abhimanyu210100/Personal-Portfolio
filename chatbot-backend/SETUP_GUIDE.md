# 🚀 Complete Setup Guide

This guide will walk you through setting up your secure backend step by step.

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)
- Your API keys from various providers

## 🛠️ Step 1: Install Dependencies

Open your terminal and navigate to the backend folder:

```bash
cd chatbot-backend
npm install
```

## 🔧 Step 2: Configure Environment Variables

1. **Copy the example environment file:**
   ```bash
   cp env.example .env
   ```

2. **Edit the .env file** with your actual API keys:
   ```env
   # Server Configuration
   PORT=3001
   NODE_ENV=development
   
   # JWT Secret (generate a strong random string)
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   
   # API Keys - Add your actual API keys here
   OPENAI_API_KEY=sk-your-openai-api-key-here
   ANTHROPIC_API_KEY=sk-ant-your-anthropic-api-key-here
   GOOGLE_API_KEY=your-google-api-key-here
   COHERE_API_KEY=your-cohere-api-key-here
   EMAILJS_API_KEY=your-emailjs-api-key-here
   
   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   
   # CORS Configuration
   ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
   ```

## 🧪 Step 3: Test Locally

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **You should see output like:**
   ```
   🔒 Secure API Backend running on port 3001
   🌍 Environment: development
   🔑 Configured providers: openai, anthropic, google, cohere
   📝 Health check: http://localhost:3001/api/health
   📝 Available providers: http://localhost:3001/api/providers
   ```

3. **Test the backend:**
   ```bash
   npm test
   ```

## 🌐 Step 4: Test API Endpoints

You can test the endpoints manually:

1. **Health Check:**
   ```bash
   curl http://localhost:3001/api/health
   ```

2. **Get Providers:**
   ```bash
   curl http://localhost:3001/api/providers
   ```

3. **Test LLM Request:**
   ```bash
   curl -X POST http://localhost:3001/api/llm/openai \
     -H "Content-Type: application/json" \
     -d '{"message": "Hello, test message", "maxTokens": 50}'
   ```

## 🔄 Step 5: Update Your Frontend

Now you need to update your frontend to use the secure backend instead of storing API keys locally.

### Option A: Use the Provided Integration

1. **Copy the integration file** to your main project:
   ```bash
   cp frontend-integration.js ../secure-llm-service.js
   ```

2. **Update your existing `llm-config.js`:**
   ```javascript
   // Replace your existing LLMConfig class with this:
   class LLMConfig {
       constructor() {
           this.secureService = new SecureLLMService('http://localhost:3001');
           this.systemPrompt = `Answer questions about Abhimanyu Swaroop...`;
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
               
               // Extract response text based on provider
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
   ```

### Option B: Manual Integration

Update your existing code to make requests through the backend:

```javascript
// Instead of making direct API calls, use the backend
async function makeSecureRequest(message, provider = 'openai') {
    try {
        const response = await fetch('http://localhost:3001/api/llm/' + provider, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                maxTokens: 150,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Request failed:', error);
        throw error;
    }
}
```

## 🚀 Step 6: Deploy to Production

Choose one of the deployment options from `DEPLOYMENT.md`:

### Quick Deploy (Railway - Recommended):
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create new project from GitHub repo
4. Set environment variables in Railway dashboard
5. Deploy automatically

### Alternative (Render):
1. Go to [render.com](https://render.com)
2. Create new web service
3. Connect your GitHub repo
4. Set environment variables
5. Deploy

## 🔒 Step 7: Security Checklist

Before going live:

- [ ] Generate a strong JWT_SECRET
- [ ] Use different API keys for production
- [ ] Set NODE_ENV=production
- [ ] Update ALLOWED_ORIGINS with your actual domain
- [ ] Test all endpoints
- [ ] Remove any hardcoded API keys from frontend

## 🔧 Step 8: Update Frontend for Production

Once deployed, update your frontend to use the production URL:

```javascript
// Development
const backendUrl = 'http://localhost:3001';

// Production (replace with your actual URL)
const backendUrl = 'https://your-app-name.railway.app';
```

## 🧪 Step 9: Final Testing

1. **Test the deployed backend:**
   ```bash
   BACKEND_URL=https://your-app-name.railway.app npm test
   ```

2. **Test your frontend** with the new backend URL

3. **Monitor logs** for any errors

## 📊 Step 10: Monitoring

- Check your hosting platform's logs
- Monitor API usage and costs
- Set up alerts for errors
- Track response times

## 🆘 Troubleshooting

### Common Issues:

1. **CORS Errors:**
   - Check `ALLOWED_ORIGINS` in your `.env` file
   - Make sure your frontend domain is included

2. **API Key Errors:**
   - Verify all API keys are correct
   - Check if API keys have sufficient credits

3. **Port Issues:**
   - Most platforms use `process.env.PORT` automatically
   - Don't hardcode port numbers

4. **Build Failures:**
   - Check if all dependencies are in `package.json`
   - Verify Node.js version compatibility

### Getting Help:
- Check platform-specific logs
- Use `NODE_ENV=development` for detailed error messages
- Test locally first before deploying

## 🎉 Congratulations!

You now have a secure backend that:
- ✅ Keeps your API keys safe
- ✅ Provides rate limiting
- ✅ Handles CORS properly
- ✅ Is ready for production
- ✅ Supports multiple LLM providers

Your API keys are now secure and your frontend can make requests through your backend without exposing sensitive information! 