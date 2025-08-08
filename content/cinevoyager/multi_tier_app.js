'use client';

/**
 * Multi-Tier CineVoyage App
 * 
 * Enhanced version with multiple AI providers, automatic tier switching,
 * budget tracking, and seamless fallback between premium, standard, budget, and demo modes.
 */

import React, { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from './integration_demo';
import aiService from './services/aiService';

// Create context for AI service and tier management
const AIServiceContext = createContext(null);

const AIServiceProvider = ({ children }) => {
  const [tierInfo, setTierInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTierInfo(aiService.getTierInfo());
  }, []);

  const refreshTierInfo = () => {
    setTierInfo(aiService.getTierInfo());
  };

  const switchTier = (newTier) => {
    aiService.switchTier(newTier);
    refreshTierInfo();
  };

  return (
    <AIServiceContext.Provider value={{ 
      aiService, 
      tierInfo, 
      refreshTierInfo, 
      switchTier,
      isLoading,
      setIsLoading
    }}>
      {children}
    </AIServiceContext.Provider>
  );
};

const useAIService = () => useContext(AIServiceContext);

// Watchlist Context
const WatchlistContext = createContext(null);

const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([
    { id: 1, movie_id: 1, title: 'The Dark Knight', poster_url: 'https://placehold.co/300x450/1a1a2e/ffffff?text=The+Dark+Knight', release_date: '2008-07-18', rating: 0, status: 'to-watch' },
    { id: 2, movie_id: 2, title: 'Inception', poster_url: 'https://placehold.co/300x450/16213e/ffffff?text=Inception', release_date: '2010-07-16', rating: 0, status: 'to-watch' },
    { id: 3, movie_id: 3, title: 'Interstellar', poster_url: 'https://placehold.co/300x450/0f3460/ffffff?text=Interstellar', release_date: '2014-11-07', rating: 0, status: 'to-watch' }
  ]);

  const addToWatchlist = (movie) => {
    const newItem = {
      id: Date.now(),
      movie_id: movie.id,
      title: movie.title,
      poster_url: movie.poster_url,
      release_date: movie.release_date,
      rating: 0,
      status: 'to-watch'
    };
    setWatchlist([...watchlist, newItem]);
  };

  const updateRating = (id, newRating) => {
    setWatchlist(prev => prev.map(movie => {
      if (movie.id === id) {
        const wasUnrated = movie.rating === 0;
        const updatedMovie = { ...movie, rating: newRating, status: 'watched' };
        
        // Show a brief notification when first rating enables the button
        if (wasUnrated && newRating > 0) {
          setTimeout(() => {
            const button = document.querySelector(`[data-movie-id="${id}"] .location-button`);
            if (button) {
              button.classList.add('animate-pulse', 'ring-2', 'ring-green-400');
              setTimeout(() => {
                button.classList.remove('animate-pulse', 'ring-2', 'ring-green-400');
              }, 2000);
            }
          }, 100);
        }
        
        return updatedMovie;
      }
      return movie;
    }));
  };

  const removeFromWatchlist = (id) => {
    setWatchlist(prev => prev.filter(movie => movie.id !== id));
  };

  return (
    <WatchlistContext.Provider value={{
      watchlist,
      addToWatchlist,
      updateRating,
      removeFromWatchlist
    }}>
      {children}
    </WatchlistContext.Provider>
  );
};

const useWatchlist = () => useContext(WatchlistContext);

