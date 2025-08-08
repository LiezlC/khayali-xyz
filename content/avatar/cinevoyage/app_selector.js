'use client';

/**
 * App Version Selector
 * 
 * Allows users to easily switch between different versions of CineVoyage:
 * - Original Firebase version
 * - Supabase integration version  
 * - Multi-tier AI version
 * - Pure demo mode
 */

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import ErrorBoundary from './components/ErrorBoundary';

// Dynamic imports to prevent SSR issues
const CineVoyageGem = dynamic(() => import('./cinevoyage_gem'), { 
  ssr: false
});
const CineVoyageSupabase = dynamic(() => import('./integration_demo_app'), { 
  ssr: false
});
const MultiTierCineVoyage = dynamic(() => import('./multi_tier_app'), { 
  ssr: false
});

const APP_VERSIONS = {
  demo: {
    name: 'Demo Mode',
    description: 'Full featured demo with mock data - no API keys needed',
    component: MultiTierCineVoyage,
    tier: 'DEMO',
    features: ['Mock Data', 'All Features', 'No Setup Required'],
    setup: 'Ready to use immediately'
  },
  multitier: {
    name: 'Multi-Tier AI',
    description: 'Advanced version with multiple AI providers and automatic fallback',
    component: MultiTierCineVoyage,
    tier: 'AUTO',
    features: ['OpenAI', 'HuggingFace', 'Gemini', 'Budget Tracking', 'Auto-fallback'],
    setup: 'Configure API keys as needed'
  },
  firebase: {
    name: 'Firebase Original',
    description: 'Original version with Firebase backend and Gemini AI',
    component: CineVoyageGem,
    tier: 'PREMIUM',
    features: ['Firebase Auth', 'Firestore', 'Gemini AI', 'Image Generation'],
    setup: 'Requires Firebase & Gemini setup'
  },
  supabase: {
    name: 'Supabase Integration',
    description: 'Alternative backend using Supabase with simplified interface',
    component: CineVoyageSupabase,
    tier: 'STANDARD',
    features: ['Supabase DB', 'PostgreSQL', 'Real-time sync'],
    setup: 'Requires Supabase setup'
  }
};

const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500"></div>
  </div>
);

export default function AppSelector() {
  const [selectedVersion, setSelectedVersion] = useState('demo'); // Start with demo
  const [showSelector, setShowSelector] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const SelectedApp = APP_VERSIONS[selectedVersion].component;

  // Show loading only briefly during hydration
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!showSelector) {
    return (
      <ErrorBoundary>
        <div>
          {/* Floating version switcher */}
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={() => setShowSelector(true)}
              className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg shadow-lg text-sm border border-gray-600"
            >
              Switch Version ({APP_VERSIONS[selectedVersion].name})
            </button>
          </div>
          <SelectedApp />
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 p-8">
        <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            🎬 CineVoyage
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Movie Location Discovery & Travel Planning
          </p>
          <p className="text-gray-400">
            Choose your experience level and preferred backend
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {Object.entries(APP_VERSIONS).map(([key, version]) => (
            <div
              key={key}
              className={`p-6 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                selectedVersion === key
                  ? 'border-indigo-500 bg-indigo-900/50 shadow-lg shadow-indigo-500/25'
                  : 'border-gray-600 bg-gray-800/50 hover:border-gray-500 hover:bg-gray-800/70'
              }`}
              onClick={() => setSelectedVersion(key)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {version.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTierBadgeColor(version.tier)}`}>
                      {version.tier}
                    </span>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedVersion === key 
                    ? 'border-indigo-500 bg-indigo-500' 
                    : 'border-gray-400'
                }`}>
                  {selectedVersion === key && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">
                {version.description}
              </p>
              
              <div className="mb-4">
                <div className="text-sm font-semibold text-gray-400 mb-2">Features:</div>
                <div className="flex flex-wrap gap-2">
                  {version.features.map((feature, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-gray-700 text-gray-300 rounded-md text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="text-sm text-gray-400">
                <strong>Setup:</strong> {version.setup}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => setShowSelector(false)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors shadow-lg"
            disabled={!selectedVersion}
          >
            Launch {APP_VERSIONS[selectedVersion].name} →
          </button>
          
          <div className="mt-6 p-4 bg-gray-800/50 rounded-lg max-w-2xl mx-auto">
            <h4 className="font-semibold text-white mb-2">Quick Start Guide:</h4>
            <div className="text-sm text-gray-300 text-left space-y-1">
              <div><strong>Demo Mode:</strong> Works immediately - perfect for testing and presentations</div>
              <div><strong>Multi-Tier:</strong> Automatically detects available APIs and falls back gracefully</div>
              <div><strong>Firebase:</strong> Full-featured with authentication and real-time sync</div>
              <div><strong>Supabase:</strong> Modern PostgreSQL backend with real-time features</div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

const getTierBadgeColor = (tier) => {
  const colors = {
    DEMO: 'bg-purple-600 text-purple-100',
    AUTO: 'bg-blue-600 text-blue-100', 
    PREMIUM: 'bg-yellow-600 text-yellow-100',
    STANDARD: 'bg-green-600 text-green-100'
  };
  return colors[tier] || 'bg-gray-600 text-gray-100';
};