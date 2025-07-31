#!/usr/bin/env node

// Test script for the backend
const fetch = require('node-fetch');

const BASE_URL = process.env.BACKEND_URL || 'http://localhost:3001';

async function testBackend() {
    console.log('🧪 Testing Backend API...\n');

    try {
        // Test 1: Health Check
        console.log('1. Testing Health Check...');
        const healthResponse = await fetch(`${BASE_URL}/api/health`);
        const healthData = await healthResponse.json();
        console.log('✅ Health Check:', healthData.status);
        console.log('   Environment:', healthData.environment);
        console.log('   Timestamp:', healthData.timestamp);
        console.log('');

        // Test 2: Get Providers
        console.log('2. Testing Providers Endpoint...');
        const providersResponse = await fetch(`${BASE_URL}/api/providers`);
        const providersData = await providersResponse.json();
        console.log('✅ Available Providers:');
        providersData.providers.forEach(provider => {
            const status = provider.configured ? '✅ Configured' : '❌ Not Configured';
            console.log(`   ${provider.name}: ${status}`);
        });
        console.log('');

        // Test 3: Check API Keys (masked)
        console.log('3. Testing API Key Status...');
        const configuredProviders = providersData.providers.filter(p => p.configured);
        
        for (const provider of configuredProviders) {
            const keyResponse = await fetch(`${BASE_URL}/api/keys/${provider.name}`);
            const keyData = await keyResponse.json();
            console.log(`   ${provider.name}: ${keyData.hasKey ? '✅ Has Key' : '❌ No Key'}`);
            if (keyData.maskedKey) {
                console.log(`   Masked Key: ${keyData.maskedKey}`);
            }
        }
        console.log('');

        // Test 4: Test LLM Requests for all configured providers
        if (configuredProviders.length > 0) {
            console.log('4. Testing LLM Requests...');
            
            for (const provider of configuredProviders) {
                if (provider.name === 'emailjs') continue; // Skip emailjs as it's not an LLM provider
                
                console.log(`   Testing ${provider.name}...`);
                const llmResponse = await fetch(`${BASE_URL}/api/llm/${provider.name}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: 'Hello, this is a test message. Please respond with "Test successful!"',
                        maxTokens: 50,
                        temperature: 0.7
                    })
                });

                if (llmResponse.ok) {
                    const llmData = await llmResponse.json();
                    console.log(`   ✅ ${provider.name}: Success!`);
                    console.log(`      Response: ${llmData.success ? 'Yes' : 'No'}`);
                } else {
                    const errorData = await llmResponse.json();
                    console.log(`   ❌ ${provider.name}: Failed - ${errorData.error}`);
                }
            }
        } else {
            console.log('4. Skipping LLM Test (no providers configured)');
        }

        console.log('\n🎉 Backend tests completed!');
        console.log('\n📝 Next Steps:');
        console.log('   1. Update your frontend to use this backend');
        console.log('   2. Deploy to your chosen platform');
        console.log('   3. Update the BASE_URL in your frontend code');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.log('\n🔧 Troubleshooting:');
        console.log('   1. Make sure the backend is running: npm run dev');
        console.log('   2. Check if the port is correct (default: 3001)');
        console.log('   3. Verify your .env file is configured');
        process.exit(1);
    }
}

// Run tests
testBackend(); 