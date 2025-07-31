# 🚀 GitHub Pages Deployment Guide

This guide will help you deploy your portfolio with the multi-LLM chatbot to GitHub Pages.

## 📋 Prerequisites

1. **GitHub Account**: Make sure you have a GitHub account
2. **Git**: Install Git on your computer
3. **Portfolio Files**: All your portfolio files should be ready

## 🎯 Step-by-Step Deployment

### **Step 1: Create GitHub Repository**

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name it `portfolio` (or your preferred name)
5. Make it **Public** (required for free GitHub Pages)
6. **Don't** initialize with README (we already have one)
7. Click "Create repository"

### **Step 2: Upload Your Files**

#### **Option A: Using GitHub Web Interface**
1. In your new repository, click "uploading an existing file"
2. Drag and drop all your portfolio files:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `llm-config.js`
   - `llm-service.js`
   - `README.md`
   - `.gitignore`
3. Add a commit message: "Initial portfolio upload"
4. Click "Commit changes"

#### **Option B: Using Git Commands**
```bash
# Navigate to your portfolio folder
cd /path/to/your/portfolio

# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial portfolio upload"

# Add remote repository (replace with your GitHub URL)
git remote add origin https://github.com/yourusername/portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### **Step 3: Enable GitHub Pages**

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section (in the left sidebar)
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch
6. Select "/ (root)" folder
7. Click "Save"

### **Step 4: Wait for Deployment**

- GitHub Pages will automatically build and deploy your site
- This usually takes 2-5 minutes
- You'll see a green checkmark when deployment is complete
- Your site will be available at: `https://yourusername.github.io/portfolio`

## 🔧 Post-Deployment Setup

### **1. Test Your Site**
- Visit your GitHub Pages URL
- Test all features including the chatbot
- Check mobile responsiveness

### **2. Configure LLM API Keys**
Once deployed, you can configure the chatbot:

1. **Open your live site**
2. **Open browser console** (F12)
3. **Add your API keys**:
```javascript
// Get free API keys from:
// Google: https://makersuite.google.com/app/apikey
// Cohere: https://dashboard.cohere.com/
// OpenAI: https://platform.openai.com/
// Anthropic: https://console.anthropic.com/

chatbot.llmConfig.updateApiKey('google', 'your-google-api-key');
chatbot.llmConfig.updateApiKey('cohere', 'your-cohere-api-key');
chatbot.llmConfig.updateApiKey('openai', 'your-openai-api-key');
chatbot.llmConfig.updateApiKey('anthropic', 'your-anthropic-api-key');
```

4. **Test the chatbot** by typing `/stats` to see provider status

### **3. Update README.md**
- Replace `[Your GitHub Pages URL will go here]` with your actual URL
- Update contact information
- Add any customizations you made

## 🎨 Customization Options

### **Custom Domain (Optional)**
1. Buy a domain (e.g., from Namecheap, GoDaddy)
2. In GitHub Pages settings, add your custom domain
3. Update DNS settings with your domain provider

### **Update Personal Information**
- Edit `index.html` with your details
- Update the system prompt in `llm-config.js`
- Modify styling in `styles.css`

## 🔒 Security Best Practices

### **API Key Management**
- **Never commit API keys** to the repository
- Store keys in browser localStorage (current method)
- Consider using environment variables for production
- Monitor usage to avoid unexpected charges

### **Usage Monitoring**
- Type `/stats` in the chat to monitor usage
- Set up alerts for usage limits
- Regularly check provider status

## 🚨 Troubleshooting

### **Common Issues:**

1. **Site not loading**:
   - Check if repository is public
   - Verify GitHub Pages is enabled
   - Wait 5-10 minutes for deployment

2. **Chatbot not working**:
   - Check browser console for errors
   - Verify API keys are configured
   - Test with `/stats` command

3. **Styling issues**:
   - Clear browser cache
   - Check file paths in HTML
   - Verify all CSS files are uploaded

### **Getting Help**:
- Check GitHub Pages documentation
- Review browser console for errors
- Test locally before deploying

## 📊 Analytics (Optional)

### **Google Analytics**
Add to your `index.html` head section:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🎉 Success!

Your portfolio is now live with:
- ✅ Professional design
- ✅ Multi-LLM chatbot
- ✅ Responsive layout
- ✅ Free hosting
- ✅ Easy updates

**Next Steps:**
1. Share your portfolio URL
2. Add it to your LinkedIn profile
3. Include it in job applications
4. Keep it updated with new projects

---

**Your GitHub Pages URL**: `https://yourusername.github.io/portfolio` 