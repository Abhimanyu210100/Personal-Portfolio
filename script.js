// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contact form handling with EmailJS
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    // Initialize EmailJS
    emailjs.init("WDiBByEIGYIU1PsRP"); // You'll need to replace this with your actual EmailJS public key
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        // Prepare email template parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_email: 'abhiswaroop210100@gmail.com'
        };
        
        // Send email using EmailJS
        emailjs.send('service_j65n72a', 'template_l60gzdt', templateParams)
            .then(function(response) {
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            }, function(error) {
                showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
                console.error('EmailJS Error:', error);
            })
            .finally(function() {
                // Reset button state
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            });
    });
}

// Notification system for form feedback
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.timeline-content, .stat-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing effect for hero title
function typeWriterDual(staticEl, highlightEl, staticText, highlightText, speed = 100) {
    let i = 0, j = 0;

    function typeStatic() {
        if (i < staticText.length) {
            staticEl.innerHTML += staticText.charAt(i);
            i++;
            setTimeout(typeStatic, speed);
        } else {
            typeHighlight(); // Once static part is done, start typing highlight
        }
    }

    function typeHighlight() {
        if (j < highlightText.length) {
            highlightEl.innerHTML += highlightText.charAt(j);
            j++;
            setTimeout(typeHighlight, speed);
        }
    }

    typeStatic();
}

// Initialize typing effect when page loads
document.addEventListener("DOMContentLoaded", () => {
    const staticEl = document.getElementById('static-text');
    const highlightEl = document.getElementById('highlighted-text');
    setTimeout(() => {
        typeWriterDual(staticEl, highlightEl, "Hi, I'm ", "Abhimanyu");
    }, 650)
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Skill tags hover effect
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Timeline animation on scroll with appear/disappear effect
const timelineItems = document.querySelectorAll('.timeline-item');
let timelineObserver;

// Function to create timeline observer
function createTimelineObserver() {
    timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Item comes into view - animate in
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                entry.target.classList.add('timeline-visible');
            } else {
                // Item goes out of view - animate out
                entry.target.style.opacity = '0';
                const index = Array.from(timelineItems).indexOf(entry.target);
                entry.target.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
                entry.target.classList.remove('timeline-visible');
            }
        });
    }, {
        threshold: 0.5, // Trigger when 50% of item is visible
        rootMargin: '0px 0px -20% 0px' // Smaller margin for more responsive triggering
    });
}

// Initialize timeline items
timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    item.classList.remove('timeline-visible');
});

// Create and start observing
createTimelineObserver();
timelineItems.forEach(item => timelineObserver.observe(item));

// Skills section animation with appear/disappear effect
const skillCategories = document.querySelectorAll('.skill-category');
const skillTags = document.querySelectorAll('.skill-tag');
let skillsObserver;

// Function to create skills observer
function createSkillsObserver() {
    skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Skill category comes into view - animate in
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('skill-visible');
                
                // Animate skill tags within this category
                const tags = entry.target.querySelectorAll('.skill-tag');
                tags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.opacity = '1';
                        tag.style.transform = 'translateY(0) scale(1)';
                    }, index * 100); // Stagger animation
                });
            } else {
                // Skill category goes out of view - animate out
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                entry.target.classList.remove('skill-visible');
                
                // Hide skill tags
                const tags = entry.target.querySelectorAll('.skill-tag');
                tags.forEach(tag => {
                    tag.style.opacity = '0';
                    tag.style.transform = 'translateY(20px) scale(0.8)';
                });
            }
        });
    }, {
        threshold: 0.3, // Trigger when 30% of category is visible
        rootMargin: '0px 0px -10% 0px'
    });
}

