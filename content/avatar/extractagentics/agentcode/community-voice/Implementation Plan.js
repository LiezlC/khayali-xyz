Implementation Plan

1. Backend Setup with Supabase
First, set up your Supabase project and create the necessary database tables:

Authentication
Enable Supabase authentication for user management
Database Schema
Movie Watchlist Tables:

-- Movies table (stores movie details)
CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  tmdb_id INTEGER UNIQUE,  -- ID from The Movie Database API
  title TEXT NOT NULL,
  poster_url TEXT,
  release_date DATE,
  overview TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User watchlist
CREATE TABLE watchlist (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
  rating DECIMAL(2,1) CHECK (rating >= 0 AND rating <= 10),
  status TEXT DEFAULT 'to-watch', -- to-watch, watching, watched
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, movie_id)
);

Travel Planner Tables:

-- Trips
CREATE TABLE trips (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Destinations
CREATE TABLE destinations (
  id SERIAL PRIMARY KEY,
  trip_id INTEGER REFERENCES trips(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  location TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Activities
CREATE TABLE activities (
  id SERIAL PRIMARY KEY,
  destination_id INTEGER REFERENCES destinations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  location TEXT,
  notes TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Trip notes
CREATE TABLE trip_notes (
  id SERIAL PRIMARY KEY,
  trip_id INTEGER REFERENCES trips(id) ON DELETE CASCADE,
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

2. Frontend Development with Bolt

Create a Bolt project with the following structure:

src/
├── components/
│   ├── Layout/
│   │   ├── Header.js
│   │   └── Navigation.js
│   ├── Auth/
│   │   ├── Login.js
│   │   └── Register.js
│   ├── Movies/
│   │   ├── MovieSearch.js
│   │   ├── MovieList.js
│   │   ├── Watchlist.js
│   │   └── MovieDetails.js
│   ├── Travel/
│   │   ├── TripList.js
│   │   ├── TripForm.js
│   │   ├── TripDetails.js
│   │   ├── DestinationList.js
│   │   ├── ActivityList.js
│   │   └── TripNotes.js
│   └── UI/
│       ├── Rating.js
│       └── LoadingSpinner.js
├── pages/
│   ├── Home.js
│   ├── Movies.js
│   ├── Travel.js
│   └── Profile.js
├── services/
│   ├── supabase.js
│   ├── movieService.js
│   ├── travelService.js
│   └── openaiService.js
├── hooks/
│   ├── useAuth.js
│   ├── useWatchlist.js
│   └── useTrips.js
└── App.js


3. Key Features Implementation

Movie Watchlist Features
Movie Search
Integrate with The Movie Database (TMDB) API for movie data
Search by title, genre, etc.
Display search results with posters and basic info
Watchlist Management
Add movies to watchlist
Update movie status (to-watch, watching, watched)
Rate movies (1-10 scale)
Add personal notes
Remove movies from watchlist
AI Integration (OpenAI)
Generate movie recommendations based on user''s watchlist and ratings
Create personalized movie reviews or summaries
Travel Itinerary Planner Features
Trip Management
Create new trips with title, dates, and description
View all user trips
Edit and delete trips
Destination Management
Add destinations to trips
Reorder destinations
Add destination details and descriptions
Activity Planning
Add activities to each destination
Schedule activities with dates and times
Add activity details and notes
Reorder activities within a destination
Trip Notes
Add general notes about the trip
Attach notes to specific destinations or activities
AI Integration (OpenAI)
Generate destination recommendations based on trip preferences
Suggest activities based on destination and user interests
Optimize itinerary timing and logistics
Provide travel tips and information about destinations

4. API Integration
Supabase Integration

// services/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

TMDB API Integration (for movies)

// services/movieService.js
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const searchMovies = async (query) => {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  return response.json();
};

export const getMovieDetails = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  return response.json();
};

OpenAI Integration

// services/openaiService.js
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const getMovieRecommendations = async (watchlist) => {
  // Format watchlist data for the prompt
  const prompt = `Based on these movies in my watchlist: ${JSON.stringify(watchlist)}, recommend 5 similar movies I might enjoy. Provide the title, year, and a brief reason for each recommendation.`;
  
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 500,
  });
  
  return response.data.choices[0].text;
};

export const generateTravelItinerary = async (destination, days, interests) => {
  const prompt = `Create a ${days}-day itinerary for ${destination} for someone interested in ${interests}. Include specific activities, timing suggestions, and local tips.`;
  
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 1000,
  });
  
  return response.data.choices[0].text;
};

5. Sample Component Implementation
Movie Search Component

// components/Movies/MovieSearch.js
import React, { useState } from 'react';
import { searchMovies } from '../../services/movieService';
import MovieList from './MovieList';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const response = await searchMovies(query);
      setMovies(response.results);
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="movie-search">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
        />
        <button type="submit" disabled={loading}>
          Search
        </button>
      </form>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  );
};

export default MovieSearch;

Trip Form Component

// components/Travel/TripForm.js
import React, { useState } from 'react';
import { createTrip } from '../../services/travelService';

const TripForm = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await createTrip({
        title,
        description,
        start_date: startDate,
        end_date: endDate
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error creating trip:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="trip-form">
      <h2>Create New Trip</h2>
      
      <div className="form-group">
        <label htmlFor="title">Trip Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <input
          id="startDate"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="endDate">End Date</label>
        <input
          id="endDate"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>
      
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Trip'}
      </button>
    </form>
  );
};

export default TripForm;


6. Deployment
Frontend Deployment
Deploy the Bolt frontend to Vercel, Netlify, or similar platforms
Set environment variables for API keys
Backend Configuration
Set up Row Level Security (RLS) in Supabase to protect user data
Create proper indexes for frequently queried columns
Set up storage for movie posters and travel images if needed

7. Next Steps & Enhancements
Additional Features
Social features (share watchlists or trip itineraries)
Movie trailers integration
Travel budget tracking
Weather integration for travel planning
Maps integration for travel destinations
Performance Optimizations
Implement caching for frequently accessed data
Add pagination for large datasets
Optimize database queries
UI/UX Improvements
Add animations and transitions
Implement dark mode
Make the app responsive for all device sizes