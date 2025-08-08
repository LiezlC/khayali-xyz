# CineVoyage Multi-Tier AI System

## Overview

CineVoyage now features a sophisticated multi-tier AI system that automatically adapts to your budget, API availability, and feature requirements. The system seamlessly switches between different AI providers and gracefully falls back to ensure you always get the best possible experience.

## 🎭 Available Tiers

### 🏆 Premium Tier
- **Providers**: Gemini AI, OpenAI GPT-4
- **Cost**: High ($0.01-0.10 per request)
- **Features**: 
  - Advanced AI reasoning
  - High-quality image generation
  - Detailed location analysis
  - Smart recommendations
- **Best for**: Production apps, maximum quality

### ⚡ Standard Tier  
- **Providers**: OpenAI GPT-3.5, Hugging Face Pro
- **Cost**: Medium ($0.001-0.01 per request)
- **Features**:
  - Good AI performance
  - Basic image generation
  - Reliable results
- **Best for**: Regular use, balanced cost/quality

### 💰 Budget Tier
- **Providers**: Hugging Face Free, Gemini Flash
- **Cost**: Low/Free ($0-0.005 per request)
- **Features**:
  - Basic AI capabilities
  - Limited image generation
  - Text-based responses
- **Best for**: Learning, testing, tight budgets

### 🎮 Demo Tier
- **Providers**: Mock data service
- **Cost**: Free
- **Features**:
  - Full UI functionality
  - Realistic mock responses  
  - No API keys needed
  - Perfect for presentations
- **Best for**: Demos, development, testing

## 🚀 Quick Start

### Instant Demo Mode (0 setup)
1. Start the app - it automatically detects no API keys
2. Runs in Demo mode with full mock data
3. Experience all features without any configuration

