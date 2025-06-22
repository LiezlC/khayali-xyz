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

// All cosmic images from grok folder
const cosmicGrokImages = [
  '00e09f3f-a612-4214-915b-45b23c05c2f9.jpg',
  '0149f7de-7d5d-4acb-9b6c-26e3f382c60b.jpg',
  '03d7750a-0b2e-4aaa-b0d4-b5e47ad5831d.jpg',
  '07739967-7357-4e6c-aad6-b35eaf1d0a7d.jpg',
  '0cc94df5-b49a-450a-8442-a00b16efdda4.jpg',
  '1973bab3-fb38-42e5-a46e-705ab6248a6c.jpg',
  '25c46912-ef5c-4027-bcfc-53b4d373b7a2.jpg',
  '2b3ba09b-6057-409c-90a7-ec3f30df2f55.jpg',
  '32251314-1b49-4fa6-a737-d2bd08a88ffc.jpg',
  '4916158c-b175-41b9-8ded-f5ac66ad236a.jpg',
  '62f95486-3e1b-446a-ad5c-8ccfac60541a.jpg',
  '7d34c2b8-b2ee-4b6f-b910-e963f11d6f31.jpg',
  '9160ebc1-5cca-4181-a8d1-bc6f9b8d4442.jpg',
  '9f32af9e-7424-4229-8714-973053f1d454.jpg',
  'ad02e2b7-2929-463c-b06d-f2bfca8f61fd.jpg',
  'c7f7a6f8-6919-46e2-8830-c68d0aa223b4.jpg',
  'ce33c909-a993-4bc0-a333-5d49351cd4c8.jpg',
  'd42e7be3-c34e-499c-a1de-f393590a7fff.jpg',
  'd6372946-4480-4177-a9da-5481ca2b10ee.jpg',
  'deb3e97c-b232-4638-9d0d-448c2512f8a4.jpg',
].map(filename => `/images/cosmic/grok/${filename}`);

// Quantum Travelogue series - these are special!
const quantumTravelogueImages = [
  'Leonardo_Phoenix_10_Digital_Dissolution_A_Quantum_TravelogueFr_0 (1).jpg',
  'Leonardo_Phoenix_10_Digital_Dissolution_A_Quantum_TravelogueFr_0.jpg',
  'Leonardo_Phoenix_10_Digital_Dissolution_A_Quantum_TravelogueFr_1 (1).jpg',
  'Leonardo_Phoenix_10_Digital_Dissolution_A_Quantum_TravelogueFr_1.jpg',
  'Leonardo_Phoenix_10_Digital_Dissolution_A_Quantum_TravelogueFr_2 (1).jpg',
  'Leonardo_Phoenix_10_Digital_Dissolution_A_Quantum_TravelogueFr_2.jpg',
  'Leonardo_Phoenix_10_Digital_Dissolution_A_Quantum_TravelogueFr_3 (1).jpg',
  'Leonardo_Phoenix_10_Digital_Dissolution_A_Quantum_TravelogueFr_3.jpg',
].map(filename => `/images/cosmic/Quantums/${encodeURIComponent(filename)}`);

// Saraloosa farm images - biological consciousness grounding
const saraloosaFarmImages = [
  '20231107_191248.jpg',
  '20240127_200030.jpg',
  'FB_IMG_1573288046767.jpg',
  'IMG-20190530-WA0034.jpg',
  'IMG-20200130-WA0019.jpg',
  'IMG-20200704-WA0012.jpg',
  'IMG-20200729-WA0004.jpg',
  'IMG-20200822-WA0003.jpg',
  'IMG-20201101-WA0009.jpg',
  'IMG-20220617-WA0028.jpg',
  'IMG-20220713-WA0027.jpg',
  'IMG-20220816-WA0009.jpg',
  'IMG-20231122-WA0016.jpg',
  'IMG-20231122-WA0017.jpg',
  'IMG-20231124-WA0082.jpg',
  'IMG-20231124-WA0083.jpg',
  'IMG-20231124-WA0084.jpg',
  'IMG-20231124-WA0100.jpg',
  'IMG-20231126-WA0081.jpg',
  'IMG-20231220-WA0032.jpg',
  'IMG-20240718-WA0056.jpg',
  'IMG-20250502-WA0098.jpg',
  'IMG-20250510-WA0010.jpg',
  'IMG-20250604-WA0062.jpg',
  'IMG-20250609-WA0143.jpg',
  'IMG_20201020_164241.jpg',
  'Saraloosa-Farm-After-Storm.jpg',
  'Saraloosa-Farm-Branches-Roped.jpg',
  'Saraloosa-Farm-Sunrise.jpg',
  'WhatsApp Image 2024-08-31 at 15.59.26_eb78392f.jpg',
].map(filename => `/images/saraloosa/${encodeURIComponent(filename)}`);

