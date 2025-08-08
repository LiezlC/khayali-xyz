'use client';

/**
 * Multi-tier AI Service with automatic fallback
 * 
 * Supports multiple AI providers with automatic switching based on:
 * - Available budget
 * - API availability
 * - User preferences
 * - Feature requirements
 */

// Service tiers configuration
const SERVICE_TIERS = {
  PREMIUM: {
    name: 'Premium',
    cost: 'High',
    features: ['Advanced AI', 'Image Generation', 'High Quality'],
    providers: ['gemini', 'openai']
  },
  STANDARD: {
    name: 'Standard', 
    cost: 'Medium',
    features: ['Good AI', 'Basic Image Gen', 'Reliable'],
    providers: ['openai', 'huggingface']
  },
  BUDGET: {
    name: 'Budget',
    cost: 'Low',
    features: ['Basic AI', 'Text Only', 'Free/Cheap'],
    providers: ['huggingface', 'mock']
  },
  DEMO: {
    name: 'Demo',
    cost: 'Free',
    features: ['Mock Data', 'Full Features', 'No API Keys'],
    providers: ['mock']
  }
};

class AIService {
  constructor() {
    this.currentTier = this.detectBestTier();
    this.budgetTracker = new BudgetTracker();
    this.providers = {
      gemini: new GeminiProvider(),
      openai: new OpenAIProvider(), 
      huggingface: new HuggingFaceProvider(),
      mock: new MockProvider()
    };
  }

  detectBestTier() {
    // Auto-detect best available tier based on API keys
    const hasGemini = !!process.env.NEXT_PUBLIC_GEMINI_API_KEY && 
                     process.env.NEXT_PUBLIC_GEMINI_API_KEY !== 'your_gemini_api_key_here';
    const hasOpenAI = !!process.env.NEXT_PUBLIC_OPENAI_API_KEY && 
                     process.env.NEXT_PUBLIC_OPENAI_API_KEY !== 'your_openai_api_key_here';
    const hasHuggingFace = !!process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY && 
                          process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY !== 'your_huggingface_api_key_here';

    if (hasGemini || hasOpenAI) return 'PREMIUM';
    if (hasOpenAI || hasHuggingFace) return 'STANDARD';
    if (hasHuggingFace) return 'BUDGET';
    return 'DEMO';
  }

  async findMovieLocations(movieTitle, movieYear, options = {}) {
    const tier = options.forceTier || this.currentTier;
    const providers = SERVICE_TIERS[tier].providers;

    for (const providerName of providers) {
      try {
        const provider = this.providers[providerName];
        if (await provider.isAvailable()) {
          const result = await provider.findMovieLocations(movieTitle, movieYear, options);
          this.budgetTracker.trackUsage(providerName, 'location_search', result.cost || 0);
          return { 
            ...result, 
            provider: providerName, 
            tier,
            remainingBudget: this.budgetTracker.getRemainingBudget()
          };
        }
      } catch (error) {
        console.warn(`Provider ${providerName} failed:`, error);
        continue;
      }
    }

    throw new Error('All providers failed for the current tier');
  }

  async generateSceneImage(sceneDescription, movieTitle, options = {}) {
    const tier = options.forceTier || this.currentTier;
    const providers = SERVICE_TIERS[tier].providers;

    for (const providerName of providers) {
      try {
        const provider = this.providers[providerName];
        if (await provider.supportsImageGeneration()) {
          const result = await provider.generateSceneImage(sceneDescription, movieTitle, options);
          this.budgetTracker.trackUsage(providerName, 'image_generation', result.cost || 0);
          return { 
            ...result, 
            provider: providerName, 
            tier,
            remainingBudget: this.budgetTracker.getRemainingBudget()
          };
        }
      } catch (error) {
        console.warn(`Provider ${providerName} failed for image generation:`, error);
        continue;
      }
    }

    throw new Error('No image generation available for current tier');
  }

