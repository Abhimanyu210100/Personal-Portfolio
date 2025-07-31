# Deployment Guide

This guide will help you deploy your secure backend to various hosting platforms.

## 🚀 Quick Deployment Options

### Option 1: Railway (Recommended for Beginners)

Railway offers a free tier and is very easy to use.

#### Steps:
1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with your GitHub account

2. **Connect Your Repository**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select the `chatbot-backend` folder

3. **Set Environment Variables**
   - Go to your project dashboard
   - Click on "Variables" tab
   - Add all your environment variables from `.env`:
     ```
     PORT=3001
     NODE_ENV=production
     JWT_SECRET=your-super-secret-jwt-key
           GOOGLE_API_KEY=your-google-key
      COHERE_API_KEY=your-cohere-key
      EMAILJS_API_KEY=your-emailjs-key
     RATE_LIMIT_WINDOW_MS=900000
     RATE_LIMIT_MAX_REQUESTS=100
     ALLOWED_ORIGINS=https://yourdomain.com,http://localhost:3000
     ```

4. **Deploy**
   - Railway will automatically deploy when you push to GitHub
   - Your backend will be available at `https://your-app-name.railway.app`

### Option 2: Render (Free Tier Available)

#### Steps:
1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with your GitHub account

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Set the root directory to `chatbot-backend`

3. **Configure Service**
   - **Name**: `your-app-name-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. **Set Environment Variables**
   - Go to "Environment" tab
   - Add all your environment variables (same as Railway)

5. **Deploy**
   - Click "Create Web Service"
   - Your backend will be available at `https://your-app-name.onrender.com`

### Option 3: Heroku (Free Tier Discontinued, but still popular)

#### Steps:
1. **Install Heroku CLI**
   ```bash
   # macOS
   brew install heroku/brew/heroku
   
   # Windows
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   cd chatbot-backend
   heroku create your-app-name
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your-super-secret-jwt-key
   heroku config:set GOOGLE_API_KEY=your-google-key
heroku config:set COHERE_API_KEY=your-cohere-key
heroku config:set EMAILJS_API_KEY=your-emailjs-key
   heroku config:set RATE_LIMIT_WINDOW_MS=900000
   heroku config:set RATE_LIMIT_MAX_REQUESTS=100
   heroku config:set ALLOWED_ORIGINS=https://yourdomain.com,http://localhost:3000
   ```

5. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Option 4: Vercel (Free Tier Available)

#### Steps:
1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Set the root directory to `chatbot-backend`

3. **Configure Project**
   - **Framework Preset**: Node.js
   - **Build Command**: `npm install`
   - **Output Directory**: `.`
   - **Install Command**: `npm install`
   - **Development Command**: `npm run dev`

4. **Set Environment Variables**
   - Go to "Settings" → "Environment Variables"
   - Add all your environment variables

5. **Deploy**
   - Click "Deploy"
   - Your backend will be available at `https://your-app-name.vercel.app`

## 🔧 Advanced Deployment Options

### Option 5: DigitalOcean App Platform

#### Steps:
1. **Create DigitalOcean Account**
   - Go to [digitalocean.com](https://digitalocean.com)
   - Sign up and add payment method

2. **Create App**
   - Go to "Apps" → "Create App"
   - Connect your GitHub repository
   - Select the `chatbot-backend` folder

3. **Configure App**
   - **Environment**: Node.js
   - **Build Command**: `npm install`
   - **Run Command**: `npm start`

4. **Set Environment Variables**
   - Go to "Settings" → "Environment Variables"
   - Add all your environment variables

5. **Deploy**
   - Click "Create Resources"
   - Your backend will be available at `https://your-app-name.ondigitalocean.app`

### Option 6: AWS EC2 (More Control)

#### Steps:
1. **Launch EC2 Instance**
   - Go to AWS Console → EC2
   - Launch instance with Ubuntu
   - Configure security group to allow port 3001

2. **Connect to Instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-instance-ip
   ```

3. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **Clone and Setup**
   ```bash
   git clone your-repository-url
   cd your-repo/chatbot-backend
   npm install
   ```

5. **Create .env file**
   ```bash
   nano .env
   # Add all your environment variables
   ```

6. **Install PM2**
   ```bash
   sudo npm install -g pm2
   pm2 start server.js --name "chatbot-backend"
   pm2 startup
   pm2 save
   ```

## 🔒 Security Checklist for Production

### Before Deployment:
- [ ] Generate a strong JWT_SECRET (use a password generator)
- [ ] Use different API keys for production
- [ ] Set NODE_ENV=production
- [ ] Configure ALLOWED_ORIGINS with your actual domain
- [ ] Test all API endpoints
- [ ] Set up monitoring/logging

### After Deployment:
- [ ] Test the health endpoint: `https://your-backend-url/api/health`
- [ ] Test provider endpoints: `https://your-backend-url/api/providers`
- [ ] Update your frontend to use the new backend URL
- [ ] Test the complete flow from frontend to backend
- [ ] Monitor logs for any errors

## 🔍 Testing Your Deployment

### 1. Health Check
```bash
curl https://your-backend-url/api/health
```

### 2. Check Providers
```bash
curl https://your-backend-url/api/providers
```

### 3. Test LLM Request
```bash
curl -X POST https://your-backend-url/api/llm/google \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, test message", "maxTokens": 50}'
```

## 🚨 Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Check your `ALLOWED_ORIGINS` environment variable
   - Make sure your frontend domain is included

2. **API Key Errors**
   - Verify all API keys are correctly set
   - Check if API keys have sufficient credits

3. **Port Issues**
   - Most platforms use `process.env.PORT` automatically
   - Don't hardcode port numbers

4. **Build Failures**
   - Check if all dependencies are in `package.json`
   - Verify Node.js version compatibility

### Getting Help:
- Check platform-specific logs
- Use `NODE_ENV=development` for detailed error messages
- Test locally first before deploying

## 📊 Monitoring

### Free Monitoring Options:
- **Railway**: Built-in logs and metrics
- **Render**: Built-in logs
- **Heroku**: `heroku logs --tail`
- **Vercel**: Built-in analytics
- **DigitalOcean**: Built-in monitoring

### Custom Monitoring:
- Set up alerts for error rates
- Monitor API usage and costs
- Track response times
- Set up uptime monitoring

## 💰 Cost Optimization

### Free Tier Limits:
- **Railway**: $5/month after free tier
- **Render**: Free tier available
- **Heroku**: No free tier anymore
- **Vercel**: Generous free tier
- **DigitalOcean**: $5/month minimum

### Tips:
- Use free tiers for development
- Monitor API usage to control costs
- Consider serverless options for low traffic
- Use caching to reduce API calls 