### Budget Mode (Free APIs)
```bash
# Add to .env.local
NEXT_PUBLIC_HUGGINGFACE_API_KEY=hf_your_key_here
```
- Get free Hugging Face API key at [huggingface.co](https://huggingface.co/)
- Includes free text generation and image creation

### Standard Mode (Paid APIs)
```bash
# Add to .env.local  
NEXT_PUBLIC_OPENAI_API_KEY=sk-your_key_here
NEXT_PUBLIC_HUGGINGFACE_API_KEY=hf_your_key_here
```
- OpenAI GPT-3.5: ~$0.002 per 1K tokens
- Good balance of cost and quality

### Premium Mode (Best Quality)
```bash
# Add to .env.local
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key_here
NEXT_PUBLIC_OPENAI_API_KEY=sk-your_key_here
```
- Access to most advanced AI models
- Best quality results
- Higher cost per request

## 🎛️ How Automatic Tier Selection Works

The system automatically selects the best available tier based on:

1. **API Key Detection**: Scans environment variables
2. **Budget Constraints**: Checks remaining monthly budget  
3. **Feature Requirements**: Some features need specific providers
4. **Fallback Chain**: Always has a working option

### Fallback Chain Example:
```
Location Search Request
    ↓
1. Try Gemini (Premium) → API key missing
    ↓  
2. Try OpenAI GPT-4 (Premium) → Budget exceeded
    ↓
3. Try OpenAI GPT-3.5 (Standard) → Success! ✅
```

### Demo Fallback:
```
All APIs Failed
    ↓
Fallback to Mock Data → Always works! ✅
```

## 💡 Smart Features

### Budget Tracking
- Set monthly spending limits (default: $10)
- Track usage per provider and operation
- Auto-switch to cheaper tiers when approaching limits
- View spending history and cost breakdowns

### Cost Optimization
- Automatically chooses most cost-effective provider for each task
- Caches results to avoid duplicate API calls
- Uses free tiers when possible
- Falls back gracefully when budget exceeded

### Provider Health Monitoring
- Detects API outages and rate limits
- Automatically switches to backup providers
- Transparent error handling and user feedback

## 🔧 Configuration

### Environment Variables
```bash
# Premium Providers
NEXT_PUBLIC_GEMINI_API_KEY=your_key         # Google AI
NEXT_PUBLIC_OPENAI_API_KEY=sk-your_key      # OpenAI

# Budget Providers  
NEXT_PUBLIC_HUGGINGFACE_API_KEY=hf_key      # Hugging Face

# Backend Options
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_key      # Movie data
```

### Budget Settings (Optional)
```javascript
// In browser console or app settings
localStorage.setItem('cinevoyage_budget', JSON.stringify({
  monthly_limit: 25.0,      // $25 monthly budget
  current_spend: 0.0,       // Current spend
  usage_history: []         // Usage tracking
}));
```

## 🎨 UI Features

### Tier Selector
- Visual tier selection in header
- Real-time budget display
- Cost/feature comparison
- One-click tier switching

### Provider Transparency
- Shows which AI provider handled each request
- Displays actual cost per operation
- Real-time budget remaining indicator
- Usage history and analytics

### Status Indicators
- Current tier badge in header
- Provider status indicators
- Budget warnings and notifications
- Fallback status messages

## 🧪 Testing Different Tiers

### Test Demo Mode
1. Clear all API keys from .env.local
2. Reload app - should show "DEMO" tier
3. Try all features - should work with mock data

### Test Budget Mode  
1. Add only Hugging Face API key
2. Should auto-select "BUDGET" tier
3. Features work but with free/lower-quality AI

### Test Premium Mode
1. Add Gemini or OpenAI API key
2. Should auto-select "PREMIUM" tier  
3. Best quality AI responses and images

### Test Fallback Chain
1. Set very low budget limit ($0.01)
2. Make several requests until budget exceeded
3. Should automatically fall back to cheaper/free options
4. Finally falls back to demo mode if all paid options exhausted

## 📊 Cost Estimates

### Movie Location Search:
- **Gemini AI**: ~$0.01 per search
- **OpenAI GPT-4**: ~$0.05 per search  
- **OpenAI GPT-3.5**: ~$0.002 per search
- **Hugging Face**: Free (rate limited)
- **Mock Data**: Free

### Image Generation:
- **DALL-E 3**: $0.04 per image
- **Gemini Imagen**: ~$0.05 per image
- **Stable Diffusion (HF)**: Free
- **Mock Placeholder**: Free

### Recommendations:
- **GPT-4**: ~$0.02 per set of 3 movies
- **GPT-3.5**: ~$0.003 per set
- **Hugging Face**: Free
- **Mock Data**: Free

## 🚨 Error Handling

The system handles various failure scenarios:

- **API Key Invalid**: Falls back to next tier
- **Rate Limits**: Waits and retries or switches provider  
- **Budget Exceeded**: Switches to free options
- **Network Errors**: Retries with exponential backoff
- **All Providers Failed**: Uses mock data as final fallback

## 🔄 Version Comparison

| Feature | Original | Supabase | Multi-Tier |
|---------|----------|----------|------------|
| AI Providers | Gemini only | Mock data | 4+ providers |
| Fallback | None | Mock data | Smart cascade |
| Budget Control | No | No | Yes |
| Free Mode | No | Partial | Full demo |
| Cost Tracking | No | No | Detailed |
| Auto-switching | No | No | Yes |

## 🎯 Best Practices

1. **Start with Demo**: Test features before adding API keys
2. **Set Budgets**: Avoid unexpected charges
3. **Use Free Tiers**: Hugging Face for learning/testing
4. **Monitor Usage**: Check cost dashboard regularly
5. **Have Fallbacks**: Always keep demo mode available

## 🛠️ Development

### Adding New Providers
1. Create new provider class extending `BaseProvider`
2. Implement required methods (`findMovieLocations`, etc.)
3. Add to provider registry in `aiService.js`
4. Update tier configurations

### Custom Tiers
You can create custom tiers by modifying `SERVICE_TIERS` in `aiService.js`:

```javascript
CUSTOM: {
  name: 'Custom',
  cost: 'Variable',
  features: ['Your Features'],
  providers: ['your_provider', 'fallback_provider']
}
```

This multi-tier system ensures CineVoyage works for everyone - from developers testing new features to production deployments serving thousands of users, with costs and quality that scale appropriately.