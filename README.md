# Abhimanyu's Portfolio

A modern, interactive portfolio website featuring a multi-LLM powered chatbot.

## 🌟 Features

- **Interactive Chatbot**: Powered by multiple LLM providers (OpenAI, Anthropic, Google, Cohere)
- **Responsive Design**: Works seamlessly on all devices
- **Modern UI**: Clean, professional design with smooth animations
- **Multi-LLM System**: Automatic fallback between different AI providers
- **Usage Tracking**: Monitor API usage and limits

## 🤖 Chatbot Features

The portfolio includes an intelligent chatbot that can answer questions about:
- Professional experience and background
- Technical skills and technologies
- Projects and achievements
- Education and certifications
- Contact information

### LLM Providers Supported:
- **Google Gemini** (Free tier: 1500 requests/day)
- **Cohere** (Free tier: 100 requests/day)
- **OpenAI GPT-3.5** ($5 free credit)
- **Anthropic Claude** ($5 free credit)

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

3. **Check Status**:
   - Type `/stats` in the chat to see provider status
   - Type `/help` for available commands

## 📁 File Structure

```
portfolio/
├── index.html          # Main portfolio page
├── styles.css          # Styling and animations
├── script.js           # Main JavaScript functionality
├── llm-config.js       # LLM configuration and management
├── llm-service.js      # Multi-LLM service implementation
└── README.md           # This file
```

## 🎨 Customization

### Personal Information:
- Update personal details in `index.html`
- Modify the system prompt in `llm-config.js`
- Adjust styling in `styles.css`

### LLM Configuration:
- Modify provider settings in `llm-config.js`
- Adjust usage limits and models
- Customize system prompts

## 🔒 Security Notes

- API keys are stored in browser localStorage
- Never commit API keys to the repository
- Consider using environment variables for production
- Monitor usage to avoid unexpected charges

## 📊 Usage Monitoring

The system automatically tracks:
- API usage per provider
- Monthly limits and resets
- Provider availability status
- Error handling and fallbacks

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