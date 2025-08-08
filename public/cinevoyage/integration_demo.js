'use client';

/*
 * Integration Demo - Supabase Backend & Location Scraping Service
 *
 * This file provides the Supabase client configuration and location scraping
 * service that the main React app depends on.
 */

import { createClient } from '@supabase/supabase-js';

// Supabase configuration with validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

// Validate URL format
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Create Supabase client with proper validation
let supabase = null;
try {
  if (isValidUrl(supabaseUrl) && supabaseAnonKey !== 'placeholder-anon-key') {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } else {
    // Create a mock client that doesn't make real API calls
    supabase = {
      from: () => ({
        select: () => ({ data: [], error: null }),
        insert: () => ({ data: null, error: null }),
        update: () => ({ data: null, error: null }),
        delete: () => ({ data: null, error: null }),
        eq: () => ({ data: [], error: null }),
        single: () => ({ data: null, error: null })
      }),
      channel: () => ({
        on: () => ({ subscribe: () => {} }),
        subscribe: () => {}
      }),
      removeChannel: () => {}
    };
  }
} catch (error) {
  console.warn('Supabase initialization failed, using mock client:', error);
  // Fallback mock client
  supabase = {
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => Promise.resolve({ data: null, error: null }),
      delete: () => Promise.resolve({ data: null, error: null }),
      eq: () => Promise.resolve({ data: [], error: null }),
      single: () => Promise.resolve({ data: null, error: null })
    }),
    channel: () => ({
      on: () => ({ subscribe: () => {} }),
      subscribe: () => {}
    }),
    removeChannel: () => {}
  };
}

export { supabase };

// Mock location scraper service
export const locationScraper = {
  async enrichMovieWithLocations(movieId, title, year) {
    // This would normally make API calls to scrape location data
    // For now, returning mock data based on popular movies
    
    const mockData = {
      'The Dark Knight': [
        {
          name: 'Willis Tower (Sears Tower)',
          city: 'Chicago',
          country: 'USA',
          latitude: 41.8789,
          longitude: -87.6359,
          scene_description: 'Used for exterior shots of Wayne Enterprises headquarters'
        },
        {
          name: 'Lower Wacker Drive',
          city: 'Chicago', 
          country: 'USA',
          latitude: 41.8868,
          longitude: -87.6347,
          scene_description: 'The dramatic truck flip scene during the chase'
        }
      ],
      'Forrest Gump': [
        {
          name: 'Chippewa Square',
          city: 'Savannah',
          country: 'USA', 
          latitude: 32.0719,
          longitude: -81.0912,
          scene_description: 'Where Forrest sits on a bench telling his life story'
        },
        {
          name: 'Marshall Point Lighthouse',
          city: 'Port Clyde',
          country: 'USA',
          latitude: 43.9156,
          longitude: -69.2617,
          scene_description: 'The lighthouse Forrest runs to on his cross-country journey'
        }
      ],
      'Pulp Fiction': [
        {
          name: 'Hawthorne Grill',
          city: 'Hawthorne',
          country: 'USA',
          latitude: 33.9164,
          longitude: -118.3526,
          scene_description: 'The diner used for opening and closing scenes'
        }
      ],
      'Inception': [
        {
          name: 'Château de Fontainebleau',
          city: 'Paris',
          country: 'France',
          latitude: 48.4021,
          longitude: 2.6999,
          scene_description: 'Dream fortress scenes in the elaborate palace'
        },
        {
          name: 'Pont de Bir-Hakeim',
          city: 'Paris',
          country: 'France',
          latitude: 48.8564,
          longitude: 2.2879,
          scene_description: 'Bridge where Ariadne learns to manipulate the dream world'
        }
      ],
      'Spider-Man': [
        {
          name: 'Times Square',
          city: 'New York',
          country: 'USA',
          latitude: 40.7580,
          longitude: -73.9855,
          scene_description: 'Various NYC action sequences and web-slinging scenes'
        },
        {
          name: 'Brooklyn Bridge',
          city: 'New York',
          country: 'USA',
          latitude: 40.7061,
          longitude: -73.9969,
          scene_description: 'Iconic Spider-Man web-slinging and rescue scenes'
        }
      ]
    };

    // Return mock data if available, otherwise empty array
    return mockData[title] || [];
  }
};