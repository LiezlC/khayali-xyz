'use client';

/*
 * Extended Integration Demo
 *
 * This file brings together the movie watchlist, travel planner and AI‑powered
 * location scraping into a single React application. It is based on the
 * Firebase‑powered prototype (CineVoyage.js) but adapted to use Supabase as
 * the backend and the location scraping pipeline defined in integration_demo.js.
 *
 * The goal is to illustrate how you can embed the scraping service into a
 * cohesive user interface: users search for movies, build a watchlist, discover
 * filming locations with AI, and then generate trips from those locations.
 *
 * Note: This code is for demonstration purposes and omits error handling,
 * loading states and styling for brevity. In a real application you would
 * modularise further and handle edge cases gracefully.
 */

import React, { useState, useEffect } from 'react';
import { supabase } from './integration_demo'; // Supabase client from integration_demo.js
import { locationScraper } from './integration_demo'; // Scraping service from integration_demo.js

// TMDB API helpers (simplified)
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const tmdbSearch = async (query) => {
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`);
  const json = await res.json();
  return json.results || [];
};

// Main application component
export default function CineVoyageApp() {
  const [page, setPage] = useState('watchlist');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const navigate = (p, data = {}) => {
    if (p === 'locations') setSelectedMovie(data.movie);
    if (p === 'tripDetails') setSelectedTrip(data.trip);
    setPage(p);
  };

  return (
    <div className="min-h-screen text-gray-100 bg-gray-900">
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">CineVoyage</h1>
        <nav className="space-x-4">
          <button onClick={() => navigate('watchlist')}>Watchlist</button>
          <button onClick={() => navigate('travel')}>Travel Planner</button>
        </nav>
      </header>
      <main className="p-4">
        {page === 'watchlist' && <WatchlistPage onNavigate={navigate} />}
        {page === 'locations' && selectedMovie && <LocationScraperPage movie={selectedMovie} onNavigate={navigate} />}
        {page === 'travel' && <TravelPlannerPage onNavigate={navigate} />}
        {page === 'tripDetails' && selectedTrip && <TripDetailsPage trip={selectedTrip} onNavigate={navigate} />}
      </main>
    </div>
  );
}

// Watchlist page: search movies and manage watchlist
function WatchlistPage({ onNavigate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  // Fetch watchlist from Supabase
  useEffect(() => {
    const fetchWatchlist = async () => {
      const { data } = await supabase.from('watchlist').select('*');
      setWatchlist(data || []);
    };
    fetchWatchlist();
    // Subscribe to realtime updates (optional)
    const channel = supabase
      .channel('public:watchlist')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'watchlist' }, payload => {
        fetchWatchlist();
      })
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    const results = await tmdbSearch(searchTerm);
    setSearchResults(results);
  };

  const addMovie = async (movie) => {
    await supabase.from('movies').insert({
      tmdb_id: movie.id,
      title: movie.title,
      poster_url: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
      release_date: movie.release_date,
      overview: movie.overview
    });
    const { data: movieRow } = await supabase.from('movies').select('id').eq('tmdb_id', movie.id).single();
    await supabase.from('watchlist').insert({ movie_id: movieRow.id, rating: 0, status: 'to-watch' });
    setSearchTerm('');
    setSearchResults([]);
  };

  const updateRating = async (watchlistId, rating) => {
    await supabase.from('watchlist').update({ rating }).eq('id', watchlistId);
  };

  const removeFromWatchlist = async (id) => {
    await supabase.from('watchlist').delete().eq('id', id);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Watchlist</h2>
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search movies..."
        className="flex-grow p-2 rounded bg-gray-800 text-white"
      />
      <button type="submit" className="bg-indigo-600 px-4 py-2 rounded">Search</button>
      </form>
      {searchResults.length > 0 && (
        <div className="bg-gray-800 p-4 rounded mb-4">
          <h3 className="font-bold mb-2">Results</h3>
          <ul>
            {searchResults.map(m => (
              <li key={m.id} className="flex justify-between items-center py-1 border-b border-gray-700">
                <span>{m.title} ({m.release_date?.split('-')[0] || ''})</span>
                <button onClick={() => addMovie(m)} className="bg-green-600 px-2 py-1 rounded">Add</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {watchlist.map(item => (
          <MovieCard
            key={item.id}
            item={item}
            onRate={updateRating}
            onRemove={removeFromWatchlist}
            onFindLocations={() => {
              // Fetch movie details to pass title/year to scraper
              (async () => {
                const { data: movie } = await supabase.from('movies').select('*').eq('id', item.movie_id).single();
                onNavigate('locations', { movie });
              })();
            }}
          />
        ))}
      </div>
    </div>
  );
}

function MovieCard({ item, onRate, onRemove, onFindLocations }) {
  return (
    <div className="bg-gray-800 p-4 rounded shadow">
      <h4 className="font-bold text-lg">{item.title}</h4>
      <div className="flex items-center my-2">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            onClick={() => onRate(item.id, (i + 1) * 2)}
            className={`cursor-pointer ${i < item.rating / 2 ? 'text-yellow-400' : 'text-gray-600'}`}
          >★</span>
        ))}
        <span className="ml-2">{item.rating}/10</span>
      </div>
      <div className="flex gap-2">
        <button onClick={onFindLocations} className="bg-indigo-600 px-2 py-1 rounded text-sm">Find Locations</button>
        <button onClick={() => onRemove(item.id)} className="bg-red-600 px-2 py-1 rounded text-sm">Remove</button>
      </div>
    </div>
  );
}

// LocationScraperPage: display AI‑scraped locations and allow trip creation
function LocationScraperPage({ movie, onNavigate }) {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tripTitle, setTripTitle] = useState(`${movie.title} Filming Locations Trip`);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const enriched = await locationScraper.enrichMovieWithLocations(
          movie.id,
          movie.title,
          new Date(movie.release_date).getFullYear()
        );
        setLocations(enriched);
      } finally {
        setLoading(false);
      }
    })();
  }, [movie.id]);

  const createTrip = async () => {
    if (locations.length === 0) return;
    const { data: trip } = await supabase.from('trips').insert({
      title: tripTitle,
      description: `A trip to visit filming locations of ${movie.title}`,
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date(new Date().setDate(new Date().getDate() + locations.length)).toISOString().split('T')[0]
    }).select().single();
    // Insert destinations
    await Promise.all(locations.map((loc, i) =>
      supabase.from('destinations').insert({
        trip_id: trip.id,
        name: loc.location_name,
        location: `${loc.city}, ${loc.country}`,
        latitude: loc.latitude,
        longitude: loc.longitude,
        description: loc.scene_description,
        order_index: i
      })
    ));
    alert('Trip created!');
    onNavigate('travel');
  };

  return (
    <div>
      <button onClick={() => onNavigate('watchlist')} className="mb-2">← Back</button>
      <h2 className="text-xl font-bold mb-2">Filming Locations for {movie.title}</h2>
      {loading ? <p>Loading...</p> : (
        <div>
          <ul className="space-y-2 mb-4">
            {locations.map((loc, i) => (
              <li key={i} className="bg-gray-800 p-3 rounded">
                <h4 className="font-semibold">{loc.location_name}</h4>
                <p className="text-sm text-gray-400">{loc.city}, {loc.country}</p>
                <p className="text-sm">{loc.scene_description}</p>
              </li>
            ))}
          </ul>
          <input
            value={tripTitle}
            onChange={e => setTripTitle(e.target.value)}
            className="p-2 bg-gray-800 rounded w-full mb-2"
          />
          <button onClick={createTrip} className="bg-green-600 px-4 py-2 rounded">Create Trip from Locations</button>
        </div>
      )}
    </div>
  );
}

// TravelPlannerPage: list trips and create new ones
function TravelPlannerPage({ onNavigate }) {
  const [trips, setTrips] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchTrips = async () => {
      const { data } = await supabase.from('trips').select('*');
      setTrips(data || []);
    };
    fetchTrips();
    const channel = supabase
      .channel('public:trips')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'trips' }, payload => fetchTrips())
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">My Trips</h2>
        <button onClick={() => setShowForm(!showForm)} className="bg-indigo-600 px-2 py-1 rounded">{showForm ? 'Cancel' : 'New Trip'}</button>
      </div>
      {showForm && <TripForm onSuccess={() => setShowForm(false)} />}
      <ul className="space-y-2">
        {trips.map(trip => (
          <li key={trip.id} className="bg-gray-800 p-3 rounded cursor-pointer" onClick={() => onNavigate('tripDetails', { trip })}>
            <h4 className="font-semibold">{trip.title}</h4>
            <p className="text-sm text-gray-400">{trip.start_date} – {trip.end_date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// TripForm: create a new trip manually
function TripForm({ onSuccess }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('trips').insert({ title, description, start_date: startDate, end_date: endDate });
    if (!error && onSuccess) onSuccess();
    setTitle(''); setDescription(''); setStartDate(''); setEndDate('');
  };
  return (
    <form onSubmit={submit} className="bg-gray-800 p-3 rounded mb-4">
      <input className="p-2 mb-2 w-full bg-gray-700 rounded" value={title} onChange={e => setTitle(e.target.value)} placeholder="Trip title" required />
      <textarea className="p-2 mb-2 w-full bg-gray-700 rounded" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <input className="p-2 mb-2 w-full bg-gray-700 rounded" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
      <input className="p-2 mb-2 w-full bg-gray-700 rounded" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
      <button type="submit" className="bg-green-600 px-4 py-2 rounded">Create</button>
    </form>
  );
}

// TripDetailsPage: view destinations and activities
function TripDetailsPage({ trip, onNavigate }) {
  const [destinations, setDestinations] = useState([]);
  useEffect(() => {
    const fetchDest = async () => {
      const { data } = await supabase.from('destinations').select('*').eq('trip_id', trip.id).order('order_index');
      setDestinations(data || []);
    };
    fetchDest();
    const channel = supabase
      .channel(`public:destinations:trip_${trip.id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'destinations', filter: `trip_id=eq.${trip.id}` }, payload => fetchDest())
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [trip.id]);
  return (
    <div>
      <button onClick={() => onNavigate('travel')} className="mb-2">← Back</button>
      <h2 className="text-xl font-bold mb-2">{trip.title}</h2>
      <ul className="space-y-2">
        {destinations.map(dest => (
          <li key={dest.id} className="bg-gray-800 p-3 rounded">
            <h4 className="font-semibold">{dest.name}</h4>
            <p className="text-sm">{dest.description}</p>
            <p className="text-sm text-gray-400">{dest.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}