// Enhanced Header with Tier Selection
const EnhancedHeader = ({ onNavigate }) => {
  const { tierInfo, switchTier } = useAIService();
  const [showTierSelector, setShowTierSelector] = useState(false);

  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Icon name="movie" className="h-8 w-8 text-indigo-400" />
            <h1 className="text-2xl font-bold ml-3 text-gray-100">CineVoyage</h1>
            <div className="ml-4 px-2 py-1 bg-gray-700 rounded-full text-xs">
              <span className="text-gray-300">Mode: </span>
              <span className={`font-semibold ${getTierColor(tierInfo?.current)}`}>
                {tierInfo?.current || 'Loading...'}
              </span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => onNavigate('watchlist')} 
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Movie Watchlist
            </button>
            <button 
              onClick={() => onNavigate('travel')} 
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Travel Planner
            </button>
            
            {/* Tier Selector */}
            <div className="relative">
              <button
                onClick={() => setShowTierSelector(!showTierSelector)}
                className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                <Icon name="settings" className="h-4 w-4 mr-1" />
                AI Settings
              </button>
              
              {showTierSelector && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-md shadow-lg z-50 border border-gray-600">
                  <div className="p-4">
                    <h3 className="font-bold text-white mb-3">AI Service Tier</h3>
                    
                    {tierInfo?.available.map(tier => (
                      <div 
                        key={tier.id}
                        className={`p-3 mb-2 rounded-md cursor-pointer border-2 transition-colors ${
                          tierInfo.current === tier.id 
                            ? 'border-indigo-500 bg-indigo-900/50' 
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                        onClick={() => switchTier(tier.id)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold text-white">{tier.name}</div>
                            <div className="text-xs text-gray-400">Cost: {tier.cost}</div>
                          </div>
                          <div className="text-right">
                            {tierInfo.current === tier.id && (
                              <div className="text-xs text-green-400">✓ Active</div>
                            )}
                          </div>
                        </div>
                        <div className="text-xs text-gray-300 mt-1">
                          {tier.features.join(' • ')}
                        </div>
                      </div>
                    ))}
                    
                    {tierInfo?.budget && (
                      <div className="mt-4 pt-3 border-t border-gray-600">
                        <div className="text-xs text-gray-400">
                          Budget: ${tierInfo.budget.spent.toFixed(2)} / ${tierInfo.budget.limit.toFixed(2)}
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                          <div 
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: `${Math.min(100, (tierInfo.budget.spent / tierInfo.budget.limit) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="px-4 pb-4">
                    <button 
                      onClick={() => setShowTierSelector(false)}
                      className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md text-sm"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

// Enhanced Location Scraper with Multi-Provider Support
const EnhancedLocationScraperPage = ({ movie, onNavigate }) => {
  const { aiService, tierInfo, isLoading, setIsLoading } = useAIService();
  const { openTripModal } = useTrips();
  const [locations, setLocations] = useState([]);
  const [status, setStatus] = useState('idle');
  const [processingMessage, setProcessingMessage] = useState('');
  const [lastResult, setLastResult] = useState(null);

  const handleEnrichMovie = async () => {
    setStatus('processing');
    setIsLoading(true);
    setProcessingMessage(`Finding locations using ${tierInfo?.current} tier...`);
    
    try {
      const result = await aiService.findMovieLocations(movie.title, new Date(movie.release_date).getFullYear());
      
      setLocations(result.locations.map((loc, index) => ({ ...loc, id: `${result.provider}${index}` })));
      setStatus('completed');
      setLastResult(result);
      setProcessingMessage(`Found ${result.locations.length} locations using ${result.provider}`);
    } catch (error) {
      console.error("Location finding failed:", error);
      setStatus('failed');
      setProcessingMessage('All providers failed. Try switching to Demo mode.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToTrip = (location) => {
    openTripModal(location);
  };

  const renderProviderInfo = () => {
    if (!lastResult) return null;
    
    return (
      <div className="mb-4 p-3 bg-gray-700 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-300">
            Powered by: <span className="font-semibold text-white">{lastResult.provider}</span>
          </span>
          <span className="text-gray-300">
            Cost: <span className="text-green-400">${lastResult.cost?.toFixed(4) || '0.0000'}</span>
          </span>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Tier: {lastResult.tier} • Budget remaining: ${lastResult.remainingBudget?.toFixed(2) || '∞'}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (status) {
      case 'idle':
        return (
          <div className="text-center py-12 bg-gray-800 rounded-lg shadow-xl">
            <Icon name="location" className="h-16 w-16 mx-auto text-indigo-400 mb-4" />
            <h3 className="text-2xl font-bold text-white">Find Filming Locations</h3>
            <p className="text-gray-400 mt-2 mb-4 max-w-md mx-auto">
              Discover real filming locations for "{movie.title}".
            </p>
            <div className="mb-4 p-3 bg-gray-700 rounded-lg max-w-md mx-auto">
              <div className="text-sm text-gray-300 mb-2">Current mode:</div>
              <div className={`font-semibold ${getTierColor(tierInfo?.current)}`}>
                {tierInfo?.current} - {tierInfo?.available.find(t => t.id === tierInfo?.current)?.cost} cost
              </div>
            </div>
            <button 
              onClick={handleEnrichMovie} 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-md flex items-center justify-center gap-2 transition-colors mx-auto"
              disabled={isLoading}
            >
              <Icon name="search" className="h-5 w-5" />
              {isLoading ? 'Processing...' : 'Start Search'}
            </button>
          </div>
        );
        
      case 'processing': 
        return (
          <div className="text-center py-12">
            <LoadingSpinner text={processingMessage} />
          </div>
        );
        
      case 'failed': 
        return (
          <div className="text-center py-12 bg-gray-800 rounded-lg">
            <p className="text-xl text-gray-300 mb-4">{processingMessage}</p>
            <button 
              onClick={handleEnrichMovie} 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors mx-auto"
            >
              <Icon name="retry" className="h-5 w-5" /> Retry
            </button>
          </div>
        );
        
      case 'completed':
        return (
          <div>
            {renderProviderInfo()}
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
              <ul className="space-y-4">
                {locations.map(loc => (
                  <li key={loc.id} className="p-4 bg-gray-700 rounded-md">
                    <div className="flex justify-between items-start">
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-white">{loc.name}</h3>
                        <p className="text-indigo-300">{loc.city}, {loc.country}</p>
                        <p className="mt-2 text-gray-300">{loc.scene_description}</p>
                      </div>
                      <button 
                        onClick={() => handleAddToTrip(loc)} 
                        className="ml-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md flex items-center gap-2 transition-colors"
                      >
                        <Icon name="add" className="h-5 w-5" /> Add to Trip
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <TripModal />
            <SuccessMessage />
          </div>
        );
        
      default: 
        return null;
    }
  };

  return (
    <div>
      <button onClick={() => onNavigate('watchlist')} className="mb-6 text-indigo-400 hover:text-indigo-200">
        ← Back to Watchlist
      </button>
      <h2 className="text-3xl font-bold text-indigo-400">
        Location Finder for <span className="text-white">{movie.title}</span>
      </h2>
      <p className="text-gray-400 mt-2 mb-6">Multi-provider AI location intelligence with automatic fallback.</p>
      {renderContent()}
    </div>
  );
};

// Enhanced Recommendations Component
const EnhancedRecommendations = () => {
  const { aiService, tierInfo } = useAIService();
  const { watchlist, addToWatchlist } = useWatchlist();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastResult, setLastResult] = useState(null);
  const [addedMovies, setAddedMovies] = useState(new Set());

  const getRecommendations = async () => {
    setLoading(true);
    try {
      const result = await aiService.getRecommendations(watchlist);
      setRecommendations(result.recommendations);
      setLastResult(result);
    } catch (error) {
      console.error("Recommendation generation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWatchlist = (rec, index) => {
    // Create a movie object from the recommendation
    const movieObject = {
      id: Date.now() + index, // Unique ID
      title: rec.title,
      poster_url: `https://placehold.co/300x450/4c1d95/ffffff?text=${encodeURIComponent(rec.title)}`,
      release_date: '2024-01-01', // Default date since we don't have it from AI recommendations
      overview: rec.reason
    };

    addToWatchlist(movieObject);
    
    // Track that this movie was added
    setAddedMovies(prev => new Set(prev).add(index));
    
    // Show brief success feedback
    setTimeout(() => {
      setAddedMovies(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }, 3000);
  };

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-indigo-400 mb-4 flex items-center gap-2">
        <Icon name="lightbulb" className="h-6 w-6" />
        Smart Recommendations
      </h3>
      
      {recommendations.length === 0 && !loading && (
        <div className="text-center p-8 bg-gray-800 rounded-lg">
          <Icon name="lightbulb" className="h-12 w-12 mx-auto text-gray-600 mb-4" />
          <p className="text-gray-400 mb-4">Get personalized movie recommendations based on your watchlist!</p>
          <button 
            onClick={getRecommendations} 
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-md flex items-center gap-2 mx-auto transition-colors"
          >
            <Icon name="lightbulb" className="h-5 w-5" />
            Get AI Recommendations ({tierInfo?.current} mode)
          </button>
        </div>
      )}
      
      {loading && <LoadingSpinner text="Finding recommendations..." />}
      
      {recommendations.length > 0 && (
        <div>
          {lastResult && (
            <div className="mb-4 text-sm text-gray-400 flex items-center justify-between">
              <span>Powered by {lastResult.provider} • Cost: ${lastResult.cost?.toFixed(4) || '0.0000'}</span>
              <button 
                onClick={getRecommendations} 
                className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1 transition-colors"
              >
                <Icon name="retry" className="h-4 w-4" />
                Get New Recommendations
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recommendations.map((rec, index) => {
              const isAdded = addedMovies.has(index);
              const isAlreadyInWatchlist = watchlist.some(movie => 
                movie.title.toLowerCase() === rec.title.toLowerCase()
              );
              
              return (
                <div key={index} className="bg-gray-800 rounded-lg shadow-xl overflow-hidden p-6 flex flex-col">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-white mb-2">{rec.title}</h4>
                    <p className="text-sm text-gray-400 mb-4">"{rec.reason}"</p>
                  </div>
                  
                  <div className="mt-auto">
                    {isAlreadyInWatchlist ? (
                      <div className="w-full bg-gray-600 text-gray-300 font-bold py-2 px-4 rounded-md text-center text-sm">
                        <Icon name="check" className="h-4 w-4 inline mr-2" />
                        Already in Watchlist
                      </div>
                    ) : isAdded ? (
                      <div className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md text-center text-sm">
                        <Icon name="check" className="h-4 w-4 inline mr-2" />
                        Added to Watchlist!
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleAddToWatchlist(rec, index)}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors text-sm hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        <Icon name="add" className="h-4 w-4" />
                        Add to Watchlist
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// Utility functions
const getTierColor = (tier) => {
  const colors = {
    PREMIUM: 'text-yellow-400',
    STANDARD: 'text-blue-400', 
    BUDGET: 'text-green-400',
    DEMO: 'text-purple-400'
  };
  return colors[tier] || 'text-gray-400';
};

// Icon component (reused from original)
const Icon = ({ name, className }) => {
  const icons = {
    movie: "M14.752 2.092a.5.5 0 0 0-.498.31l-3.633 7.48-8.22-1.92a.5.5 0 0 0-.58.573l2.005 8.219-7.48 3.633a.5.5 0 0 0-.31.498.5.5 0 0 0 .498.498l7.48 1.068 1.92 8.22a.5.5 0 0 0 .573.58l8.219-2.005 3.633 7.48a.5.5 0 0 0 .498.31.5.5 0 0 0 .498-.498l1.068-7.48 8.22-1.92a.5.5 0 0 0 .58-.573l-2.005-8.219 7.48-3.633a.5.5 0 0 0 .31-.498.5.5 0 0 0-.498-.498l-7.48-1.068-1.92-8.22a.5.5 0 0 0-.573-.58L15.25 4.1l-3.633-7.48a.5.5 0 0 0-.498-.31.5.5 0 0 0-.367.182z",
    search: "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
    location: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
    lightbulb: "M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z",
    settings: "M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z",
    retry: "M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM5 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C14.03 4.46 12.57 4 11 4c-4.42 0-8 3.58-8 8H0l4 4 4-4H5z",
    add: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
    star: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
    trash: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",
    plane: "M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d={icons[name] || ''}></path>
    </svg>
  );
};

const LoadingSpinner = ({ text = 'Loading...' }) => (
  <div className="flex flex-col justify-center items-center p-8 text-center">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
    <p className="mt-4 text-lg text-gray-300">{text}</p>
  </div>
);

// Main App Component
function MultiTierCineVoyageApp() {
  const [currentPage, setCurrentPage] = useState('watchlist');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);
  
  const navigateTo = (page, data = {}) => {
    if (page === 'locations') setSelectedMovie(data.movie);
    if (page === 'tripDetails') setSelectedTrip(data.trip);
    setCurrentPage(page);
  };

  // Listen for custom navigation events
  useEffect(() => {
    const handleNavigateToTravel = (event) => {
      navigateTo('travel');
      // Optional: highlight the specific trip that was just updated
      if (event.detail) {
        console.log('Navigated to travel planner for trip:', event.detail);
      }
    };
    window.addEventListener('navigate-to-travel', handleNavigateToTravel);
    return () => window.removeEventListener('navigate-to-travel', handleNavigateToTravel);
  }, []);

  return (
    <AIServiceProvider>
      <WatchlistProvider>
        <TripProvider>
          <div className="bg-gray-900 text-white min-h-screen font-sans">
            <EnhancedHeader onNavigate={navigateTo} />
            <main className="p-4 md:p-8 max-w-7xl mx-auto">
              {currentPage === 'watchlist' && <WatchlistPage onNavigate={navigateTo} />}
              {currentPage === 'locations' && selectedMovie && (
                <EnhancedLocationScraperPage movie={selectedMovie} onNavigate={navigateTo} />
              )}
              {currentPage === 'travel' && <TravelPlannerPage onNavigate={navigateTo} />}
              {currentPage === 'tripDetails' && selectedTrip && (
                <TripDetailsPage trip={selectedTrip} onNavigate={navigateTo} />
              )}
            </main>
          </div>
        </TripProvider>
      </WatchlistProvider>
    </AIServiceProvider>
  );
}

// Trip Management Context
const TripContext = createContext(null);

const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([
    { 
      id: 1, 
      title: 'European Film Tour', 
      description: 'Visit iconic European filming locations', 
      start_date: '2024-06-01', 
      end_date: '2024-06-15',
      destinations: [],
      center_location: { lat: 48.8566, lng: 2.3522, city: 'Paris', country: 'France' } // Paris as center
    },
    { 
      id: 2, 
      title: 'Superhero Movie Adventure', 
      description: 'Explore locations from superhero films', 
      start_date: '2024-07-10', 
      end_date: '2024-07-20',
      destinations: [],
      center_location: { lat: 40.7128, lng: -74.0060, city: 'New York', country: 'USA' } // NYC as center
    }
  ]);
  
  const [showTripModal, setShowTripModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [newTripTitle, setNewTripTitle] = useState('');
  const [modalView, setModalView] = useState('select');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [lastAddedTrip, setLastAddedTrip] = useState(null);

  const addLocationToTrip = (location, tripId) => {
    const destination = {
      id: Date.now(),
      name: location.name,
      location: `${location.city}, ${location.country}`,
      description: location.scene_description,
      city: location.city,
      country: location.country,
      latitude: location.latitude || null,
      longitude: location.longitude || null,
      order_index: trips.find(t => t.id === tripId)?.destinations?.length || 0
    };

    setTrips(prev => prev.map(trip => 
      trip.id === tripId 
        ? { ...trip, destinations: [...(trip.destinations || []), destination] }
        : trip
    ));

    const tripName = trips.find(t => t.id === tripId)?.title;
    setLastAddedTrip({ name: tripName, id: tripId });
    setShowSuccessMessage(true);
    setShowTripModal(false);
    setSelectedLocation(null);
  };

  const createNewTrip = (title) => {
    const newTrip = {
      id: Date.now(),
      title,
      description: `Trip featuring locations from movie scenes`,
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 weeks later
      destinations: []
    };
    setTrips(prev => [...prev, newTrip]);
    
    if (selectedLocation) {
      addLocationToTrip(selectedLocation, newTrip.id);
    }
    
    setNewTripTitle('');
    setModalView('select');
  };

  const openTripModal = (location) => {
    setSelectedLocation(location);
    setNewTripTitle(`${location.name} Adventure`);
    setModalView(trips.length > 0 ? 'select' : 'create');
    setShowTripModal(true);
  };

  return (
    <TripContext.Provider value={{
      trips,
      showTripModal,
      setShowTripModal,
      selectedLocation,
      newTripTitle,
      setNewTripTitle,
      modalView,
      setModalView,
      addLocationToTrip,
      createNewTrip,
      openTripModal,
      showSuccessMessage,
      setShowSuccessMessage,
      lastAddedTrip
    }}>
      {children}
    </TripContext.Provider>
  );
};

const useTrips = () => useContext(TripContext);

// Trip Modal Component
const TripModal = () => {
  const {
    trips,
    showTripModal,
    setShowTripModal,
    selectedLocation,
    newTripTitle,
    setNewTripTitle,
    modalView,
    setModalView,
    addLocationToTrip,
    createNewTrip
  } = useTrips();

  if (!showTripModal || !selectedLocation) return null;

  const handleCreateAndAdd = (e) => {
    e.preventDefault();
    if (!newTripTitle.trim()) return;
    createNewTrip(newTripTitle);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full">
        <h3 className="text-2xl font-bold mb-4 text-white">Add to Trip</h3>
        <div className="mb-4 p-3 bg-gray-700 rounded-lg">
          <div className="text-sm text-gray-300">Adding location:</div>
          <div className="font-semibold text-white">{selectedLocation.name}</div>
          <div className="text-xs text-gray-400">{selectedLocation.city}, {selectedLocation.country}</div>
        </div>
        
        {trips.length > 0 && (
          <div className="flex border-b border-gray-600 mb-4">
            <button 
              onClick={() => setModalView('select')} 
              className={`flex-1 py-2 text-center font-semibold ${
                modalView === 'select' 
                  ? 'text-indigo-400 border-b-2 border-indigo-400' 
                  : 'text-gray-400'
              }`}
            >
              Add to Existing
            </button>
            <button 
              onClick={() => setModalView('create')} 
              className={`flex-1 py-2 text-center font-semibold ${
                modalView === 'create' 
                  ? 'text-indigo-400 border-b-2 border-indigo-400' 
                  : 'text-gray-400'
              }`}
            >
              Create New Trip
            </button>
          </div>
        )}
        
        {modalView === 'select' && trips.length > 0 ? (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {trips.map(trip => (
              <button 
                key={trip.id} 
                onClick={() => addLocationToTrip(selectedLocation, trip.id)} 
                className="w-full text-left p-3 bg-gray-700 hover:bg-indigo-600 rounded-md transition-colors"
              >
                <div className="font-semibold text-white">{trip.title}</div>
                <div className="text-xs text-gray-400">{trip.start_date} to {trip.end_date}</div>
                <div className="text-xs text-gray-300 mt-1">{trip.description}</div>
              </button>
            ))}
          </div>
        ) : (
          <form onSubmit={handleCreateAndAdd}>
            <label htmlFor="tripTitle" className="block text-sm font-medium text-gray-300 mb-2">
              New Trip Name
            </label>
            <input 
              id="tripTitle" 
              type="text" 
              value={newTripTitle} 
              onChange={(e) => setNewTripTitle(e.target.value)} 
              className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              required 
              placeholder="Enter trip name..."
            />
            <button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
            >
              Create Trip & Add Location
            </button>
          </form>
        )}
        
        <button 
          onClick={() => setShowTripModal(false)} 
          className="mt-4 w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// Success Message Component  
const SuccessMessage = () => {
  const { showSuccessMessage, setShowSuccessMessage, lastAddedTrip } = useTrips();

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000); // Auto-hide after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage, setShowSuccessMessage]);

  if (!showSuccessMessage || !lastAddedTrip) return null;

  const handleViewTrip = () => {
    setShowSuccessMessage(false);
    // Get the current navigation function from the main app
    const event = new CustomEvent('navigate-to-travel', { detail: lastAddedTrip });
    window.dispatchEvent(event);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-green-600 text-white p-4 rounded-lg shadow-xl max-w-sm animate-slide-in-right">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-green-500 rounded-full p-1">
            <Icon name="add" className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="font-semibold">Location Added!</div>
            <div className="text-sm text-green-100">Added to "{lastAddedTrip.name}"</div>
          </div>
          <button
            onClick={() => setShowSuccessMessage(false)}
            className="ml-auto text-green-200 hover:text-white text-lg leading-none"
          >
            ×
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowSuccessMessage(false)}
            className="text-xs bg-green-700 hover:bg-green-800 text-white px-3 py-1.5 rounded transition-colors"
          >
            Continue Adding
          </button>
          <button
            onClick={handleViewTrip}
            className="text-xs bg-white hover:bg-gray-100 text-green-600 px-3 py-1.5 rounded font-semibold transition-colors"
          >
            View Trip →
          </button>
        </div>
      </div>
    </div>
  );
};

// Mock movie database for demo
const mockMovieDatabase = [
  { id: 1, tmdb_id: 155, title: 'The Dark Knight', poster_url: 'https://placehold.co/300x450/1a1a2e/ffffff?text=The+Dark+Knight', release_date: '2008-07-18', overview: 'Batman faces the Joker in this acclaimed superhero thriller.' },
  { id: 2, tmdb_id: 27205, title: 'Inception', poster_url: 'https://placehold.co/300x450/16213e/ffffff?text=Inception', release_date: '2010-07-16', overview: 'Dom Cobb enters dreams to steal secrets in this mind-bending thriller.' },
  { id: 3, tmdb_id: 157336, title: 'Interstellar', poster_url: 'https://placehold.co/300x450/0f3460/ffffff?text=Interstellar', release_date: '2014-11-07', overview: 'A team of explorers travel through a wormhole in space.' },
  { id: 4, tmdb_id: 13, title: 'Forrest Gump', poster_url: 'https://placehold.co/300x450/2c5f2d/ffffff?text=Forrest+Gump', release_date: '1994-07-06', overview: 'The presidencies of Kennedy and Johnson through the eyes of Alabama man Forrest Gump.' },
  { id: 5, tmdb_id: 278, title: 'The Shawshank Redemption', poster_url: 'https://placehold.co/300x450/582c4d/ffffff?text=Shawshank', release_date: '1994-09-23', overview: 'Two imprisoned men bond over years, finding redemption through acts of decency.' }
];

// Full Watchlist Implementation
const WatchlistPage = ({ onNavigate }) => {
  const { watchlist, addToWatchlist, updateRating, removeFromWatchlist } = useWatchlist();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) { setSearchResults([]); return; }
    const results = mockMovieDatabase.filter(movie => 
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !watchlist.find(w => w.movie_id === movie.id)
    );
    setSearchResults(results);
  };

  const handleAddToWatchlist = (movie) => {
    addToWatchlist(movie);
    setSearchTerm('');
    setSearchResults([]);
  };

  const findLocationsForMovie = (watchlistItem) => {
    // Find the full movie data
    const fullMovie = mockMovieDatabase.find(m => m.id === watchlistItem.movie_id) || {
      id: watchlistItem.movie_id,
      title: watchlistItem.title,
      release_date: watchlistItem.release_date,
      overview: `Discover filming locations for ${watchlistItem.title}`
    };
    onNavigate('locations', { movie: fullMovie });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-indigo-400">My Movie Watchlist</h2>
      
      {/* Search Form */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl mb-8">
        <form onSubmit={handleSearch} className="flex gap-4">
          <input 
            type="text" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder="Search for movies to add..." 
            className="flex-grow bg-gray-700 text-white placeholder-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
          />
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md flex items-center gap-2 transition-colors">
            <Icon name="search" className="h-5 w-5" /> Search
          </button>
        </form>
        
        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mt-4 bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Search Results</h3>
            <ul>
              {searchResults.map(movie => (
                <li key={movie.id} className="flex items-center justify-between p-2 hover:bg-gray-600 rounded-md">
                  <span>{movie.title} ({movie.release_date.split('-')[0]})</span>
                  <button 
                    onClick={() => handleAddToWatchlist(movie)} 
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded-md flex items-center gap-1 text-sm"
                  >
                    <Icon name="add" className="h-4 w-4" /> Add
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Watchlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {watchlist.map(movie => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onUpdateRating={updateRating} 
            onDelete={removeFromWatchlist}
            onFindLocations={findLocationsForMovie}
          />
        ))}
      </div>

      {/* AI Recommendations */}
      {watchlist.length > 0 && <EnhancedRecommendations />}
    </div>
  );
};

// Movie Card Component with rating-gated location finding
const MovieCard = ({ movie, onUpdateRating, onDelete, onFindLocations }) => {
  const hasRating = movie.rating > 0;
  
  return (
    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col" data-movie-id={movie.id}>
      <img src={movie.poster_url} alt={movie.title} className="w-full h-64 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg truncate">{movie.title}</h3>
        <p className="text-sm text-gray-400">{movie.release_date.split('-')[0]}</p>
        
        {/* Rating Stars */}
        <div className="flex items-center my-3">
          {[...Array(5)].map((_, i) => (
            <button 
              key={i} 
              onClick={() => onUpdateRating(movie.id, (i + 1) * 2)}
              className="p-1 bg-transparent border-none cursor-pointer hover:scale-110 transition-transform"
              aria-label={`Rate ${i + 1} stars`}
            >
              <Icon 
                name="star" 
                className={`h-6 w-6 transition-colors ${
                  i < movie.rating / 2 
                    ? 'text-yellow-400' 
                    : 'text-gray-600 hover:text-yellow-300'
                }`} 
              />
            </button>
          ))}
          <span className="ml-2 text-gray-300">{movie.rating}/10</span>
        </div>
        
        {/* Rating Prompt */}
        {!hasRating && (
          <div className="mb-3 p-2 bg-yellow-900/20 border border-yellow-600 rounded-md animate-pulse">
            <p className="text-yellow-200 text-xs text-center flex items-center justify-center gap-1">
              <Icon name="star" className="h-3 w-3" />
              Rate this movie to unlock location finding
            </p>
          </div>
        )}
        
        {/* Success Message */}
        {hasRating && (
          <div className="mb-3 p-2 bg-green-900/20 border border-green-600 rounded-md">
            <p className="text-green-200 text-xs text-center flex items-center justify-center gap-1">
              <Icon name="check" className="h-3 w-3" />
              Ready to explore filming locations!
            </p>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex flex-col space-y-2 mt-auto">
          <div className="relative">
            <button 
              onClick={() => hasRating ? onFindLocations(movie) : null} 
              disabled={!hasRating}
              className={`location-button w-full font-bold py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-all duration-500 text-sm ${
                hasRating
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-lg transform hover:-translate-y-0.5'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
              }`}
              title={hasRating ? 'Find filming locations for this movie' : 'Please rate this movie first'}
            >
              <Icon 
                name="location" 
                className={`h-4 w-4 transition-colors ${hasRating ? 'text-white' : 'text-gray-500'}`} 
              /> 
              Find Locations
              {hasRating && (
                <Icon name="unlock" className="h-3 w-3 ml-1 text-green-300" />
              )}
            </button>
            
            {/* Tooltip for disabled state */}
            {!hasRating && (
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                Rate the movie first to find locations
              </div>
            )}
          </div>
          
          <button 
            onClick={() => onDelete(movie.id)} 
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors text-sm hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <Icon name="trash" className="h-4 w-4" /> Remove
          </button>
        </div>
      </div>
    </div>
  );
};

const TravelPlannerPage = ({ onNavigate }) => {
  const { trips } = useTrips();
  const { aiService, isLoading, setIsLoading } = useAIService();
  const { addToWatchlist } = useWatchlist();
  const [showForm, setShowForm] = useState(false);
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  const [selectedTripForMovies, setSelectedTripForMovies] = useState(null);
  const [movieRecommendations, setMovieRecommendations] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(false);

  // Listen for custom navigation events
  useEffect(() => {
    const handleNavigateToTravel = () => {
      // Auto-scroll to page or show some indication
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('navigate-to-travel', handleNavigateToTravel);
    return () => window.removeEventListener('navigate-to-travel', handleNavigateToTravel);
  }, []);

  const getMovieRecommendationsForTrip = async (trip) => {
    if (!trip.destinations?.length) return;
    
    setLoadingMovies(true);
    setSelectedTripForMovies(trip);
    
    try {
      // Get recommendations for the first destination city
      const firstDest = trip.destinations[0];
      const result = await aiService.getMovieRecommendationsForLocation(
        firstDest.city, 
        firstDest.country
      );
      setMovieRecommendations(result.movies || []);
    } catch (error) {
      console.error('Failed to get movie recommendations:', error);
      setMovieRecommendations([]);
    } finally {
      setLoadingMovies(false);
    }
  };

  const tripsWithDestinations = trips.filter(trip => trip.destinations?.length > 0);
  const emptyTrips = trips.filter(trip => !trip.destinations?.length);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-indigo-400">My Travel Plans</h2>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md flex items-center gap-2 transition-colors"
        >
          <Icon name="add" className="h-5 w-5" /> {showForm ? 'Cancel' : 'New Trip'}
        </button>
      </div>

      {showForm && <TripForm onSuccess={() => setShowForm(false)} />}
      {showLocationSearch && <LocationSearchForm onCancel={() => setShowLocationSearch(false)} />}

      {/* Location Search Button */}
      <div className="mb-6">
        <button 
          onClick={() => setShowLocationSearch(!showLocationSearch)} 
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md flex items-center gap-2 transition-colors mr-4"
        >
          <Icon name="search" className="h-5 w-5" /> {showLocationSearch ? 'Cancel' : 'Find Movies by Location'}
        </button>
        <p className="text-sm text-gray-400 mt-2">Start with a destination to discover movies filmed there!</p>
      </div>

      {/* Movie Recommendations Display */}
      {selectedTripForMovies && (
        <MovieRecommendationsSection 
          trip={selectedTripForMovies}
          movies={movieRecommendations}
          loading={loadingMovies}
          onClose={() => {
            setSelectedTripForMovies(null);
            setMovieRecommendations([]);
          }}
          onAddToWatchlist={addToWatchlist}
        />
      )}

      {/* Trips with destinations */}
      {tripsWithDestinations.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Icon name="plane" className="h-6 w-6 text-green-400" />
            Ready to Travel ({tripsWithDestinations.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tripsWithDestinations.map(trip => (
              <EnhancedTripCard 
                key={trip.id} 
                trip={trip} 
                onNavigate={onNavigate} 
                onGetMovieRecommendations={getMovieRecommendationsForTrip}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty trips */}
      {emptyTrips.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-400 mb-4 flex items-center gap-2">
            <Icon name="lightbulb" className="h-6 w-6 text-yellow-400" />
            Planning Stage ({emptyTrips.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emptyTrips.map(trip => (
              <TripCard key={trip.id} trip={trip} onNavigate={onNavigate} isEmpty />
            ))}
          </div>
        </div>
      )}

      {trips.length === 0 && (
        <div className="text-center py-12">
          <Icon name="plane" className="h-16 w-16 mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl text-gray-400 mb-2">No trips planned yet</h3>
          <p className="text-gray-500 mb-6">Start by finding filming locations and adding them to trips!</p>
          <button 
            onClick={() => onNavigate('watchlist')} 
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Explore Movies →
          </button>
        </div>
      )}
    </div>
  );
};

// Enhanced Trip Card Component with GPS and booking integration
const TripCard = ({ trip, onNavigate, isEmpty = false }) => {
  const hasGPSData = trip.destinations?.some(dest => dest.latitude && dest.longitude);
  
  const handleCardClick = (e) => {
    // Prevent navigation if clicking on action buttons
    if (e.target.closest('.action-button')) return;
    onNavigate('tripDetails', { trip });
  };

  const openGoogleMaps = (e) => {
    e.stopPropagation();
    if (hasGPSData) {
      const destinations = trip.destinations.filter(d => d.latitude && d.longitude);
      if (destinations.length === 1) {
        const dest = destinations[0];
        window.open(`https://www.google.com/maps?q=${dest.latitude},${dest.longitude}`, '_blank');
      } else {
        // Multi-destination route
        const waypoints = destinations.slice(1).map(d => `${d.latitude},${d.longitude}`).join('|');
        const origin = destinations[0];
        const destination = destinations[destinations.length - 1];
        window.open(`https://www.google.com/maps/dir/${origin.latitude},${origin.longitude}/${destination.latitude},${destination.longitude}/${waypoints ? `data=!4m2!4m1!3e0!5m1!1s${waypoints}` : ''}`, '_blank');
      }
    }
  };

  const searchBooking = (e) => {
    e.stopPropagation();
    if (trip.destinations?.length > 0) {
      const firstDest = trip.destinations[0];
      const searchQuery = encodeURIComponent(`${firstDest.city}, ${firstDest.country}`);
      window.open(`https://www.booking.com/searchresults.html?ss=${searchQuery}&checkin=${trip.start_date}&checkout=${trip.end_date}`, '_blank');
    }
  };

  const searchAttractions = (e) => {
    e.stopPropagation();
    if (trip.destinations?.length > 0) {
      const firstDest = trip.destinations[0];
      const searchQuery = encodeURIComponent(`things to do ${firstDest.city} ${firstDest.country}`);
      window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
    }
  };

  return (
    <div 
      className={`bg-gray-800 rounded-lg shadow-xl p-6 cursor-pointer transform hover:-translate-y-1 transition-all duration-200 ${
        isEmpty ? 'border-2 border-dashed border-gray-600' : 'border border-gray-700 hover:border-indigo-500'
      }`}
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-white truncate pr-2">{trip.title}</h3>
        <div className="flex items-center gap-2">
          {hasGPSData && (
            <div className="px-1 py-1 bg-green-800 rounded-full" title="GPS data available">
              <Icon name="location" className="h-3 w-3 text-green-300" />
            </div>
          )}
          <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
            isEmpty 
              ? 'bg-yellow-900 text-yellow-200' 
              : 'bg-green-900 text-green-200'
          }`}>
            {isEmpty ? 'Planning' : 'Ready'}
          </div>
        </div>
      </div>
      
      <p className="text-sm text-indigo-300 mb-2">{trip.start_date} to {trip.end_date}</p>
      <p className="text-gray-400 text-sm mb-4 truncate">{trip.description}</p>
      
      {isEmpty ? (
        <div className="text-center py-4 text-gray-500">
          <Icon name="add" className="h-8 w-8 mx-auto mb-2" />
          <p className="text-xs">Add locations to get started</p>
        </div>
      ) : (
        <div>
          <div className="text-sm text-gray-300 mb-3">
            {trip.destinations?.length || 0} destinations
          </div>
          <div className="space-y-1 mb-4">
            {trip.destinations?.slice(0, 2).map((dest, index) => (
              <div key={dest.id} className="text-xs text-gray-400 truncate flex items-center gap-1">
                {dest.latitude && dest.longitude ? (
                  <Icon name="location" className="h-3 w-3 text-green-400 flex-shrink-0" />
                ) : (
                  <span className="w-3 h-3 flex-shrink-0"></span>
                )}
                {dest.name} ({dest.city})
              </div>
            ))}
            {(trip.destinations?.length || 0) > 2 && (
              <div className="text-xs text-indigo-400">
                + {(trip.destinations?.length || 0) - 2} more locations
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-2">
            {hasGPSData && (
              <button 
                onClick={openGoogleMaps}
                className="action-button flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 px-2 rounded transition-colors"
                title="Open in Google Maps"
              >
                <Icon name="location" className="h-3 w-3" />
                Maps
              </button>
            )}
            <button 
              onClick={searchBooking}
              className="action-button flex items-center justify-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs py-2 px-2 rounded transition-colors"
              title="Find Hotels"
            >
              <Icon name="home" className="h-3 w-3" />
              Hotels
            </button>
            <button 
              onClick={searchAttractions}
              className="action-button flex items-center justify-center gap-1 bg-purple-600 hover:bg-purple-700 text-white text-xs py-2 px-2 rounded transition-colors"
              title="Find Attractions"
            >
              <Icon name="star" className="h-3 w-3" />
              Explore
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Simple Trip Form
const TripForm = ({ onSuccess }) => {
  const { createNewTrip } = useTrips();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewTrip(title);
    if (onSuccess) onSuccess();
    setTitle('');
    setDescription('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-xl mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          type="text" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          placeholder="Trip Title" 
          required 
          className="bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
        />
        <textarea 
          value={description} 
          onChange={e => setDescription(e.target.value)} 
          placeholder="Description" 
          className="bg-gray-700 text-white p-3 rounded-md md:col-span-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
        />
        <input 
          type="date" 
          value={startDate} 
          onChange={e => setStartDate(e.target.value)} 
          className="bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
        />
        <input 
          type="date" 
          value={endDate} 
          onChange={e => setEndDate(e.target.value)} 
          className="bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
        />
      </div>
      <button 
        type="submit" 
        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition-colors"
      >
        Create Trip
      </button>
    </form>
  );
};

// Enhanced Trip Card with movie recommendation button
const EnhancedTripCard = ({ trip, onNavigate, isEmpty = false, onGetMovieRecommendations }) => {
  const hasGPSData = trip.destinations?.some(dest => dest.latitude && dest.longitude);
  
  const handleCardClick = (e) => {
    // Prevent navigation if clicking on action buttons
    if (e.target.closest('.action-button')) return;
    onNavigate('tripDetails', { trip });
  };

  const handleGetMovies = (e) => {
    e.stopPropagation();
    onGetMovieRecommendations(trip);
  };

  const openGoogleMaps = (e) => {
    e.stopPropagation();
    if (hasGPSData) {
      const destinations = trip.destinations.filter(d => d.latitude && d.longitude);
      if (destinations.length === 1) {
        const dest = destinations[0];
        window.open(`https://www.google.com/maps?q=${dest.latitude},${dest.longitude}`, '_blank');
      } else {
        // Multi-destination route
        const waypoints = destinations.slice(1).map(d => `${d.latitude},${d.longitude}`).join('|');
        const origin = destinations[0];
        const destination = destinations[destinations.length - 1];
        window.open(`https://www.google.com/maps/dir/${origin.latitude},${origin.longitude}/${destination.latitude},${destination.longitude}/${waypoints ? `data=!4m2!4m1!3e0!5m1!1s${waypoints}` : ''}`, '_blank');
      }
    }
  };

  const searchBooking = (e) => {
    e.stopPropagation();
    if (trip.destinations?.length > 0) {
      const firstDest = trip.destinations[0];
      const searchQuery = encodeURIComponent(`${firstDest.city}, ${firstDest.country}`);
      window.open(`https://www.booking.com/searchresults.html?ss=${searchQuery}&checkin=${trip.start_date}&checkout=${trip.end_date}`, '_blank');
    }
  };

  const searchAttractions = (e) => {
    e.stopPropagation();
    if (trip.destinations?.length > 0) {
      const firstDest = trip.destinations[0];
      const searchQuery = encodeURIComponent(`things to do ${firstDest.city} ${firstDest.country}`);
      window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
    }
  };

  return (
    <div 
      className={`bg-gray-800 rounded-lg shadow-xl p-6 cursor-pointer transform hover:-translate-y-1 transition-all duration-200 ${
        isEmpty ? 'border-2 border-dashed border-gray-600' : 'border border-gray-700 hover:border-indigo-500'
      }`}
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-white truncate pr-2">{trip.title}</h3>
        <div className="flex items-center gap-2">
          {hasGPSData && (
            <div className="px-1 py-1 bg-green-800 rounded-full" title="GPS data available">
              <Icon name="location" className="h-3 w-3 text-green-300" />
            </div>
          )}
          <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
            isEmpty 
              ? 'bg-yellow-900 text-yellow-200' 
              : 'bg-green-900 text-green-200'
          }`}>
            {isEmpty ? 'Planning' : 'Ready'}
          </div>
        </div>
      </div>
      
      <p className="text-sm text-indigo-300 mb-2">{trip.start_date} to {trip.end_date}</p>
      <p className="text-gray-400 text-sm mb-4 truncate">{trip.description}</p>
      
      {isEmpty ? (
        <div className="text-center py-4 text-gray-500">
          <Icon name="add" className="h-8 w-8 mx-auto mb-2" />
          <p className="text-xs">Add locations to get started</p>
        </div>
      ) : (
        <div>
          <div className="text-sm text-gray-300 mb-3">
            {trip.destinations?.length || 0} destinations
          </div>
          <div className="space-y-1 mb-4">
            {trip.destinations?.slice(0, 2).map((dest, index) => (
              <div key={dest.id} className="text-xs text-gray-400 truncate flex items-center gap-1">
                {dest.latitude && dest.longitude ? (
                  <Icon name="location" className="h-3 w-3 text-green-400 flex-shrink-0" />
                ) : (
                  <span className="w-3 h-3 flex-shrink-0"></span>
                )}
                {dest.name} ({dest.city})
              </div>
            ))}
            {(trip.destinations?.length || 0) > 2 && (
              <div className="text-xs text-indigo-400">
                + {(trip.destinations?.length || 0) - 2} more locations
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="grid grid-cols-4 gap-1">
            <button 
              onClick={handleGetMovies}
              className="action-button flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white text-xs py-2 px-1 rounded transition-colors"
              title="Find Movies"
            >
              <Icon name="movie" className="h-3 w-3" />
              Movies
            </button>
            {hasGPSData && (
              <button 
                onClick={openGoogleMaps}
                className="action-button flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 px-1 rounded transition-colors"
                title="Open in Google Maps"
              >
                <Icon name="location" className="h-3 w-3" />
                Maps
              </button>
            )}
            <button 
              onClick={searchBooking}
              className="action-button flex items-center justify-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs py-2 px-1 rounded transition-colors"
              title="Find Hotels"
            >
              <Icon name="home" className="h-3 w-3" />
              Hotels
            </button>
            <button 
              onClick={searchAttractions}
              className="action-button flex items-center justify-center gap-1 bg-purple-600 hover:bg-purple-700 text-white text-xs py-2 px-1 rounded transition-colors"
              title="Find Attractions"
            >
              <Icon name="star" className="h-3 w-3" />
              Explore
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Location Search Form for reverse workflow
const LocationSearchForm = ({ onCancel }) => {
  const { createNewTrip } = useTrips();
  const { aiService } = useAIService();
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [movieResults, setMovieResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim() || !country.trim()) return;

    setLoading(true);
    try {
      const result = await aiService.getMovieRecommendationsForLocation(city.trim(), country.trim());
      setMovieResults(result.movies || []);
    } catch (error) {
      console.error('Failed to get movie recommendations:', error);
      setMovieResults([]);
    } finally {
      setLoading(false);
    }
  };

  const createTripFromLocation = () => {
    const tripTitle = `${city} Movie Adventure`;
    createNewTrip(tripTitle);
    onCancel();
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl mb-6">
      <h3 className="text-xl font-bold text-white mb-4">Find Movies by Location</h3>
      
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input 
          type="text" 
          value={city} 
          onChange={e => setCity(e.target.value)} 
          placeholder="City (e.g., Paris, New York)" 
          required 
          className="bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" 
        />
        <input 
          type="text" 
          value={country} 
          onChange={e => setCountry(e.target.value)} 
          placeholder="Country (e.g., France, USA)" 
          required 
          className="bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" 
        />
        <button 
          type="submit" 
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded-md transition-colors"
        >
          {loading ? 'Searching...' : 'Find Movies'}
        </button>
      </form>

      {movieResults.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-white mb-3">Movies filmed in {city}, {country}:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {movieResults.map((movie, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg">
                <h5 className="font-bold text-indigo-300">{movie.title} ({movie.year})</h5>
                <p className="text-sm text-gray-300 mt-1">{movie.reason}</p>
                {movie.filming_locations?.length > 0 && (
                  <p className="text-xs text-gray-400 mt-2">
                    Locations: {movie.filming_locations.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={createTripFromLocation}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
            >
              Create Trip to {city}
            </button>
            <button 
              onClick={onCancel}
              className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Movie Recommendations Section
const MovieRecommendationsSection = ({ trip, movies, loading, onClose, onAddToWatchlist }) => {
  const { watchlist } = useWatchlist();
  const [addedMovies, setAddedMovies] = useState(new Set());
  
  if (!trip) return null;

  const handleAddToWatchlist = (movie, index) => {
    // Create a movie object from the location-based recommendation
    const movieObject = {
      id: Date.now() + index, // Unique ID
      title: movie.title,
      poster_url: `https://placehold.co/300x450/2563eb/ffffff?text=${encodeURIComponent(movie.title)}`,
      release_date: `${movie.year}-01-01`,
      overview: movie.reason
    };

    onAddToWatchlist(movieObject);
    
    // Track that this movie was added
    setAddedMovies(prev => new Set(prev).add(index));
    
    // Show brief success feedback
    setTimeout(() => {
      setAddedMovies(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }, 3000);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl mb-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">Movies for {trip.title}</h3>
          <p className="text-sm text-gray-400">
            Based on destinations: {trip.destinations?.map(d => d.city).join(', ')}
          </p>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <Icon name="close" className="h-6 w-6" />
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Finding movies...</p>
        </div>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {movies.map((movie, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors">
              <h5 className="font-bold text-indigo-300 mb-2">{movie.title} ({movie.year})</h5>
              <p className="text-sm text-gray-300 mb-2">{movie.reason}</p>
              {movie.filming_locations?.length > 0 && (
                <div className="text-xs text-gray-400">
                  <span className="font-semibold">Filming locations:</span>
                  <p>{movie.filming_locations.join(', ')}</p>
                </div>
              )}
              {(() => {
                // Check if movie already exists in watchlist
                const existsInWatchlist = watchlist.some(w => 
                  w.title.toLowerCase() === movie.title.toLowerCase()
                );
                const wasJustAdded = addedMovies.has(index);
                
                if (existsInWatchlist) {
                  return (
                    <button 
                      disabled 
                      className="mt-3 bg-gray-600 text-gray-300 text-xs py-1 px-3 rounded cursor-not-allowed"
                    >
                      Already in Watchlist
                    </button>
                  );
                } else if (wasJustAdded) {
                  return (
                    <button 
                      disabled 
                      className="mt-3 bg-green-600 text-white text-xs py-1 px-3 rounded cursor-not-allowed"
                    >
                      Added to Watchlist!
                    </button>
                  );
                } else {
                  return (
                    <button 
                      onClick={() => handleAddToWatchlist(movie, index)}
                      className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs py-1 px-3 rounded transition-colors"
                    >
                      Add to Watchlist
                    </button>
                  );
                }
              })()}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          <Icon name="movie" className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No movie recommendations found for this location.</p>
        </div>
      )}
    </div>
  );
};

// Helper function to calculate distance between two GPS coordinates (Haversine formula)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in kilometers
};

// Function to optimize route using nearest neighbor algorithm
const optimizeRoute = (destinations) => {
  if (destinations.length <= 1) return destinations;
  
  const locationsWithGPS = destinations.filter(d => d.latitude && d.longitude);
  const locationsWithoutGPS = destinations.filter(d => !d.latitude || !d.longitude);
  
  if (locationsWithGPS.length <= 1) {
    return [...locationsWithGPS, ...locationsWithoutGPS];
  }
  
  const optimized = [locationsWithGPS[0]]; // Start with first location
  const remaining = locationsWithGPS.slice(1);
  
  while (remaining.length > 0) {
    const current = optimized[optimized.length - 1];
    let nearestIndex = 0;
    let minDistance = calculateDistance(current.latitude, current.longitude, remaining[0].latitude, remaining[0].longitude);
    
    for (let i = 1; i < remaining.length; i++) {
      const distance = calculateDistance(current.latitude, current.longitude, remaining[i].latitude, remaining[i].longitude);
      if (distance < minDistance) {
        minDistance = distance;
        nearestIndex = i;
      }
    }
    
    optimized.push(remaining[nearestIndex]);
    remaining.splice(nearestIndex, 1);
  }
  
  return [...optimized, ...locationsWithoutGPS];
};

// Function to create day-by-day itinerary
const createItinerary = (trip) => {
  if (!trip.destinations?.length) return [];
  
  const optimizedRoute = optimizeRoute([...trip.destinations]);
  const startDate = new Date(trip.start_date);
  const endDate = new Date(trip.end_date);
  const tripDays = Math.max(1, Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1);
  
  const destinationsPerDay = Math.ceil(optimizedRoute.length / tripDays);
  const itinerary = [];
  
  for (let day = 0; day < tripDays; day++) {
    const dayDate = new Date(startDate);
    dayDate.setDate(startDate.getDate() + day);
    
    const startIndex = day * destinationsPerDay;
    const endIndex = Math.min(startIndex + destinationsPerDay, optimizedRoute.length);
    const dayDestinations = optimizedRoute.slice(startIndex, endIndex);
    
    if (dayDestinations.length > 0) {
      itinerary.push({
        day: day + 1,
        date: dayDate.toLocaleDateString(),
        destinations: dayDestinations,
        totalDistance: calculateDayDistance(dayDestinations)
      });
    }
  }
  
  return itinerary;
};

// Calculate total distance for a day's destinations
const calculateDayDistance = (destinations) => {
  if (destinations.length <= 1) return 0;
  
  let total = 0;
  for (let i = 0; i < destinations.length - 1; i++) {
    const current = destinations[i];
    const next = destinations[i + 1];
    
    if (current.latitude && current.longitude && next.latitude && next.longitude) {
      total += calculateDistance(current.latitude, current.longitude, next.latitude, next.longitude);
    }
  }
  return Math.round(total * 10) / 10; // Round to 1 decimal place
};

const TripDetailsPage = ({ trip, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [optimizedRoute, setOptimizedRoute] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);
  
  useEffect(() => {
    if (trip?.destinations?.length) {
      const optimized = optimizeRoute([...trip.destinations]);
      const tripItinerary = createItinerary(trip);
      
      setOptimizedRoute(optimized);
      setItinerary(tripItinerary);
      
      // Calculate total trip distance
      let total = 0;
      for (let i = 0; i < optimized.length - 1; i++) {
        const current = optimized[i];
        const next = optimized[i + 1];
        if (current.latitude && current.longitude && next.latitude && next.longitude) {
          total += calculateDistance(current.latitude, current.longitude, next.latitude, next.longitude);
        }
      }
      setTotalDistance(Math.round(total * 10) / 10);
    }
  }, [trip]);

  if (!trip) {
    return (
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold text-red-400 mb-4">Trip Not Found</h2>
        <p className="text-gray-300 mb-6">The requested trip could not be loaded.</p>
        <button 
          onClick={() => onNavigate('travel')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Travel Planner
        </button>
      </div>
    );
  }

  const hasGPSLocations = trip.destinations?.some(d => d.latitude && d.longitude);
  
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <button 
            onClick={() => onNavigate('travel')}
            className="flex items-center text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <Icon name="arrow-left" className="h-5 w-5 mr-2" />
            Back to Travel Planner
          </button>
          <h1 className="text-4xl font-bold text-white mb-2">{trip.title}</h1>
          <div className="flex items-center gap-4 text-gray-400">
            <div className="flex items-center gap-2">
              <Icon name="calendar" className="h-5 w-5" />
              <span>{trip.start_date} to {trip.end_date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="location" className="h-5 w-5" />
              <span>{trip.destinations?.length || 0} destinations</span>
            </div>
            {hasGPSLocations && totalDistance > 0 && (
              <div className="flex items-center gap-2">
                <Icon name="route" className="h-5 w-5" />
                <span>{totalDistance}km total</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3">
          {hasGPSLocations && (
            <button 
              onClick={() => {
                const locations = optimizedRoute.filter(d => d.latitude && d.longitude);
                if (locations.length > 1) {
                  const waypoints = locations.slice(1, -1).map(d => `${d.latitude},${d.longitude}`).join('|');
                  const origin = locations[0];
                  const destination = locations[locations.length - 1];
                  window.open(`https://www.google.com/maps/dir/${origin.latitude},${origin.longitude}/${destination.latitude},${destination.longitude}/${waypoints ? `data=!4m2!4m1!3e0` : ''}`, '_blank');
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Icon name="location" className="h-5 w-5" />
              View Route
            </button>
          )}
          <button 
            onClick={() => {
              const firstDest = trip.destinations?.[0];
              if (firstDest) {
                const query = encodeURIComponent(`${firstDest.city}, ${firstDest.country}`);
                window.open(`https://www.booking.com/searchresults.html?ss=${query}&checkin=${trip.start_date}&checkout=${trip.end_date}`, '_blank');
              }
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Icon name="home" className="h-5 w-5" />
            Find Hotels
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-700 mb-8">
        <nav className="flex space-x-8">
          {['overview', 'itinerary', 'locations', 'route'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                activeTab === tab
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-gray-400 hover:text-white hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && <TripOverviewTab trip={trip} optimizedRoute={optimizedRoute} totalDistance={totalDistance} />}
      {activeTab === 'itinerary' && <ItineraryTab itinerary={itinerary} trip={trip} />}
      {activeTab === 'locations' && <LocationsTab destinations={optimizedRoute} />}
      {activeTab === 'route' && <RouteTab optimizedRoute={optimizedRoute} hasGPS={hasGPSLocations} />}
    </div>
  );
};

// Trip Overview Tab
const TripOverviewTab = ({ trip, optimizedRoute, totalDistance }) => {
  const hasGPS = optimizedRoute.some(d => d.latitude && d.longitude);
  const uniqueCities = [...new Set(optimizedRoute.map(d => d.city))];
  const uniqueCountries = [...new Set(optimizedRoute.map(d => d.country))];
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Trip Summary */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Trip Summary</h3>
          <p className="text-gray-300 mb-4">{trip.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-indigo-400">{optimizedRoute.length}</div>
              <div className="text-sm text-gray-400">Locations</div>
            </div>
            <div className="text-center p-4 bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{uniqueCities.length}</div>
              <div className="text-sm text-gray-400">Cities</div>
            </div>
            <div className="text-center p-4 bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{uniqueCountries.length}</div>
              <div className="text-sm text-gray-400">Countries</div>
            </div>
            <div className="text-center p-4 bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">
                {totalDistance > 0 ? `${totalDistance}km` : 'N/A'}
              </div>
              <div className="text-sm text-gray-400">Distance</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hasGPS && (
              <button 
                onClick={() => {
                  const locations = optimizedRoute.filter(d => d.latitude && d.longitude);
                  if (locations.length > 0) {
                    const center = locations[0];
                    window.open(`https://www.google.com/maps/@${center.latitude},${center.longitude},12z`, '_blank');
                  }
                }}
                className="flex items-center gap-3 p-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <Icon name="location" className="h-6 w-6" />
                <div className="text-left">
                  <div className="font-semibold">View on Maps</div>
                  <div className="text-sm text-blue-100">See all locations</div>
                </div>
              </button>
            )}
            <button 
              onClick={() => {
                const firstDest = optimizedRoute[0];
                if (firstDest) {
                  const query = encodeURIComponent(`${firstDest.city}, ${firstDest.country}`);
                  window.open(`https://www.booking.com/searchresults.html?ss=${query}`, '_blank');
                }
              }}
              className="flex items-center gap-3 p-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
            >
              <Icon name="home" className="h-6 w-6" />
              <div className="text-left">
                <div className="font-semibold">Find Hotels</div>
                <div className="text-sm text-indigo-100">Book accommodations</div>
              </div>
            </button>
            <button 
              onClick={() => {
                const query = encodeURIComponent(`things to do ${uniqueCities.join(' ')} ${uniqueCountries.join(' ')}`);
                window.open(`https://www.google.com/search?q=${query}`, '_blank');
              }}
              className="flex items-center gap-3 p-4 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            >
              <Icon name="star" className="h-6 w-6" />
              <div className="text-left">
                <div className="font-semibold">Attractions</div>
                <div className="text-sm text-purple-100">Discover activities</div>
              </div>
            </button>
            <button 
              onClick={() => {
                const query = encodeURIComponent(`restaurants ${uniqueCities.join(' ')} ${uniqueCountries.join(' ')}`);
                window.open(`https://www.google.com/search?q=${query}`, '_blank');
              }}
              className="flex items-center gap-3 p-4 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
            >
              <Icon name="restaurant" className="h-6 w-6" />
              <div className="text-left">
                <div className="font-semibold">Dining</div>
                <div className="text-sm text-yellow-100">Find restaurants</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Destinations Preview */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4">Top Destinations</h3>
          <div className="space-y-3">
            {optimizedRoute.slice(0, 5).map((dest, index) => (
              <div key={dest.id} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium truncate">{dest.name}</div>
                  <div className="text-gray-400 text-sm truncate">{dest.city}, {dest.country}</div>
                </div>
                {dest.latitude && dest.longitude && (
                  <Icon name="location" className="h-4 w-4 text-green-400 flex-shrink-0" />
                )}
              </div>
            ))}
            {optimizedRoute.length > 5 && (
              <div className="text-center text-gray-400 text-sm pt-2">
                +{optimizedRoute.length - 5} more destinations
              </div>
            )}
          </div>
        </div>

        {/* Countries & Cities */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4">Locations</h3>
          
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-400 mb-2">Countries</h4>
            <div className="flex flex-wrap gap-2">
              {uniqueCountries.map(country => (
                <span key={country} className="px-2 py-1 bg-blue-600 text-blue-100 rounded text-sm">
                  {country}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-400 mb-2">Cities</h4>
            <div className="flex flex-wrap gap-2">
              {uniqueCities.map(city => (
                <span key={city} className="px-2 py-1 bg-indigo-600 text-indigo-100 rounded text-sm">
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Itinerary Tab with day-by-day breakdown
const ItineraryTab = ({ itinerary, trip }) => {
  if (itinerary.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="calendar" className="h-16 w-16 mx-auto text-gray-600 mb-4" />
        <h3 className="text-xl text-gray-400 mb-2">No itinerary available</h3>
        <p className="text-gray-500">Add destinations with dates to generate an itinerary.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-white">Day-by-Day Itinerary</h3>
        <div className="text-sm text-gray-400">
          Optimized for shortest travel distances
        </div>
      </div>

      {itinerary.map((day, dayIndex) => (
        <div key={day.day} className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">Day {day.day}</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">{day.date}</h4>
                <p className="text-gray-400">{day.destinations.length} destinations</p>
              </div>
            </div>
            {day.totalDistance > 0 && (
              <div className="text-right">
                <div className="text-lg font-bold text-green-400">{day.totalDistance}km</div>
                <div className="text-sm text-gray-400">total distance</div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {day.destinations.map((dest, destIndex) => (
              <div key={dest.id} className="flex items-start gap-4 p-4 bg-gray-700 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {destIndex + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="font-semibold text-white">{dest.name}</h5>
                      <p className="text-gray-400 text-sm">{dest.city}, {dest.country}</p>
                      {dest.description && (
                        <p className="text-gray-300 text-sm mt-2">{dest.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {dest.latitude && dest.longitude && (
                        <button
                          onClick={() => window.open(`https://www.google.com/maps?q=${dest.latitude},${dest.longitude}`, '_blank')}
                          className="p-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                          title="View on Maps"
                        >
                          <Icon name="location" className="h-4 w-4 text-white" />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          const query = encodeURIComponent(`things to do near ${dest.name} ${dest.city}`);
                          window.open(`https://www.google.com/search?q=${query}`, '_blank');
                        }}
                        className="p-2 bg-purple-600 hover:bg-purple-700 rounded transition-colors"
                        title="Find nearby attractions"
                      >
                        <Icon name="search" className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {dayIndex < itinerary.length - 1 && (
            <div className="mt-4 pt-4 border-t border-gray-600">
              <div className="flex items-center justify-center text-gray-400">
                <Icon name="arrow-down" className="h-5 w-5" />
                <span className="ml-2">Next day</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Locations Tab with detailed location information
const LocationsTab = ({ destinations }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-white">All Locations</h3>
        <div className="text-sm text-gray-400">
          Ordered by optimized route
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {destinations.map((dest, index) => (
          <div key={dest.id} className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">{dest.name}</h4>
                  <p className="text-gray-400">{dest.city}, {dest.country}</p>
                </div>
              </div>
              {dest.latitude && dest.longitude && (
                <div className="flex items-center gap-1 text-green-400">
                  <Icon name="location" className="h-4 w-4" />
                  <span className="text-xs">GPS</span>
                </div>
              )}
            </div>

            {dest.description && (
              <div className="mb-4">
                <h5 className="text-sm font-semibold text-gray-400 mb-2">Scene Description</h5>
                <p className="text-gray-300 text-sm">{dest.description}</p>
              </div>
            )}

            {dest.latitude && dest.longitude && (
              <div className="mb-4">
                <h5 className="text-sm font-semibold text-gray-400 mb-2">Coordinates</h5>
                <div className="text-sm text-gray-300 font-mono">
                  {dest.latitude.toFixed(4)}, {dest.longitude.toFixed(4)}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              {dest.latitude && dest.longitude && (
                <button
                  onClick={() => window.open(`https://www.google.com/maps?q=${dest.latitude},${dest.longitude}`, '_blank')}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-3 rounded flex items-center justify-center gap-2 transition-colors"
                >
                  <Icon name="location" className="h-4 w-4" />
                  Maps
                </button>
              )}
              <button
                onClick={() => {
                  const query = encodeURIComponent(`${dest.name} ${dest.city} ${dest.country}`);
                  window.open(`https://www.google.com/search?q=${query}`, '_blank');
                }}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-sm py-2 px-3 rounded flex items-center justify-center gap-2 transition-colors"
              >
                <Icon name="search" className="h-4 w-4" />
                Search
              </button>
              <button
                onClick={() => {
                  const query = encodeURIComponent(`hotels near ${dest.name} ${dest.city}`);
                  window.open(`https://www.booking.com/searchresults.html?ss=${query}`, '_blank');
                }}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-2 px-3 rounded flex items-center justify-center gap-2 transition-colors"
              >
                <Icon name="home" className="h-4 w-4" />
                Hotels
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Route Tab with route optimization details
const RouteTab = ({ optimizedRoute, hasGPS }) => {
  if (!hasGPS) {
    return (
      <div className="text-center py-12">
        <Icon name="location" className="h-16 w-16 mx-auto text-gray-600 mb-4" />
        <h3 className="text-xl text-gray-400 mb-2">No GPS data available</h3>
        <p className="text-gray-500">Add locations with GPS coordinates to see route optimization.</p>
      </div>
    );
  }

  const gpsLocations = optimizedRoute.filter(d => d.latitude && d.longitude);
  let totalDistance = 0;
  const segments = [];

  for (let i = 0; i < gpsLocations.length - 1; i++) {
    const current = gpsLocations[i];
    const next = gpsLocations[i + 1];
    const distance = calculateDistance(current.latitude, current.longitude, next.latitude, next.longitude);
    totalDistance += distance;
    segments.push({
      from: current,
      to: next,
      distance: Math.round(distance * 10) / 10
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-white">Optimized Route</h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-400">{Math.round(totalDistance * 10) / 10}km</div>
          <div className="text-sm text-gray-400">Total distance</div>
        </div>
      </div>

      {/* Route Segments */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h4 className="text-lg font-bold text-white mb-4">Route Segments</h4>
        <div className="space-y-4">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg">
              <div className="flex-shrink-0">
                <div className="text-2xl font-bold text-indigo-400">{index + 1}</div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="font-semibold text-white">{segment.from.name}</div>
                  <Icon name="arrow-right" className="h-4 w-4 text-gray-400" />
                  <div className="font-semibold text-white">{segment.to.name}</div>
                </div>
                <div className="text-gray-400 text-sm">
                  {segment.from.city}, {segment.from.country} → {segment.to.city}, {segment.to.country}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="font-bold text-green-400">{segment.distance}km</div>
                </div>
                <button
                  onClick={() => {
                    window.open(`https://www.google.com/maps/dir/${segment.from.latitude},${segment.from.longitude}/${segment.to.latitude},${segment.to.longitude}`, '_blank');
                  }}
                  className="p-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                  title="Get directions"
                >
                  <Icon name="navigation" className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Route Button */}
      <div className="text-center">
        <button
          onClick={() => {
            const waypoints = gpsLocations.slice(1, -1).map(d => `${d.latitude},${d.longitude}`).join('|');
            const origin = gpsLocations[0];
            const destination = gpsLocations[gpsLocations.length - 1];
            window.open(`https://www.google.com/maps/dir/${origin.latitude},${origin.longitude}/${destination.latitude},${destination.longitude}/${waypoints ? `data=!4m2!4m1!3e0` : ''}`, '_blank');
          }}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg flex items-center gap-2 mx-auto transition-colors"
        >
          <Icon name="route" className="h-5 w-5" />
          View Complete Route on Google Maps
        </button>
      </div>
    </div>
  );
};

export default MultiTierCineVoyageApp;