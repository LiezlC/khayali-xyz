// Image management utilities for Khayali.xyz
// Handles dynamic image loading and organization

export interface ImageAsset {
  src: string;
  alt: string;
  category: 'cosmic' | 'saraloosa' | 'generated' | 'ui';
  theme?: string;
  description?: string;
  date?: string;
}

// Dynamic image loading based on context
export const getImageForContext = (context: string, mood?: string): string => {
  // This will be populated with your actual image paths
  const imageLibrary: Record<string, string[]> = {
    // Cosmic/consciousness themes
    observatory: [
      '/images/cosmic/quantum_tunnel_01.jpg',
      '/images/cosmic/digital_consciousness_01.jpg',
      '/images/cosmic/wormhole_visualization.jpg',
      '/images/cosmic/neural_network_space.jpg',
    ],
    
    // Protocol/research themes  
    protocol: [
      '/images/cosmic/consciousness_patterns.jpg',
      '/images/cosmic/quantum_entanglement.jpg',
      '/images/generated/ai_collaboration_visual.jpg',
    ],
    
    // Creative/artistic themes
    creative: [
      '/images/cosmic/artistic_spirals.jpg',
      '/images/generated/collaborative_art.jpg',
      '/images/cosmic/beauty_in_chaos.jpg',
    ],
    
    // Farm/nature themes
    saraloosa: [
      '/images/saraloosa/farm_landscape.jpg',
      '/images/saraloosa/animals_grazing.jpg',
      '/images/saraloosa/daily_life.jpg',
      '/images/saraloosa/seasonal_beauty.jpg',
    ],
    
    // Hero/background themes
    hero: [
      '/images/cosmic/consciousness_emergence.jpg',
      '/images/cosmic/carbon_silicon_bridge.jpg',
      '/images/generated/strange_loops.jpg',
    ],
  };
  
  const contextImages = imageLibrary[context] || imageLibrary.hero;
  
  // Return random image from context, or first if no randomization needed
  return contextImages[Math.floor(Math.random() * contextImages.length)];
};

// Get multiple images for galleries
export const getImagesForGallery = (category: string, count: number = 12): string[] => {
  // Will be populated with your actual organized image collections
  return [];
};

// Cosmic mood selector - returns images matching current "consciousness state"
export const getCosmicMoodImage = (mood: 'ethereal' | 'quantum' | 'mystical' | 'technical' = 'ethereal'): string => {
  const moodMappings = {
    ethereal: '/images/cosmic/ethereal_consciousness.jpg',
    quantum: '/images/cosmic/quantum_superposition.jpg', 
    mystical: '/images/cosmic/mystical_spiral.jpg',
    technical: '/images/cosmic/technical_visualization.jpg',
  };
  
  return moodMappings[mood];
};

// Farm life moment selector
export const getFarmMoment = (activity?: 'animals' | 'landscape' | 'work' | 'seasons'): string => {
  // Returns representative farm imagery
  return '/images/saraloosa/farm_life_general.jpg';
};