  async getRecommendations(watchlist, options = {}) {
    const tier = options.forceTier || this.currentTier;
    const providers = SERVICE_TIERS[tier].providers;

    for (const providerName of providers) {
      try {
        const provider = this.providers[providerName];
        if (await provider.isAvailable()) {
          const result = await provider.getRecommendations(watchlist, options);
          this.budgetTracker.trackUsage(providerName, 'recommendations', result.cost || 0);
          return { 
            ...result, 
            provider: providerName, 
            tier,
            remainingBudget: this.budgetTracker.getRemainingBudget()
          };
        }
      } catch (error) {
        console.warn(`Provider ${providerName} failed for recommendations:`, error);
        continue;
      }
    }

    throw new Error('All providers failed for recommendations');
  }

  async getMovieRecommendationsForLocation(city, country, options = {}) {
    const tier = options.forceTier || this.currentTier;
    const providers = SERVICE_TIERS[tier].providers;

    for (const providerName of providers) {
      try {
        const provider = this.providers[providerName];
        if (await provider.isAvailable()) {
          const result = await provider.getMovieRecommendationsForLocation(city, country, options);
          this.budgetTracker.trackUsage(providerName, 'location_movie_recommendations', result.cost || 0);
          return { 
            ...result, 
            provider: providerName, 
            tier,
            remainingBudget: this.budgetTracker.getRemainingBudget()
          };
        }
      } catch (error) {
        console.warn(`Provider ${providerName} failed for location movie recommendations:`, error);
        continue;
      }
    }

    throw new Error('All providers failed for location movie recommendations');
  }

  getTierInfo() {
    return {
      current: this.currentTier,
      available: Object.keys(SERVICE_TIERS).map(key => ({
        id: key,
        ...SERVICE_TIERS[key]
      })),
      budget: this.budgetTracker.getBudgetStatus()
    };
  }

  switchTier(newTier) {
    if (SERVICE_TIERS[newTier]) {
      this.currentTier = newTier;
      localStorage.setItem('cinevoyage_tier', newTier);
    }
  }
}

// Budget tracking system
class BudgetTracker {
  constructor() {
    this.budget = this.loadBudget();
  }

  loadBudget() {
    const saved = localStorage.getItem('cinevoyage_budget');
    return saved ? JSON.parse(saved) : {
      monthly_limit: 10.0, // $10 default monthly budget
      current_spend: 0.0,
      usage_history: []
    };
  }

  trackUsage(provider, operation, cost) {
    this.budget.current_spend += cost;
    this.budget.usage_history.push({
      provider,
      operation,
      cost,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('cinevoyage_budget', JSON.stringify(this.budget));
  }

  getRemainingBudget() {
    return Math.max(0, this.budget.monthly_limit - this.budget.current_spend);
  }

  getBudgetStatus() {
    return {
      limit: this.budget.monthly_limit,
      spent: this.budget.current_spend,
      remaining: this.getRemainingBudget(),
      usage_history: this.budget.usage_history.slice(-10) // Last 10 uses
    };
  }
}

// Abstract base provider
class BaseProvider {
  async isAvailable() { return true; }
  async supportsImageGeneration() { return false; }
  async findMovieLocations(movieTitle, movieYear, options) { 
    throw new Error('Not implemented'); 
  }
  async generateSceneImage(sceneDescription, movieTitle, options) { 
    throw new Error('Not implemented'); 
  }
  async getRecommendations(watchlist, options) { 
    throw new Error('Not implemented'); 
  }
  async getMovieRecommendationsForLocation(city, country, options) { 
    throw new Error('Not implemented'); 
  }
}

// Gemini Provider (existing functionality)
class GeminiProvider extends BaseProvider {
  async isAvailable() {
    return !!process.env.NEXT_PUBLIC_GEMINI_API_KEY && 
           process.env.NEXT_PUBLIC_GEMINI_API_KEY !== 'your_gemini_api_key_here';
  }

  async supportsImageGeneration() { return true; }

  async findMovieLocations(movieTitle, movieYear, options) {
    const prompt = `Analyze the movie "${movieTitle}" (${movieYear}) and identify its key filming locations. For each location, provide the location name, city, country, and a brief description of the scene filmed there. Return as JSON array.`;
    
    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              name: { type: "STRING" },
              city: { type: "STRING" },
              country: { type: "STRING" },
              scene_description: { type: "STRING" }
            },
            required: ["name", "city", "country", "scene_description"]
          }
        }
      }
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) throw new Error('Gemini API failed');
    
    const result = await response.json();
    const textPart = result.candidates?.[0]?.content?.parts?.[0]?.text;
    
    return {
      locations: JSON.parse(textPart),
      cost: 0.01 // Estimated cost
    };
  }

  async generateSceneImage(sceneDescription, movieTitle, options) {
    // Implementation similar to existing code but with cost tracking
    const prompt = `A cinematic, photorealistic image of a scene: ${sceneDescription}. Style inspired by ${movieTitle}.`;
    
    // ... implementation details ...
    
    return {
      imageUrl: 'generated_image_url',
      cost: 0.05 // Estimated cost
    };
  }

  async getRecommendations(watchlist, options) {
    const movieTitles = watchlist.map(m => m.title).join(', ');
    const prompt = `Based on watchlist: ${movieTitles}, recommend 3 similar movies. Return as JSON array with title and reason.`;
    
    // ... implementation details ...
    
    return {
      recommendations: [],
      cost: 0.005
    };
  }

  async getMovieRecommendationsForLocation(city, country, options) {
    const prompt = `Recommend movies that were filmed in or feature ${city}, ${country}. Return as JSON array with objects containing: title, year, reason, and filming_locations.`;
    
    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              title: { type: "STRING" },
              year: { type: "NUMBER" },
              reason: { type: "STRING" },
              filming_locations: { 
                type: "ARRAY",
                items: { type: "STRING" }
              }
            },
            required: ["title", "year", "reason"]
          }
        }
      }
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) throw new Error('Gemini API failed');
    
    const result = await response.json();
    const textPart = result.candidates?.[0]?.content?.parts?.[0]?.text;
    
    return {
      movies: JSON.parse(textPart),
      cost: 0.01
    };
  }
}

