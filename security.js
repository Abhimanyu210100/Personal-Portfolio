// Security Module for API Key Protection
class SecurityManager {
    constructor() {
        this.isInitialized = false;
        this.init();
    }

    init() {
        // Check if we're in development mode
        this.isDevelopment = this.checkDevelopmentMode();
        
        if (!this.isDevelopment) {
            // Disable right-click context menu
            document.addEventListener('contextmenu', e => e.preventDefault());
            
            // Disable text selection
            document.addEventListener('selectstart', e => e.preventDefault());
            
            // Disable drag and drop
            document.addEventListener('dragstart', e => e.preventDefault());
            
            // Disable common dev tools shortcuts
            document.addEventListener('keydown', this.handleKeyDown.bind(this));
            
            // Disable F12, Ctrl+Shift+I, Ctrl+U
            this.disableDevTools();
            
            // Obfuscate console logs
            this.obfuscateConsole();
            
            // Add security headers
            this.addSecurityHeaders();
            
            console.log('🔒 Security measures activated (Production Mode)');
        } else {
            console.log('🔧 Development mode - Security measures disabled for debugging');
        }
        
        this.isInitialized = true;
    }
    
    checkDevelopmentMode() {
        // Check if we're on localhost or have a development flag
        const isLocalhost = window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1' ||
                           window.location.hostname === '';
        
        const hasDevFlag = window.location.search.includes('dev=true') ||
                          localStorage.getItem('devMode') === 'true';
        
        const isMobile = this.isMobileDevice();
        
        return isLocalhost || hasDevFlag || isMobile;
    }

    handleKeyDown(e) {
        // Disable F12
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+Shift+I (Dev Tools)
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+Shift+C (Element Inspector)
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+U (View Source)
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            return false;
        }
        