// Initialize skill categories
skillCategories.forEach((category, index) => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(30px)';
    category.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    category.classList.remove('skill-visible');
    
    // Initialize skill tags within each category
    const tags = category.querySelectorAll('.skill-tag');
    tags.forEach(tag => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px) scale(0.8)';
        tag.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

// Create and start observing skills
createSkillsObserver();
skillCategories.forEach(category => skillsObserver.observe(category));

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #2563eb !important;
        font-weight: 600;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
`;
document.head.appendChild(style);

// Chatbot Functionality
class Chatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.isTyping = false;
        this.welcomeMessageAdded = false;
        
        // Initialize LLM system
        this.llmConfig = new LLMConfig();
        this.llmService = new LLMService(this.llmConfig);
        
        // DOM elements
        this.chatButton = document.getElementById('chatButton');
        this.chatInterface = document.getElementById('chatInterface');
        this.closeChat = document.getElementById('closeChat');
        this.chatMessages = document.getElementById('chatMessages');
        this.chatForm = document.getElementById('chatForm');
        this.chatInput = document.getElementById('chatInput');
        this.sendButton = document.querySelector('.send-button');
        
        // Clear any existing messages to start fresh
        if (this.chatMessages) {
            this.chatMessages.innerHTML = '';
        }
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        // Toggle chat interface
        this.chatButton.addEventListener('click', () => this.toggleChat());
        this.closeChat.addEventListener('click', () => this.closeChatInterface());
        
        // Handle form submission
        this.chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleUserMessage();
        });
        
        // Handle Enter key
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleUserMessage();
            }
        });
        
        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.chatInterface.contains(e.target) && 
                !this.chatButton.contains(e.target) && 
                this.isOpen) {
                this.closeChatInterface();
            }
        });
    }
    
    toggleChat() {
        if (this.isOpen) {
            this.closeChatInterface();
        } else {
            this.openChatInterface();
        }
    }
    
    openChatInterface() {
        console.log('Opening chat interface, welcome message added:', this.welcomeMessageAdded);
        this.isOpen = true;
        this.chatInterface.classList.add('active');
        this.chatInput.focus();
        
        // Add welcome message only once when chat is first opened
        if (!this.welcomeMessageAdded) {
            this.addWelcomeMessage();
            this.welcomeMessageAdded = true;
        }
    }
    
    closeChatInterface() {
        this.isOpen = false;
        this.chatInterface.classList.remove('active');
    }
    
    addWelcomeMessage() {
        console.log('Adding welcome message, current messages count:', this.messages.length);
        const welcomeMessage = {
            type: 'bot',
            content: "Hi! I'm Abhimanyu's AI assistant. How can I help you today? You can ask me about his experience, skills, projects, or anything else!"
        };
        this.addMessage(welcomeMessage);
        console.log('Welcome message added, total messages:', this.messages.length);
    }
    
    handleUserMessage() {
        const message = this.chatInput.value.trim();
        if (!message || this.isTyping) return;
        
        // Add user message
        this.addMessage({
            type: 'user',
            content: message
        });
        
        // Clear input
        this.chatInput.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Process message and generate response
        this.processMessage(message);
    }
    
    async processMessage(message) {
        try {
            // Check for special commands first
            const localResponse = this.generateResponse(message);
            if (localResponse === null) {
                // Special command handled by generateResponse (like /stats)
                this.hideTypingIndicator();
                return;
            }
            
            // If it's a command that should use local response
            if (message.toLowerCase().includes('/help') || message.toLowerCase().includes('/commands')) {
                this.hideTypingIndicator();
                this.addMessage({
                    type: 'bot',
                    content: localResponse
                });
                return;
            }
            
            // Get response from LLM service (no conversation history to save tokens and prevent follow-ups)
            const response = await this.llmService.getResponse(message, []);
            
            // Hide typing indicator
            this.hideTypingIndicator();
            
            // Add bot response with provider info
            const currentProvider = this.llmService.getCurrentProvider();
            const responseContent = currentProvider 
                ? `${response}\n\n*Powered by ${this.llmConfig.getProviderConfig(currentProvider).name}*`
                : response;
            
            this.addMessage({
                type: 'bot',
                content: responseContent
            });
            
        } catch (error) {
            console.error('Error processing message:', error);
            this.hideTypingIndicator();
            this.addMessage({
                type: 'bot',
                content: "I'm sorry, I encountered an error. Please try again."
            });
        }
    }
    
    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Handle special commands
        if (lowerMessage.includes('/stats') || lowerMessage.includes('/usage')) {
            this.showUsageStats();
            return null; // Response will be handled by showUsageStats
        }
        
        if (lowerMessage.includes('/help') || lowerMessage.includes('/commands')) {
            return "**Available Commands:**\n" +
                   "• `/stats` or `/usage` - Show LLM provider status and usage\n" +
                   "• `/help` or `/commands` - Show this help message\n\n" +
                   "You can also ask me about Abhimanyu's experience, skills, projects, education, or anything related to his background!";
        }
        
        // Simple keyword-based responses (fallback when LLM is not available)
        if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
            return "Abhimanyu is a Data Scientist at CVS Health with 5+ years experience, having saved $9.6M through healthcare claims optimization and earned a Premier Award.";
        }
        
        if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
            return "His skills include Python, SQL, machine learning, and big data technologies, demonstrated through his pipeline development work at CVS Health.";
        }
        
        if (lowerMessage.includes('project') || lowerMessage.includes('achievement')) {
            return "He saved $9.6M through healthcare claims optimization and earned a Premier Award for building end-to-end data pipelines.";
        }
        
        if (lowerMessage.includes('education') || lowerMessage.includes('degree')) {
            return "He has a Master's in Data Science from Columbia University and a Bachelor's from IIT Madras, with research published in Computational Materials Science.";
        }
        
        if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('linkedin')) {
            return "You can reach him through the contact form or LinkedIn for data science and healthcare technology opportunities.";
        }
        
        if (lowerMessage.includes('healthcare') || lowerMessage.includes('cvs')) {
            return "At CVS Health, he works on healthcare analytics and AI solutions, including claims analysis and risk modeling.";
        }
        
        if (lowerMessage.includes('ai') || lowerMessage.includes('genai') || lowerMessage.includes('llm')) {
            return "He specializes in GenAI and large language models, applying them to auto-generate SQL/Python from healthcare documents.";
        }
        
        // Default response
        return "That's an interesting question! I'm Abhimanyu's AI assistant, and I can help you learn more about his experience in data science, AI, healthcare analytics, and his projects. What would you like to know?";
    }
    
    addMessage(message) {
        // Prevent duplicate messages by checking if the same content was just added
        if (this.messages.length > 0) {
            const lastMessage = this.messages[this.messages.length - 1];
            if (lastMessage.content === message.content && lastMessage.type === message.type) {
                console.log('Duplicate message detected, skipping:', message.content);
                return; // Skip duplicate message
            }
        }
        
        // Additional check for welcome message duplicates
        if (message.type === 'bot' && message.content.includes("Hi! I'm Abhimanyu's AI assistant")) {
            const existingWelcome = this.messages.find(msg => 
                msg.type === 'bot' && msg.content.includes("Hi! I'm Abhimanyu's AI assistant")
            );
            if (existingWelcome) {
                console.log('Welcome message already exists, skipping');
                return;
            }
        }
        
        console.log('Adding message:', message.content);
        this.messages.push(message);
        
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.type}-message`;
        
        const contentElement = document.createElement('div');
        contentElement.className = 'message-content';
        
        const textElement = document.createElement('p');
        
        // Add typewriter effect for bot messages
        if (message.type === 'bot') {
            textElement.textContent = '';
            contentElement.appendChild(textElement);
            messageElement.appendChild(contentElement);
            this.chatMessages.appendChild(messageElement);
            
            // Start typewriter effect
            this.typewriterEffect(textElement, message.content, 30);
        } else {
            // User messages appear immediately
            textElement.textContent = message.content;
            contentElement.appendChild(textElement);
            messageElement.appendChild(contentElement);
            this.chatMessages.appendChild(messageElement);
        }
        
        // Scroll to bottom
        this.scrollToBottom();
    }
    
    // Typewriter effect for bot messages
    typewriterEffect(element, text, speed = 30) {
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                // Remove cursor animation when typing is complete
                element.style.borderRight = 'none';
            }
        };
        typeWriter();
    }
    
    showTypingIndicator() {
        this.isTyping = true;
        this.sendButton.disabled = true;
        
        const typingElement = document.createElement('div');
        typingElement.className = 'message bot-message typing-indicator-container';
        typingElement.innerHTML = `
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        
        this.chatMessages.appendChild(typingElement);
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        this.isTyping = false;
        this.sendButton.disabled = false;
        
        const typingIndicator = this.chatMessages.querySelector('.typing-indicator-container');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    clearChat() {
        this.messages = [];
        this.chatMessages.innerHTML = '';
        this.welcomeMessageAdded = false;
    }
    
    // Display LLM usage statistics
    showUsageStats() {
        const stats = this.llmService.getUsageStats();
        let statsMessage = "**LLM Provider Status:**\n\n";
        
        Object.keys(stats).forEach(provider => {
            const stat = stats[provider];
            const status = stat.enabled && stat.hasApiKey ? 
                (stat.remaining > 0 ? '✅ Available' : '❌ Usage Limit Reached') : 
                '❌ Not Configured';
            
            statsMessage += `${stat.name}: ${status}\n`;
            if (stat.enabled && stat.hasApiKey) {
                const timePeriod = (provider === 'google' || provider === 'cohere') ? 'day' : 'month';
                statsMessage += `  Usage: ${stat.currentUsage}/${stat.usageLimit} (${stat.percentage}%) per ${timePeriod}\n`;
            }
            statsMessage += '\n';
        });
        
        statsMessage += "**To configure API keys:**\n";
        statsMessage += "1. Open browser console (F12)\n";
        statsMessage += "2. Run: chatbot.llmConfig.updateApiKey('openai', 'your-api-key')\n";
        statsMessage += "3. Available providers: openai, anthropic, google, cohere\n";
        
        this.addMessage({
            type: 'bot',
            content: statsMessage
        });
    }
    
    // Method to connect to external LLM APIs
    async connectToLLM(message, apiConfig = {}) {
        // Example implementation for OpenAI
        const { apiKey, model = 'gpt-3.5-turbo', endpoint = 'https://api.openai.com/v1/chat/completions' } = apiConfig;
        
        if (!apiKey) {
            throw new Error('API key is required');
        }
        
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        {
                            role: 'system',
                            content: 'You are Abhimanyu\'s AI assistant. You help answer questions about his experience in data science, AI, healthcare analytics, and his projects. Be helpful, professional, and concise.'
                        },
                        {
                            role: 'user',
                            content: message
                        }
                    ],
                    max_tokens: 150,
                    temperature: 0.7
                })
            });
            
            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }
            
            const data = await response.json();
            return data.choices[0].message.content;
            
        } catch (error) {
            console.error('LLM API Error:', error);
            throw error;
        }
    }
    
    // Method to use external LLM instead of local responses
    async useExternalLLM(message, apiConfig) {
        try {
            const response = await this.connectToLLM(message, apiConfig);
            return response;
        } catch (error) {
            // Fallback to local responses if API fails
            return this.generateResponse(message);
        }
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new Chatbot();
});

// Example of how to use external LLM (uncomment and configure as needed)
/*
// To use OpenAI or other LLM APIs, you can modify the processMessage method:
// Replace the generateResponse call with:
// const response = await this.useExternalLLM(message, {
//     apiKey: 'your-api-key-here',
//     model: 'gpt-3.5-turbo',
//     endpoint: 'https://api.openai.com/v1/chat/completions'
// });
*/

// Floating Dots Animation
class FloatingDots {
    constructor() {
        this.canvas = document.getElementById('floatingDots');
        this.ctx = this.canvas.getContext('2d');
        this.dots = [];
        this.animationId = null;
        this.maxDistance = 150; // Maximum distance for line connection
        this.dotCount = 50; // Number of dots
        this.dotSize = 3; // Size of dots
        this.lineOpacity = 0.3; // Maximum opacity for lines
        
        this.init();
    }
    
    init() {
        this.resizeCanvas();
        this.createDots();
        this.animate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createDots();
        });
    }
    
    resizeCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }
    
    createDots() {
        this.dots = [];
        for (let i = 0; i < this.dotCount; i++) {
            this.dots.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 1.5, // Velocity X
                vy: (Math.random() - 0.5) * 1.5, // Velocity Y
                size: this.dotSize + Math.random() * 2
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw dots
        this.updateDots();
        this.drawDots();
        this.drawConnections();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    updateDots() {
        this.dots.forEach(dot => {
            // Update position
            dot.x += dot.vx;
            dot.y += dot.vy;
            
            // Bounce off edges
            if (dot.x <= 0 || dot.x >= this.canvas.width) {
                dot.vx *= -1;
            }
            if (dot.y <= 0 || dot.y >= this.canvas.height) {
                dot.vy *= -1;
            }
            
            // Wrap around screen
            if (dot.x < -50) dot.x = this.canvas.width + 50;
            if (dot.x > this.canvas.width + 50) dot.x = -50;
            if (dot.y < -50) dot.y = this.canvas.height + 50;
            if (dot.y > this.canvas.height + 50) dot.y = -50;
        });
    }
    
    drawDots() {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        this.dots.forEach(dot => {
            this.ctx.beginPath();
            this.ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    drawConnections() {
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i < this.dots.length; i++) {
            for (let j = i + 1; j < this.dots.length; j++) {
                const dot1 = this.dots[i];
                const dot2 = this.dots[j];
                
                const distance = Math.sqrt(
                    Math.pow(dot1.x - dot2.x, 2) + 
                    Math.pow(dot1.y - dot2.y, 2)
                );
                
                if (distance < this.maxDistance) {
                    // Calculate opacity based on distance
                    const opacity = this.lineOpacity * (1 - distance / this.maxDistance);
                    
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    this.ctx.beginPath();
                    this.ctx.moveTo(dot1.x, dot1.y);
                    this.ctx.lineTo(dot2.x, dot2.y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialize floating dots when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Prevent multiple initializations
    if (window.chatbot) {
        console.log('Chatbot already initialized, skipping');
        return;
    }
    
    // Initialize existing functionality
    window.chatbot = new Chatbot();
    console.log('Chatbot initialized');
    
    // Initialize floating dots
    const floatingDots = new FloatingDots();
    
    // Store reference for cleanup if needed
    window.floatingDots = floatingDots;
    
    // Handle profile image loading
    const profileImage = document.getElementById('profileImage');
    const profilePlaceholder = document.getElementById('profilePlaceholder');
    
    if (profileImage) {
        // Check if image is already loaded
        if (profileImage.complete && profileImage.naturalHeight !== 0) {
            profileImage.classList.add('loaded');
        } else {
            profileImage.addEventListener('load', function() {
                this.classList.add('loaded');
                console.log('Profile image loaded successfully');
            });
            
            profileImage.addEventListener('error', function() {
                console.log('Profile image failed to load, showing placeholder');
                // Keep placeholder visible
            });
        }
        
        // Fallback: Force show image after 1 second if not loaded
        setTimeout(() => {
            if (!profileImage.classList.contains('loaded')) {
                profileImage.classList.add('loaded');
                console.log('Forced profile image to show');
            }
        }, 1000);
        
        // Add a slight delay to make the fade-in more noticeable
        setTimeout(() => {
            if (profileImage.classList.contains('loaded')) {
                profileImage.style.transition = 'opacity 0.8s ease';
            }
        }, 100);
    }
}); 