// OpenAI Provider
class OpenAIProvider extends BaseProvider {
  async isAvailable() {
    return !!process.env.NEXT_PUBLIC_OPENAI_API_KEY && 
           process.env.NEXT_PUBLIC_OPENAI_API_KEY !== 'your_openai_api_key_here';
  }

  async supportsImageGeneration() { return true; }

  async findMovieLocations(movieTitle, movieYear, options) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'user',
          content: `List filming locations for the movie "${movieTitle}" (${movieYear}). Return only valid JSON array with objects having fields: name, city, country, scene_description.`
        }],
        temperature: 0.3
      })
    });

    if (!response.ok) throw new Error('OpenAI API failed');
    
    const result = await response.json();
    let content;
    try {
      content = JSON.parse(result.choices[0].message.content);
    } catch (e) {
      // Fallback parsing if JSON is malformed
      const locations = this.parseLocationText(result.choices[0].message.content);
      content = { locations };
    }
    
    return {
      locations: Array.isArray(content) ? content : (content.locations || []),
      cost: result.usage ? result.usage.total_tokens * 0.000002 : 0.002
    };
  }

  parseLocationText(text) {
    // Simple parsing of text into location objects  
    const lines = text.split('\n').filter(line => line.trim());
    return lines.slice(0, 5).map((line, index) => ({
      name: `Location ${index + 1}`,
      city: 'Various',
      country: 'USA',
      scene_description: line.trim().replace(/^\d+\.?\s*/, '') // Remove numbering
    }));
  }

  async generateSceneImage(sceneDescription, movieTitle, options) {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: `A cinematic scene: ${sceneDescription}. Style inspired by the movie ${movieTitle}.`,
        n: 1,
        size: '1024x1024',
        quality: 'standard'
      })
    });

    if (!response.ok) throw new Error('OpenAI DALL-E failed');
    
    const result = await response.json();
    
    return {
      imageUrl: result.data[0].url,
      cost: 0.02 // DALL-E 2 pricing
    };
  }

  async getRecommendations(watchlist, options) {
    const movieTitles = watchlist.map(m => m.title).join(', ');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'user',
          content: `Based on watchlist: ${movieTitles}, recommend 3 similar movies. Format: "Movie Title - Reason it's similar"`
        }],
        temperature: 0.3
      })
    });

    const result = await response.json();
    const recommendations = this.parseRecommendations(result.choices[0].message.content);
    
    return {
      recommendations,
      cost: result.usage ? result.usage.total_tokens * 0.000002 : 0.001
    };
  }

  async getMovieRecommendationsForLocation(city, country, options) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'user',
          content: `List movies that were filmed in or feature ${city}, ${country}. For each movie, provide: title (year) - brief reason why it's connected to this location - main filming locations. Format as separate lines.`
        }],
        temperature: 0.3
      })
    });

    if (!response.ok) throw new Error('OpenAI API failed');
    
    const result = await response.json();
    const movies = this.parseLocationMovies(result.choices[0].message.content);
    
    return {
      movies,
      cost: result.usage ? result.usage.total_tokens * 0.000002 : 0.002
    };
  }

  parseRecommendations(text) {
    const lines = text.split('\n').filter(line => line.trim() && line.includes('-'));
    return lines.slice(0, 3).map(line => {
      const [title, ...reasonParts] = line.split('-');
      return {
        title: title.trim().replace(/^\d+\.?\s*/, ''),
        reason: reasonParts.join('-').trim()
      };
    });
  }

  parseLocationMovies(text) {
    const lines = text.split('\n').filter(line => line.trim());
    return lines.slice(0, 5).map((line, index) => {
      const match = line.match(/^(.+?)\s*\((\d{4})\)\s*-\s*(.+?)\s*-?\s*(.*)$/);
      if (match) {
        return {
          title: match[1].trim(),
          year: parseInt(match[2]),
          reason: match[3].trim(),
          filming_locations: match[4] ? [match[4].trim()] : []
        };
      }
      return {
        title: `Movie ${index + 1}`,
        year: 2020,
        reason: line.trim(),
        filming_locations: []
      };
    });
  }
}