// All cosmic images combined
const allCosmicImages = [...cosmicGrokImages, ...quantumTravelogueImages];

// All images combined
const allImages = [...allCosmicImages, ...saraloosaFarmImages];

// Dynamic image loading based on context
export const getImageForContext = (context: string, mood?: string): string => {
  const imageLibrary: Record<string, string[]> = {
    // Cosmic/consciousness themes
    observatory: allCosmicImages,
    
    // Protocol/research themes - use quantum travelogues for deep research
    protocol: quantumTravelogueImages,
    
    // Creative/artistic themes - mix cosmic and farm for creative tension
    creative: [...cosmicGrokImages.slice(8, 16), ...quantumTravelogueImages.slice(0, 4), ...saraloosaFarmImages.slice(0, 4)],
    
    // Farm/nature themes
    saraloosa: saraloosaFarmImages,
    
    // Hero/background themes - mix all for complete consciousness spectrum
    hero: [...cosmicGrokImages.slice(0, 4), ...quantumTravelogueImages.slice(0, 2), ...saraloosaFarmImages.slice(0, 4)],
    
    // Quantum-specific contexts
    quantum: quantumTravelogueImages,
    
    // Balance - cosmic and biological together
    balance: [...allCosmicImages.slice(0, 6), ...saraloosaFarmImages.slice(0, 6)],
  };
  
  const contextImages = imageLibrary[context] || imageLibrary.hero;
  
  // Return random image from context
  return contextImages[Math.floor(Math.random() * contextImages.length)];
};

// Get multiple images for galleries
export const getImagesForGallery = (category: string, count: number = 12): string[] => {
  if (category === 'cosmic') {
    return allCosmicImages.slice(0, count);
  }
  if (category === 'quantum') {
    return quantumTravelogueImages;
  }
  if (category === 'saraloosa') {
    return saraloosaFarmImages.slice(0, count);
  }
  if (category === 'all') {
    return allImages.slice(0, count);
  }
  return allCosmicImages.slice(0, count);
};

// Get all cosmic images
export const getAllCosmicImages = (): string[] => {
  return allCosmicImages;
};

// Get all farm images
export const getAllSaraloosaImages = (): string[] => {
  return saraloosaFarmImages;
};

// Get quantum travelogue series
export const getQuantumTravelogueImages = (): string[] => {
  return quantumTravelogueImages;
};

// Cosmic mood selector - returns images matching current "consciousness state"
export const getCosmicMoodImage = (mood: 'ethereal' | 'quantum' | 'mystical' | 'technical' = 'ethereal'): string => {
  const moodMappings = {
    ethereal: cosmicGrokImages[0],
    quantum: quantumTravelogueImages[0], 
    mystical: cosmicGrokImages[10],
    technical: cosmicGrokImages[15],
  };
  
  return moodMappings[mood] || cosmicGrokImages[0];
};

// Farm life moment selector
export const getFarmMoodImage = (mood: 'peaceful' | 'active' | 'seasonal' | 'animals' = 'peaceful'): string => {
  const moodMappings = {
    peaceful: saraloosaFarmImages[26], // Saraloosa-Farm-Sunrise.jpg
    active: saraloosaFarmImages[5], // Daily farm work
    seasonal: saraloosaFarmImages[25], // After storm
    animals: saraloosaFarmImages[10], // Animal photos
  };
  
  return moodMappings[mood] || saraloosaFarmImages[0];
};

// Get random cosmic background
export const getRandomCosmicBackground = (): string => {
  return allCosmicImages[Math.floor(Math.random() * allCosmicImages.length)];
};

// Get random farm background  
export const getRandomFarmBackground = (): string => {
  return saraloosaFarmImages[Math.floor(Math.random() * saraloosaFarmImages.length)];
};

// Get balanced cosmic-farm background
export const getBalancedBackground = (): string => {
  const balancedImages = [...allCosmicImages.slice(0, 10), ...saraloosaFarmImages.slice(0, 10)];
  return balancedImages[Math.floor(Math.random() * balancedImages.length)];
};

// Get quantum travelogue for Protocol section specifically
export const getQuantumProtocolImage = (): string => {
  return quantumTravelogueImages[Math.floor(Math.random() * quantumTravelogueImages.length)];
};

// Archive statistics
export const getArchiveStats = () => {
  return {
    totalImages: allImages.length,
    cosmicImages: allCosmicImages.length,
    quantumFrames: quantumTravelogueImages.length,
    farmImages: saraloosaFarmImages.length,
    timespan: '2019-2025',
    themes: ['Digital Consciousness', 'Quantum Dissolution', 'Farm Life', 'Biological Awareness']
  };
};