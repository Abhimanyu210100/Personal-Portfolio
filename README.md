# Abhimanyu's Portfolio

A modern, interactive portfolio website featuring a multi-LLM powered chatbot with comprehensive personal context.

## 🌟 Features

- **Interactive Chatbot**: Powered by multiple LLM providers (OpenAI, Anthropic, Google, Cohere)
- **Comprehensive Context System**: Detailed personal information database for accurate responses
- **Responsive Design**: Works seamlessly on all devices
- **Modern UI**: Clean, professional design with smooth animations
- **Multi-LLM System**: Automatic fallback between different AI providers
- **Usage Tracking**: Monitor API usage and limits
- **Easy Updates**: Simple methods to update personal information

## 🤖 Chatbot Features

The portfolio includes an intelligent chatbot that can answer questions about:
- Professional experience and background
- Technical skills and technologies
- Projects and achievements
- Education and certifications
- Awards and publications
- Contact information

### LLM Providers Supported:
- **Google Gemini** (Free tier: 1500 requests/day)
- **Cohere** (Free tier: 100 requests/day)
- **OpenAI GPT-3.5** ($5 free credit)
- **Anthropic Claude** ($5 free credit)

## 📋 Context System

The chatbot uses a comprehensive context system (`context-data.js`) containing:
- **Personal Information**: Name, title, contact details
- **Work Experience**: Detailed job history with achievements
- **Education**: Degrees, institutions, years
- **Technical Skills**: Categorized by programming, ML, big data, etc.
- **Key Projects**: Specific projects with descriptions and impact
- **Awards & Recognition**: Honors and achievements
- **Research Publications**: Academic papers
- **Areas of Expertise**: Specialized knowledge areas

### Updating Your Information:
```javascript
// In browser console (F12)
// Add new experience
contextUpdater.addExperience('Role', 'Company', 'Duration', ['Achievement 1', 'Achievement 2']);

// Add new project
contextUpdater.addProject('Project Name', 'Description', 'Impact', ['Tech1', 'Tech2']);

// Update skills
contextUpdater.updateSkills('programming', ['Python', 'R', 'SQL']);

// Save changes
contextUpdater.saveContext();
```

## 🚀 Live Demo

Visit: [Your GitHub Pages URL will go here]

## 🛠️ Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Open `index.html` in your browser or use a local server:
```bash
python3 -m http.server 8000
```

3. Open `http://localhost:8000` in your browser

## 🔧 LLM Configuration

### Setting up API Keys:

1. **Get Free API Keys**:
   - [Google AI Studio](https://makersuite.google.com/app/apikey) (Free)
   - [Cohere Console](https://dashboard.cohere.com/) (Free)
   - [OpenAI Platform](https://platform.openai.com/) ($5 credit)
   - [Anthropic Console](https://console.anthropic.com/) ($5 credit)

2. **Configure in Browser Console**:
```javascript
// Open browser console (F12) and run:
chatbot.llmConfig.updateApiKey('google', 'your-google-api-key');
chatbot.llmConfig.updateApiKey('cohere', 'your-cohere-api-key');
chatbot.llmConfig.updateApiKey('openai', 'your-openai-api-key');
chatbot.llmConfig.updateApiKey('anthropic', 'your-anthropic-api-key');
```

3. **API Keys Persistence**:
   - API keys are automatically saved to browser localStorage
   - Keys persist across page refreshes and browser sessions
   - Keys are stored locally and never sent to the server
   - To clear all keys: `chatbot.llmConfig.clearApiKeys()`

4. **Check Status**:
   - Type `/stats` in the chat to see provider status
   - Type `/help` for available commands

## 📁 File Structure

```
portfolio/
├── index.html              # Main portfolio page
├── styles.css              # Styling and animations
├── script.js               # Main JavaScript functionality
├── context-data.js         # Personal information database
├── context-updater.js      # Helper for updating context
├── llm-config.js           # LLM configuration and management
├── llm-service.js          # Multi-LLM service implementation
├── DEPLOYMENT.md           # Deployment guide
└── README.md               # This file
```

## 🎨 Customization

### Personal Information:
- Update personal details in `context-data.js`
- Use `context-updater.js` helper for easy updates
- Modify the system prompt in `llm-config.js`
- Adjust styling in `styles.css`

### LLM Configuration:
- Modify provider settings in `llm-config.js`
- Adjust usage limits and models
- Customize system prompts

### Context Management:
- Edit `context-data.js` directly for major changes
- Use `contextUpdater` methods for quick updates
- Save changes with `contextUpdater.saveContext()`

## 🔒 Security Features

### **API Key Protection:**
- **Local Storage**: Keys stored securely in browser localStorage
- **Auto-Clear**: Keys automatically cleared if dev tools are detected
- **Console Protection**: API keys are redacted from console logs
- **Pattern Detection**: Automatic detection of API key patterns

### **Anti-Theft Measures:**
- **Dev Tools Detection**: Automatically detects and responds to developer tools
- **Right-Click Disabled**: Prevents context menu access
- **Text Selection Disabled**: Prevents copying of sensitive data
- **Keyboard Shortcuts Blocked**: F12, Ctrl+Shift+I, Ctrl+U disabled
- **Security Headers**: Meta tags prevent indexing and framing

### **Manual Security Controls:**
```javascript
// Clear all sensitive data
securityManager.clearAllSensitiveData();

// Check security status
securityManager.getSecurityStatus();

// Clear API keys only
chatbot.llmConfig.clearApiKeys();
```

### **Development & Debugging:**
```javascript
// Enable development mode (disables security)
securityManager.enableDevelopmentMode();

// Disable development mode (enables security)
securityManager.disableDevelopmentMode();

// Temporarily disable security for debugging
securityManager.temporarilyDisableSecurity();

// Re-enable security
securityManager.reEnableSecurity();

// Check if in development mode
securityManager.getSecurityStatus().isDevelopment;
```

### **Development Mode Options:**
1. **Localhost**: Security automatically disabled on `localhost` or `127.0.0.1`
2. **Mobile Devices**: Security automatically disabled on mobile devices
3. **URL Parameter**: Add `?dev=true` to URL to enable development mode
4. **LocalStorage**: Set `devMode=true` in localStorage
5. **Manual Control**: Use the methods above to toggle security

### **Mobile Device Support:**
- Security measures are automatically disabled on mobile devices
- Prevents false positives from mobile browser behaviors
- Mobile detection includes: Android, iOS, touch devices, small screens

### **Best Practices:**
- Never commit API keys to the repository
- Monitor usage to avoid unexpected charges
- Use different keys for development and production
- Regularly rotate API keys

## 📊 Usage Monitoring

The system automatically tracks:
- API usage per provider
- Monthly limits and resets
- Provider availability status
- Error handling and fallbacks
- Context data updates and storage

## 🤝 Contributing

Feel free to fork this repository and customize it for your own portfolio!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: abhiswaroop210100@gmail.com
- **LinkedIn**: [Abhimanyu Swaroop](https://www.linkedin.com/in/abhimanyuswaroop)
- **Portfolio**: [Your GitHub Pages URL]

---

Built with ❤️ using modern web technologies and AI-powered interactions.