// Hugging Face Provider (Free/Budget tier)
class HuggingFaceProvider extends BaseProvider {
  async isAvailable() {
    return !!process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY && 
           process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY !== 'your_huggingface_api_key_here';
  }

  async supportsImageGeneration() { return true; }

  async findMovieLocations(movieTitle, movieYear, options) {
    // Use a free text generation model
    const response = await fetch(
      'https://api-inference.huggingface.co/models/microsoft/DialoGPT-large',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: `List filming locations for the movie ${movieTitle} (${movieYear}):`,
          parameters: { max_new_tokens: 200 }
        })
      }
    );

    if (!response.ok) throw new Error('HuggingFace API failed');
    
    const result = await response.json();
    
    // Parse the text response into structured data
    const locations = this.parseLocationText(result[0]?.generated_text || '');
    
    return {
      locations,
      cost: 0 // Free tier
    };
  }

  parseLocationText(text) {
    // Simple parsing of text into location objects
    const lines = text.split('\n').filter(line => line.trim());
    return lines.slice(0, 3).map((line, index) => ({
      name: `Location ${index + 1}`,
      city: 'Unknown',
      country: 'Unknown', 
      scene_description: line.trim()
    }));
  }

  async generateSceneImage(sceneDescription, movieTitle, options) {
    // Use Stable Diffusion via HuggingFace
    const response = await fetch(
      'https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: `cinematic scene: ${sceneDescription}, movie style: ${movieTitle}`
        })
      }
    );

    if (!response.ok) throw new Error('HuggingFace image generation failed');
    
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    
    return {
      imageUrl,
      cost: 0 // Free tier
    };
  }

  async getRecommendations(watchlist, options) {
    // Use free text model for recommendations
    const movieTitles = watchlist.map(m => m.title).join(', ');
    
    const response = await fetch(
      'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: `Recommend movies similar to: ${movieTitles}`
        })
      }
    );

    const result = await response.json();
    
    return {
      recommendations: this.parseRecommendations(result[0]?.generated_text || ''),
      cost: 0
    };
  }

  async getMovieRecommendationsForLocation(city, country, options) {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/microsoft/DialoGPT-large',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: `Movies filmed in ${city}, ${country}:`,
          parameters: { max_new_tokens: 150 }
        })
      }
    );

    if (!response.ok) throw new Error('HuggingFace API failed');
    
    const result = await response.json();
    const movies = this.parseLocationMovies(result[0]?.generated_text || '');
    
    return {
      movies,
      cost: 0
    };
  }

  parseRecommendations(text) {
    const movies = text.split(',').slice(0, 3);
    return movies.map(movie => ({
      title: movie.trim(),
      reason: 'Similar genre and style'
    }));
  }

  parseLocationMovies(text) {
    const movies = text.split(',').slice(0, 4);
    return movies.map((movie, index) => ({
      title: movie.trim(),
      year: 2020 - index,
      reason: 'Filmed at this location',
      filming_locations: []
    }));
  }
}

