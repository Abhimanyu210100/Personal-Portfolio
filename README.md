# Abhimanyu's Portfolio

A modern, interactive portfolio website featuring a multi-LLM powered chatbot with comprehensive personal context.

## 🌟 Features

- **Interactive Chatbot**: Powered by multiple LLM providers (Google Gemini, Cohere)
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
- **Google Gemini** (Free tier available)

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

## 🔧 Secure Backend Configuration

### **No API Keys Needed in Frontend!**

The chatbot now uses a secure backend that handles all API keys. No configuration needed in the frontend.

### **Backend Features:**
- ✅ **Secure API Key Storage** - All keys stored in backend environment variables
- ✅ **Automatic Provider Selection** - Tries Google Gemini, then Cohere
- ✅ **Rate Limiting** - Built-in protection against abuse
- ✅ **CORS Protection** - Secure cross-origin requests
- ✅ **Error Handling** - Graceful fallback to local responses

### **Check Status:**
- Type `/stats` in the chat to see backend provider status
- Type `/help` for available commands

## 📁 File Structure

```
portfolio/
├── index.html              # Main portfolio page
├── styles.css              # Styling and animations
├── script.js               # Main JavaScript functionality
├── context-data.js         # Personal information database
├── context-updater.js      # Helper for updating context
├── secure-llm-service.js   # Secure backend integration
├── chatbot-backend/        # Secure backend (deployed on Vercel)
├── DEPLOYMENT.md           # Deployment guide
└── README.md               # This file
```

## 🎨 Customization

### Personal Information:
- Update personal details in `context-data.js`
- Use `context-updater.js` helper for easy updates
- Modify the system prompt in `llm-config.js`
- Adjust styling in `styles.css`

### Backend Configuration:
- Backend deployed on Vercel with secure environment variables
- Automatic provider selection (Google Gemini → Cohere)
- Built-in rate limiting and CORS protection

### Context Management:
- Edit `context-data.js` directly for major changes
- Use `contextUpdater` methods for quick updates
- Save changes with `contextUpdater.saveContext()`

## 🔒 Security Features

### **Secure Backend Architecture:**
- **No API Keys in Frontend** - All keys stored securely in backend environment variables
- **HTTPS Communication** - All requests go through secure HTTPS
- **Rate Limiting** - Built-in protection against abuse
- **CORS Protection** - Secure cross-origin request handling
- **Error Handling** - Graceful fallback to local responses

### **Backend Security:**
- **Environment Variables** - API keys stored in Vercel environment variables
- **Input Validation** - All requests validated before processing
- **Error Sanitization** - Secure error responses that don't leak sensitive info
- **Automatic Fallback** - Uses local responses if backend is unavailable

### **Frontend Security:**
- **No Sensitive Data** - Frontend contains no API keys or sensitive information
- **Secure Communication** - All API calls go through the secure backend
- **Local Usage Tracking** - Only tracks usage statistics locally

### **Best Practices:**
- All API keys stored securely in backend environment variables
- No sensitive data in frontend code
- Automatic fallback to local responses if backend fails
- Built-in rate limiting and CORS protection

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