# Secure Chatbot Backend

A secure Node.js backend for managing API keys and handling LLM requests. This backend keeps your API keys secure and provides a proxy interface for your frontend.

## 🔒 Security Features

- **Environment Variables**: All API keys stored in `.env` file (never committed to git)
- **Rate Limiting**: Prevents abuse with configurable request limits
- **CORS Protection**: Only allows requests from specified origins
- **Helmet Security**: Adds security headers to prevent common attacks
- **Input Validation**: Validates all incoming requests
- **Error Handling**: Secure error responses that don't leak sensitive information

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd chatbot-backend
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and add your API keys:

```bash
cp env.example .env
```

Edit `.env` and add your actual API keys:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# JWT Secret (generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# API Keys - Add your actual API keys here
GOOGLE_API_KEY=your-google-api-key-here
COHERE_API_KEY=your-cohere-api-key-here
EMAILJS_API_KEY=your-emailjs-api-key-here

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

### 3. Start the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on port 3001 (or the port specified in your `.env` file).

## 📡 API Endpoints

### Health Check
```
GET /api/health
```
Returns server status and environment information.

### Get Available Providers
```
GET /api/providers
```
Returns list of configured LLM providers.

### Check API Key Status
```
GET /api/keys/:provider
```
Returns masked API key information for a specific provider.

### Make LLM Request (Recommended)
```
POST /api/llm/:provider
```
Body:
```json
{
  "message": "Your message here",
  "model": "gpt-3.5-turbo",
  "temperature": 0.7,
  "maxTokens": 150
}
```

## 🔧 Frontend Integration

Update your frontend to use the backend instead of storing API keys locally:

### Before (Insecure):
```javascript
// Don't do this in production!
const apiKey = 'your-google-api-key-here';
const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', {
  headers: { 'Content-Type': 'application/json' },
  // ...
});
```

### After (Secure):
```javascript
// Make requests through your secure backend
const response = await fetch('http://localhost:3001/api/llm/google', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Your message here',
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    maxTokens: 150
  })
});
```

## 🛡️ Security Best Practices

### 1. Environment Variables
- Never commit `.env` files to git
- Use different API keys for development and production
- Rotate API keys regularly

### 2. CORS Configuration
- Only allow trusted domains in `ALLOWED_ORIGINS`
- Use HTTPS in production

### 3. Rate Limiting
- Adjust rate limits based on your usage patterns
- Monitor for abuse

### 4. Production Deployment
- Use a process manager like PM2
- Set up proper logging
- Use HTTPS
- Configure firewall rules

## 🚀 Deployment Options

### Option 1: Heroku (Free Tier Available)
1. Create a Heroku account
2. Install Heroku CLI
3. Create a new app: `heroku create your-app-name`
4. Set environment variables in Heroku dashboard
5. Deploy: `git push heroku main`

### Option 2: Railway (Free Tier Available)
1. Connect your GitHub repository
2. Set environment variables in Railway dashboard
3. Deploy automatically

### Option 3: Vercel (Free Tier Available)
1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically

### Option 4: DigitalOcean/Railway/AWS
- More control but requires more setup
- Better for high-traffic applications

## 🔍 Monitoring and Logs

The server logs important information:
- Server startup with configured providers
- API request errors
- Rate limiting violations

## 🚨 Troubleshooting

### Common Issues:

1. **CORS Errors**: Check `ALLOWED_ORIGINS` in your `.env` file
2. **API Key Errors**: Verify your API keys are correct and have sufficient credits
3. **Rate Limiting**: Check your request frequency
4. **Port Already in Use**: Change the `PORT` in your `.env` file

### Debug Mode:
Set `NODE_ENV=development` in your `.env` file for detailed error messages.

## 📝 License

MIT License - feel free to use this for your projects! 