// Mock Provider (Demo/Offline mode)
class MockProvider extends BaseProvider {
  async isAvailable() { return true; }
  async supportsImageGeneration() { return true; }

  async findMovieLocations(movieTitle, movieYear, options) {
    // Extended mock data
    const mockLocations = {
      'The Dark Knight': [
        { name: 'Willis Tower', city: 'Chicago', country: 'USA', scene_description: 'Wayne Enterprises headquarters exterior shots' },
        { name: 'Lower Wacker Drive', city: 'Chicago', country: 'USA', scene_description: 'Dramatic truck flip chase scene' },
        { name: 'Berghoff Restaurant', city: 'Chicago', country: 'USA', scene_description: 'Major Crimes Unit arrests mobsters' }
      ],
      'Forrest Gump': [
        { name: 'Chippewa Square', city: 'Savannah', country: 'USA', scene_description: 'Forrest tells his story on the bench' },
        { name: 'Lincoln Memorial', city: 'Washington D.C.', country: 'USA', scene_description: 'Anti-war rally speech scene' },
        { name: 'Marshall Point Lighthouse', city: 'Port Clyde', country: 'USA', scene_description: 'Cross-country running turnaround point' }
      ],
      'Pulp Fiction': [
        { name: 'Hawthorne Grill', city: 'Hawthorne', country: 'USA', scene_description: 'Opening and closing diner scenes' },
        { name: 'Jack Rabbit Slims', city: 'Los Angeles', country: 'USA', scene_description: 'Vincent and Mia dance contest' }
      ],
      'The Shawshank Redemption': [
        { name: 'Ohio State Reformatory', city: 'Mansfield', country: 'USA', scene_description: 'Main prison building and scenes' },
        { name: 'Pugh Cabin', city: 'Lucas', country: 'USA', scene_description: 'Opening scene with Andy in car' }
      ],
      'Inception': [
        { name: 'Château de Fontainebleau', city: 'Paris', country: 'France', scene_description: 'Dream fortress scenes' },
        { name: 'Tokyo streets', city: 'Tokyo', country: 'Japan', scene_description: 'Opening saito limousine sequence' }
      ],
      'default': [
        { name: 'Generic Studio Lot', city: 'Los Angeles', country: 'USA', scene_description: 'Standard movie studio filming location' },
        { name: 'Local Theater', city: 'Various', country: 'USA', scene_description: 'Interior scenes filmed at local venues' }
      ]
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const locations = mockLocations[movieTitle] || mockLocations['default'];
    
    return {
      locations,
      cost: 0
    };
  }

  async generateSceneImage(sceneDescription, movieTitle, options) {
    // Generate placeholder image
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const colors = ['e74c3c', '3498db', '2c3e50', '27ae60', 'f39c12'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    return {
      imageUrl: `https://placehold.co/400x300/${color}/ffffff?text=${encodeURIComponent(movieTitle + ' Scene')}`,
      cost: 0
    };
  }

  async getRecommendations(watchlist, options) {
    const allRecommendations = [
      { title: 'The Godfather', reason: 'Classic crime drama with excellent storytelling' },
      { title: 'Goodfellas', reason: 'Another masterpiece in the crime genre' },
      { title: 'Casablanca', reason: 'Timeless romantic drama' },
      { title: 'Citizen Kane', reason: 'Revolutionary cinematography and narrative' },
      { title: 'Vertigo', reason: 'Psychological thriller masterwork' },
      { title: '2001: A Space Odyssey', reason: 'Groundbreaking science fiction' },
      { title: 'Apocalypse Now', reason: 'Epic war film with stunning visuals' },
      { title: 'Taxi Driver', reason: 'Character study of urban alienation' }
    ];

    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return random 3 recommendations
    const shuffled = allRecommendations.sort(() => 0.5 - Math.random());
    
    return {
      recommendations: shuffled.slice(0, 3),
      cost: 0
    };
  }

  async getMovieRecommendationsForLocation(city, country, options) {
    // Location-specific movie database
    const locationMovies = {
      'Paris': [
        { title: 'Amélie', year: 2001, reason: 'Iconic Parisian romance filmed at Montmartre', filming_locations: ['Montmartre', 'Café des Deux Moulins'] },
        { title: 'The Da Vinci Code', year: 2006, reason: 'Thriller featuring the Louvre Museum', filming_locations: ['Louvre Museum', 'Saint-Sulpice'] },
        { title: 'Midnight in Paris', year: 2011, reason: 'Woody Allen love letter to the city', filming_locations: ['Seine River', 'Palace of Versailles'] },
        { title: 'Inception', year: 2010, reason: 'Dream sequences filmed at Trocadéro', filming_locations: ['Pont de Bir-Hakeim', 'Trocadéro'] }
      ],
      'New York': [
        { title: 'Spider-Man', year: 2002, reason: 'Classic superhero movie set in NYC', filming_locations: ['Times Square', 'Brooklyn Bridge'] },
        { title: 'Taxi Driver', year: 1976, reason: 'Iconic NYC character study', filming_locations: ['Manhattan streets', 'Upper West Side'] },
        { title: 'The Avengers', year: 2012, reason: 'Epic superhero battle in Manhattan', filming_locations: ['Park Avenue', 'Grand Central Terminal'] },
        { title: 'When Harry Met Sally', year: 1989, reason: 'Romantic comedy across NYC landmarks', filming_locations: ['Katz\'s Delicatessen', 'Central Park'] }
      ],
      'London': [
        { title: 'Notting Hill', year: 1999, reason: 'Romance in the charming London neighborhood', filming_locations: ['Portobello Road', 'The Blue Door'] },
        { title: 'Harry Potter', year: 2001, reason: 'Magical London locations', filming_locations: ['Platform 9¾', 'Leadenhall Market'] },
        { title: 'Love Actually', year: 2003, reason: 'Multiple love stories across London', filming_locations: ['Heathrow Airport', '10 Downing Street'] },
        { title: 'Skyfall', year: 2012, reason: 'James Bond action in London', filming_locations: ['National Gallery', 'MI6 Building'] }
      ],
      'Chicago': [
        { title: 'The Dark Knight', year: 2008, reason: 'Batman epic using Chicago as Gotham', filming_locations: ['Willis Tower', 'Lower Wacker Drive'] },
        { title: 'Ferris Bueller\'s Day Off', year: 1986, reason: 'Classic teen comedy tour of Chicago', filming_locations: ['Art Institute', 'Wrigley Field'] },
        { title: 'The Untouchables', year: 1987, reason: 'Prohibition-era crime drama', filming_locations: ['Union Station', 'Chicago Theater'] },
        { title: 'Transformers: Dark of the Moon', year: 2011, reason: 'Robot battles in downtown Chicago', filming_locations: ['LaSalle Street', 'Trump Tower'] }
      ]
    };

    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Find movies for the specific city, or use generic recommendations
    const cityMovies = locationMovies[city] || [
      { title: 'Local Hero', year: 2020, reason: `Generic movie set in ${city}`, filming_locations: [`${city} downtown`] },
      { title: 'City Adventure', year: 2019, reason: `Adventure film featuring ${city}`, filming_locations: [`${city} landmarks`] },
      { title: 'The Journey', year: 2018, reason: `Travel movie showcasing ${country}`, filming_locations: [`${city}, ${country}`] }
    ];
    
    return {
      movies: cityMovies.slice(0, 4),
      cost: 0
    };
  }
}

// Export singleton instance
export default new AIService();