        // Disable Ctrl+S (Save Page)
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            return false;
        }
    }

    disableDevTools() {
        // Skip dev tools detection on mobile devices
        if (this.isMobileDevice()) {
            console.log('📱 Mobile device detected - skipping dev tools detection');
            return;
        }
        
        // Detect if dev tools are open
        const devtools = {
            open: false,
            orientation: null
        };
        
        const threshold = 160;
        
        setInterval(() => {
            const widthThreshold = window.outerWidth - window.innerWidth > threshold;
            const heightThreshold = window.outerHeight - window.innerHeight > threshold;
            
            if (widthThreshold || heightThreshold) {
                if (!devtools.open) {
                    devtools.open = true;
                    this.handleDevToolsOpen();
                }
            } else {
                devtools.open = false;
            }
        }, 500);
    }
    
    isMobileDevice() {
        // Check for mobile devices
        const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        const isMobile = mobileRegex.test(navigator.userAgent);
        
        // Additional checks for mobile characteristics
        const isTouchDevice = 'ontouchstart' in window;
        const isSmallScreen = window.innerWidth <= 768;
        
        return isMobile || isTouchDevice || isSmallScreen;
    }

    handleDevToolsOpen() {
        // Clear sensitive data when dev tools are detected
        if (window.chatbot && window.chatbot.llmConfig) {
            window.chatbot.llmConfig.clearApiKeys();
            console.log('🔒 API keys cleared due to security threat');
        }
        
        // Show warning
        this.showSecurityWarning();
    }

    obfuscateConsole() {
        // Store original console methods
        const originalLog = console.log;
        const originalWarn = console.warn;
        const originalError = console.error;
        
        // Override console methods to hide sensitive data
        console.log = (...args) => {
            const filteredArgs = args.map(arg => {
                if (typeof arg === 'string' && this.containsApiKey(arg)) {
                    return '[REDACTED]';
                }
                return arg;
            });
            originalLog.apply(console, filteredArgs);
        };
        
        console.warn = (...args) => {
            const filteredArgs = args.map(arg => {
                if (typeof arg === 'string' && this.containsApiKey(arg)) {
                    return '[REDACTED]';
                }
                return arg;
            });
            originalWarn.apply(console, filteredArgs);
        };
        
        console.error = (...args) => {
            const filteredArgs = args.map(arg => {
                if (typeof arg === 'string' && this.containsApiKey(arg)) {
                    return '[REDACTED]';
                }
                return arg;
            });
            originalError.apply(console, filteredArgs);
        };
    }

    containsApiKey(text) {
        // Check for common API key patterns
        const apiKeyPatterns = [
                    /AIza[a-zA-Z0-9]{35}/, // Google API
            /AIza[a-zA-Z0-9_-]{35}/, // Google
            /[a-zA-Z0-9]{40}/ // Cohere
        ];
        
        return apiKeyPatterns.some(pattern => pattern.test(text));
    }

    addSecurityHeaders() {
        // Add meta tags for security
        const metaTags = [
            { name: 'robots', content: 'noindex, nofollow, noarchive, nosnippet, noimageindex' },
            { name: 'referrer', content: 'no-referrer' },
            { 'http-equiv': 'X-Frame-Options', content: 'DENY' },
            { 'http-equiv': 'X-Content-Type-Options', content: 'nosniff' },
            { 'http-equiv': 'X-XSS-Protection', content: '1; mode=block' }
        ];
        
        metaTags.forEach(tag => {
            const meta = document.createElement('meta');
            Object.keys(tag).forEach(key => {
                meta.setAttribute(key, tag[key]);
            });
            document.head.appendChild(meta);
        });
    }

    showSecurityWarning() {
        // Create security warning
        const warning = document.createElement('div');
        warning.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #dc2626;
            color: white;
            padding: 20px;
            border-radius: 8px;
            z-index: 10000;
            font-family: Arial, sans-serif;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        `;
        warning.innerHTML = `
            <h3>⚠️ Security Warning</h3>
            <p>Developer tools detected. Sensitive data has been cleared for security. Chat has been disabled.</p>
            <button onclick="this.parentElement.remove()" style="
                background: white;
                color: #dc2626;
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
                cursor: pointer;
                margin-top: 10px;
            ">OK</button>
        `;
        document.body.appendChild(warning);
        
        // Remove warning after 5 seconds
        setTimeout(() => {
            if (warning.parentElement) {
                warning.remove();
            }
        }, 5000);
    }

    // Method to manually clear all sensitive data
    clearAllSensitiveData() {
        if (window.chatbot && window.chatbot.llmConfig) {
            window.chatbot.llmConfig.clearApiKeys();
        }
        localStorage.removeItem('llmApiKeys');
        localStorage.removeItem('llmUsageData');
        console.log('🔒 All sensitive data cleared');
    }

    // Method to check security status
    getSecurityStatus() {
        const isMobile = this.isMobileDevice();
        return {
            isDevelopment: this.isDevelopment,
            isMobile: isMobile,
            devToolsDetected: false, // Will be updated by detection logic
            apiKeysProtected: !this.isDevelopment && !isMobile,
            consoleObfuscated: !this.isDevelopment && !isMobile,
            rightClickDisabled: !this.isDevelopment && !isMobile,
            textSelectionDisabled: !this.isDevelopment && !isMobile
        };
    }
    
    // Method to enable development mode
    enableDevelopmentMode() {
        localStorage.setItem('devMode', 'true');
        console.log('🔧 Development mode enabled - Security measures disabled');
        location.reload(); // Reload to apply changes
    }
    
    // Method to disable development mode
    disableDevelopmentMode() {
        localStorage.removeItem('devMode');
        console.log('🔒 Development mode disabled - Security measures enabled');
        location.reload(); // Reload to apply changes
    }
    
    // Method to temporarily disable security (for debugging)
    temporarilyDisableSecurity() {
        if (this.isDevelopment) {
            console.log('🔧 Security already disabled in development mode');
            return;
        }
        
        console.log('🔧 Temporarily disabling security for debugging...');
        console.log('⚠️  Remember to re-enable security when done!');
        
        // Remove event listeners
        document.removeEventListener('contextmenu', e => e.preventDefault());
        document.removeEventListener('selectstart', e => e.preventDefault());
        document.removeEventListener('dragstart', e => e.preventDefault());
        document.removeEventListener('keydown', this.handleKeyDown.bind(this));
        
        console.log('✅ Security temporarily disabled. Use securityManager.reEnableSecurity() to restore.');
    }
    
    // Method to re-enable security
    reEnableSecurity() {
        console.log('🔒 Re-enabling security measures...');
        location.reload(); // Reload to re-enable all security
    }
}

// Initialize security when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.securityManager = new SecurityManager();
});

// Export for use in other files
window.SecurityManager = SecurityManager; 