'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInAnonymously, signInWithCustomToken } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, getDocs, query, where, onSnapshot, updateDoc, deleteDoc } from "firebase/firestore";

// --- API & MOCK DATA ---
const GEMINI_API_KEY = ""; // IMPORTANT: Leave this blank. It will be provided by the environment.

// Mock Movie data
const mockMovies = [
    { id: 1, tmdb_id: 278, title: 'The Shawshank Redemption', poster_url: 'https://placehold.co/300x450/2c3e50/ffffff?text=Shawshank', release_date: '1994-09-23', overview: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.' },
    { id: 2, tmdb_id: 680, title: 'Pulp Fiction', poster_url: 'https://placehold.co/300x450/e74c3c/ffffff?text=Pulp+Fiction', release_date: '1994-10-14', overview: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.' },
    { id: 3, tmdb_id: 13, title: 'Forrest Gump', poster_url: 'https://placehold.co/300x450/3498db/ffffff?text=Forrest+Gump', release_date: '1994-07-06', overview: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.' },
    { id: 4, tmdb_id: 155, title: 'The Dark Knight', poster_url: 'https://placehold.co/300x450/1f2c39/ffffff?text=The+Dark+Knight', release_date: '2008-07-18', overview: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.' },
    { id: 5, tmdb_id: 550, title: 'Fight Club', poster_url: 'https://placehold.co/300x450/e67e22/ffffff?text=Fight+Club', release_date: '1999-10-15', overview: 'An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker and they form an underground fight club that evolves into something much, much more.'}
];

// Mock Scraped Locations - Used as a fallback
const mockScrapedLocations = {
    278: [ // The Shawshank Redemption
        { id: 'mock8', name: 'Ohio State Reformatory', city: 'Mansfield', country: 'USA', scene_description: 'Served as the filming location for the Shawshank State Penitentiary.' },
        { id: 'mock9', name: 'Pugh Cabin at Malabar Farm', city: 'Lucas', country: 'USA', scene_description: 'The opening scene where Andy Dufresne sits in his car was filmed here.' },
    ],
    680: [ // Pulp Fiction
        { id: 'mock10', name: 'Hawthorne Grill', city: 'Hawthorne', country: 'USA', scene_description: 'The diner used for the opening and closing scenes of the film.' },
    ],
    155: [ // The Dark Knight
        { id: 'mock1', name: 'Willis Tower (Sears Tower)', city: 'Chicago', country: 'USA', scene_description: 'Used for the exterior shots of Wayne Enterprises headquarters.' },
        { id: 'mock2', name: 'The Berghoff Restaurant', city: 'Chicago', country: 'USA', scene_description: 'Where Gotham Major Crimes Unit arrests a large number of mobsters.' },
        { id: 'mock3', name: 'LaSalle Street', city: 'Chicago', country: 'USA', scene_description: 'The location for the dramatic truck flip scene during the chase.' },
        { id: 'mock4', name: 'IFC Building', city: 'Hong Kong', country: 'China', scene_description: 'Batman leaps from this skyscraper in a daring extradition scene.' },
    ],
    13: [ // Forrest Gump
        { id: 'mock5', name: 'Chippewa Square', city: 'Savannah', country: 'USA', scene_description: 'Where Forrest sits on a bench telling his life story. The bench itself was a prop.' },
        { id: 'mock6', name: 'Lincoln Memorial', city: 'Washington D.C.', country: 'USA', scene_description: 'Forrest gives a speech at the anti-war rally and wades into the reflecting pool.' },
        { id: 'mock7', name: 'Marshall Point Lighthouse', city: 'Port Clyde', country: 'USA', scene_description: 'The lighthouse Forrest runs to on his cross-country journey, marking his turn-around point.' },
    ],
    550: [ // Fight Club
        { id: 'mock11', name: '155 S. Figueroa Street', city: 'Los Angeles', country: 'USA', scene_description: 'The corporate office building where the Narrator works.' },
        { id: 'mock12', name: 'Paper Street', city: 'San Pedro', country: 'USA', scene_description: 'The dilapidated house where the Fight Club is based was built on an empty lot here.' },
    ]
};


// --- FIREBASE CONFIGURATION ---
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-cinevoyage-app';

// --- REACT CONTEXT FOR AUTH & DB ---
const FirebaseContext = createContext(null);
const FirebaseProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [db, setDb] = useState(null);
    const [user, setUser] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    useEffect(() => {
        const app = initializeApp(firebaseConfig);
        const authInstance = getAuth(app);
        const dbInstance = getFirestore(app);
        setAuth(authInstance);
        setDb(dbInstance);
        const unsubscribe = onAuthStateChanged(authInstance, async (user) => {
            if (user) {
                setUser(user);
            } else {
                try {
                    if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                        await signInWithCustomToken(authInstance, __initial_auth_token);
                    } else {
                        await signInAnonymously(authInstance);
                    }
                } catch (error) {
                    console.error("Authentication failed:", error);
                }
            }
            setIsAuthReady(true);
        });
        return () => unsubscribe();
    }, []);

    return (
        <FirebaseContext.Provider value={{ auth, db, user, isAuthReady }}>
            {children}
        </FirebaseContext.Provider>
    );
};
const useFirebase = () => useContext(FirebaseContext);

// --- HELPER COMPONENTS ---
const Icon = ({ name, className }) => {
    const icons = {
        movie: "M14.752 2.092a.5.5 0 0 0-.498.31l-3.633 7.48-8.22-1.92a.5.5 0 0 0-.58.573l2.005 8.219-7.48 3.633a.5.5 0 0 0-.31.498.5.5 0 0 0 .498.498l7.48 1.068 1.92 8.22a.5.5 0 0 0 .573.58l8.219-2.005 3.633 7.48a.5.5 0 0 0 .498.31.5.5 0 0 0 .498-.498l1.068-7.48 8.22-1.92a.5.5 0 0 0 .58-.573l-2.005-8.219 7.48-3.633a.5.5 0 0 0 .31-.498.5.5 0 0 0-.498-.498l-7.48-1.068-1.92-8.22a.5.5 0 0 0-.573-.58L15.25 4.1l-3.633-7.48a.5.5 0 0 0-.498-.31.5.5 0 0 0-.367.182z",
        travel: "M8 16.016a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V12h-7v4.016zm0-5h7V7.016a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0-.5.5V11zm-1-5a.5.5 0 0 0 .5-.5h8a.5.5 0 0 0 .5.5v10a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5h-10a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5z",
        search: "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
        add: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
        star: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
        location: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
        plane: "M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z",
        notes: "M3 18h12v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z",
        trash: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",
        edit: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
        retry: "M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM5 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C14.03 4.46 12.57 4 11 4c-4.42 0-8 3.58-8 8H0l4 4 4-4H5z",
        share: "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z",
        calendar: "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z",
        map: "M20.5 3l-6.5 18-6.5-18L20.5 3zM12 21.35l5.5-15.98-11 .01L12 21.35z",
        camera: "M9.4 16.6L4.8 12l-1.4 1.4L9.4 19.4l12-12-1.4-1.4-10.6 10.6z",
        lightbulb: "M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z",
        magic_wand: "M20.8 15.2l-2.5-2.5.1-.1c.5-1 .2-2.2-.8-3.2s-2.2-1.3-3.2-.8l-.1.1-3.8-3.8-1.1 1.1 3.8 3.8.1-.1c1-.5 2.2-.2 3.2.8s1.3 2.2.8 3.2l-.1.1 2.5 2.5c.2.2.5.2.7 0l.7-.7c.2-.2.2-.5 0-.7zM3 21l8-8-2-2-8 8 2 2z"
    };
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="currentColor"><path d={icons[name] || ''}></path></svg>;
};
const LoadingSpinner = ({ text = 'Loading...' }) => (
    <div className="flex flex-col justify-center items-center p-8 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
        <p className="mt-4 text-lg text-gray-300">{text}</p>
    </div>
);

// --- MAIN APP LAYOUT & NAVIGATION ---
function App() {
    const [currentPage, setCurrentPage] = useState('watchlist');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const navigateTo = (page, data = {}) => {
        if (page === 'locations') setSelectedMovie(data.movie);
        if (page === 'tripDetails') setSelectedTrip(data.trip);
        setCurrentPage(page);
    };
    return (
        <FirebaseProvider>
            <div className="bg-gray-900 text-white min-h-screen font-sans">
                <Header onNavigate={navigateTo} />
                <main className="p-4 md:p-8 max-w-7xl mx-auto">
                    {currentPage === 'watchlist' && <WatchlistPage onNavigate={navigateTo} />}
                    {currentPage === 'locations' && <LocationScraperPage movie={selectedMovie} onNavigate={navigateTo} />}
                    {currentPage === 'travel' && <TravelPlannerPage onNavigate={navigateTo} />}
                    {currentPage === 'tripDetails' && <TripDetailsPage trip={selectedTrip} onNavigate={navigateTo} />}
                </main>
            </div>
        </FirebaseProvider>
    );
}
const Header = ({ onNavigate }) => (
    <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
                <div className="flex items-center"><Icon name="movie" className="h-8 w-8 text-indigo-400" /><h1 className="text-2xl font-bold ml-3 text-gray-100">CineVoyage</h1></div>
                <nav className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                        <button onClick={() => onNavigate('watchlist')} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Movie Watchlist</button>
                        <button onClick={() => onNavigate('travel')} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Travel Planner</button>
                    </div>
                </nav>
            </div>
        </div>
    </header>
);

// --- 1. MOVIE WATCHLIST COMPONENT ---
const WatchlistPage = ({ onNavigate }) => {
    const { db, user, isAuthReady } = useFirebase();
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    useEffect(() => {
        if (!isAuthReady || !db || !user) return;
        setLoading(true);
        const watchlistCol = collection(db, `artifacts/${appId}/users/${user.uid}/watchlist`);
        const unsubscribe = onSnapshot(watchlistCol, (snapshot) => {
            const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setWatchlist(list);
            setLoading(false);
        }, (error) => { console.error("Error fetching watchlist:", error); setLoading(false); });
        return () => unsubscribe();
    }, [isAuthReady, db, user]);
    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) { setSearchResults([]); return; }
        const results = mockMovies.filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()));
        setSearchResults(results);
    };
    const addToWatchlist = async (movie) => {
        if (!db || !user) return;
        const watchlistItem = { tmdb_id: movie.tmdb_id, title: movie.title, poster_url: movie.poster_url, release_date: movie.release_date, rating: 0, status: 'to-watch' };
        const watchlistCol = collection(db, `artifacts/${appId}/users/${user.uid}/watchlist`);
        await addDoc(watchlistCol, watchlistItem);
        setSearchTerm('');
        setSearchResults([]);
    };
    
    const updateRating = async (id, newRating) => {
        setWatchlist(currentWatchlist =>
            currentWatchlist.map(movie =>
                movie.id === id ? { ...movie, rating: newRating } : movie
            )
        );
        if (!db || !user) return;
        const docRef = doc(db, `artifacts/${appId}/users/${user.uid}/watchlist`, id);
        try {
            await updateDoc(docRef, { rating: newRating });
        } catch (error) {
            console.error("Failed to save rating to Firestore:", error);
        }
    };

    const deleteFromWatchlist = async (id) => {
        if (!db || !user) return;
        const docRef = doc(db, `artifacts/${appId}/users/${user.uid}/watchlist`, id);
        await deleteDoc(docRef);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-indigo-400">My Movie Watchlist</h2>
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl mb-8">
                <form onSubmit={handleSearch} className="flex gap-4"><input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search for movies to add..." className="flex-grow bg-gray-700 text-white placeholder-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" /><button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md flex items-center gap-2 transition-colors"><Icon name="search" className="h-5 w-5" /> Search</button></form>
                {searchResults.length > 0 && (<div className="mt-4 bg-gray-700 rounded-lg p-4"><h3 className="text-lg font-semibold mb-2">Search Results</h3><ul>{searchResults.map(movie => (<li key={movie.id} className="flex items-center justify-between p-2 hover:bg-gray-600 rounded-md"><span>{movie.title} ({movie.release_date.split('-')[0]})</span><button onClick={() => addToWatchlist(movie)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded-md flex items-center gap-1 text-sm"><Icon name="add" className="h-4 w-4" /> Add</button></li>))}</ul></div>)}
            </div>
            {loading ? <LoadingSpinner /> : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">{watchlist.map(movie => (<MovieCard key={movie.id} movie={movie} onNavigate={onNavigate} onUpdateRating={updateRating} onDelete={deleteFromWatchlist} />))}</div>
                    {watchlist.length > 0 && <SmartRecommendations watchlist={watchlist} />}
                </>
            )}
        </div>
    );
};

const MovieCard = ({ movie, onNavigate, onUpdateRating, onDelete }) => (
    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
        <img src={movie.poster_url} alt={movie.title} className="w-full h-64 object-cover" />
        <div className="p-4 flex flex-col flex-grow">
            <h3 className="font-bold text-lg truncate">{movie.title}</h3>
            <p className="text-sm text-gray-400">{movie.release_date.split('-')[0]}</p>
            <div className="flex items-center my-3">
                {[...Array(5)].map((_, i) => (
                    <button 
                        key={i} 
                        onClick={() => onUpdateRating(movie.id, (i + 1) * 2)}
                        className="p-1 bg-transparent border-none cursor-pointer"
                        aria-label={`Rate ${i + 1} stars`}
                    >
                        <Icon 
                            name="star" 
                            className={`h-6 w-6 ${i < movie.rating / 2 ? 'text-yellow-400' : 'text-gray-600'}`} 
                        />
                    </button>
                ))}
                <span className="ml-2 text-gray-300">{movie.rating}/10</span>
            </div>
            <div className="flex flex-col space-y-2 mt-auto">
                <button 
                    onClick={() => onNavigate('locations', { movie })} 
                    disabled={movie.rating === 0}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors text-sm disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    <Icon name="location" className="h-4 w-4" /> Find Locations
                </button>
                <button onClick={() => onDelete(movie.id)} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors text-sm"><Icon name="trash" className="h-4 w-4" /> Remove</button>
            </div>
        </div>
    </div>
);

// --- 2. LOCATION SCRAPER & PLANNER ---
const LocationScraperPage = ({ movie, onNavigate }) => {
    const { db, user } = useFirebase();
    const [locations, setLocations] = useState([]);
    const [status, setStatus] = useState('idle'); // idle, processing, completed, failed
    const [processingMessage, setProcessingMessage] = useState('');
    const [trips, setTrips] = useState([]);
    const [showTripModal, setShowTripModal] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [newTripTitle, setNewTripTitle] = useState('');
    const [modalView, setModalView] = useState('select'); // 'select' or 'create'

    useEffect(() => {
        if (!user || !db) return;
        const tripsCol = collection(db, `artifacts/${appId}/users/${user.uid}/trips`);
        const unsubscribe = onSnapshot(tripsCol, (snapshot) => {
            setTrips(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribe();
    }, [db, user]);

    const handleEnrichMovie = async () => {
        setStatus('processing');
        setProcessingMessage('Contacting Gemini for filming locations...');
        try {
            const prompt = `Analyze the movie "${movie.title}" and identify its key filming locations. For each location, provide the location name, city, country, and a brief description of the scene filmed there. Return the response as a JSON array of objects, where each object has "name", "city", "country", and "scene_description" keys. If you cannot find any, return an empty array.`;
            
            let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = { 
                contents: chatHistory,
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: "ARRAY",
                        items: {
                            type: "OBJECT",
                            properties: {
                                "name": { "type": "STRING" },
                                "city": { "type": "STRING" },
                                "country": { "type": "STRING" },
                                "scene_description": { "type": "STRING" }
                            },
                            required: ["name", "city", "country", "scene_description"]
                        }
                    }
                }
            };
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`;
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                 const errorText = await response.text();
                throw new Error(`API call failed with status ${response.status}: ${errorText}`);
            }

            const resultText = await response.text();
            if (!resultText) {
                throw new Error("API returned an empty response body.");
            }
            const result = JSON.parse(resultText);
            
            if (result.candidates && result.candidates[0].content && result.candidates[0].content.parts[0]) {
                const textPart = result.candidates[0].content.parts[0].text;
                if (!textPart) throw new Error("API response is missing the text part.");
                const parsedLocations = JSON.parse(textPart);
                if (parsedLocations.length > 0) {
                    setLocations(parsedLocations.map((loc, index) => ({ ...loc, id: `api${index}` })));
                    setStatus('completed');
                } else {
                    throw new Error("AI returned no locations.");
                }
            } else {
                throw new Error("Invalid response structure from AI.");
            }
        } catch (error) {
            console.error("Gemini location finding failed:", error);
            // Fallback to mock data on failure
            setProcessingMessage('AI search failed. Checking our local database...');
            const mockData = mockScrapedLocations[movie.tmdb_id] || [];
            if (mockData.length > 0) {
                setLocations(mockData);
                setStatus('completed');
            } else {
                setStatus('failed');
            }
        }
    };

    const handleAddToTrip = (location) => {
        setSelectedLocation(location);
        setNewTripTitle(`${movie.title} Adventure`);
        setModalView(trips.length > 0 ? 'select' : 'create');
        setShowTripModal(true);
    };

    const confirmAddToTrip = async (tripId) => {
        if (!selectedLocation || !tripId || !db || !user) return;
        const destCol = collection(db, `artifacts/${appId}/users/${user.uid}/trips/${tripId}/destinations`);
        await addDoc(destCol, {
            name: selectedLocation.name,
            location: `${selectedLocation.city}, ${selectedLocation.country}`,
            description: selectedLocation.scene_description,
            order_index: 99
        });
        setShowTripModal(false);
        setSelectedLocation(null);
    };

    const handleCreateAndAdd = async (e) => {
        e.preventDefault();
        if (!newTripTitle || !selectedLocation || !db || !user) return;
        
        const tripsCol = collection(db, `artifacts/${appId}/users/${user.uid}/trips`);
        const newTripRef = await addDoc(tripsCol, {
            title: newTripTitle,
            description: `A trip inspired by the movie ${movie.title}.`,
            start_date: new Date().toISOString().split('T')[0],
            end_date: ''
        });

        const destCol = collection(db, `artifacts/${appId}/users/${user.uid}/trips/${newTripRef.id}/destinations`);
        await addDoc(destCol, {
            name: selectedLocation.name,
            location: `${selectedLocation.city}, ${selectedLocation.country}`,
            description: selectedLocation.scene_description,
            order_index: 0
        });

        setShowTripModal(false);
        setSelectedLocation(null);
        setNewTripTitle('');
    };

    const renderContent = () => {
        switch (status) {
            case 'idle':
                return (
                    <div className="text-center py-12 bg-gray-800 rounded-lg shadow-xl">
                        <Icon name="location" className="h-16 w-16 mx-auto text-indigo-400 mb-4" />
                        <h3 className="text-2xl font-bold text-white">Find Filming Locations</h3>
                        <p className="text-gray-400 mt-2 mb-6 max-w-md mx-auto">Discover the real-world places where your favorite movies were shot. Our system will search for locations for "{movie.title}".</p>
                        <button onClick={handleEnrichMovie} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-md flex items-center justify-center gap-2 transition-colors mx-auto">
                            <Icon name="search" className="h-5 w-5" /> Start Search
                        </button>
                    </div>
                );
            case 'processing': return <LoadingSpinner text={processingMessage} />;
            case 'failed': return ( <div className="text-center py-12 bg-gray-800 rounded-lg"><p className="text-xl text-gray-300 mb-4">Could not find locations for this movie.</p><button onClick={handleEnrichMovie} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors mx-auto"><Icon name="retry" className="h-5 w-5" /> Retry</button></div>);
            case 'completed':
                return (
                    <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
                        <ul className="space-y-4">
                            {locations.map(loc => (
                                <li key={loc.id} className="p-4 bg-gray-700 rounded-md flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">{loc.name}</h3>
                                        <p className="text-indigo-300">{loc.city}, {loc.country}</p>
                                        <p className="mt-2 text-gray-300">{loc.scene_description}</p>
                                    </div>
                                    <button onClick={() => handleAddToTrip(loc)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors flex-shrink-0">
                                        <Icon name="add" className="h-5 w-5" /> Add to Trip
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div>
            <button onClick={() => onNavigate('watchlist')} className="mb-6 text-indigo-400 hover:text-indigo-200">&larr; Back to Watchlist</button>
            <h2 className="text-3xl font-bold text-indigo-400">Location Finder for <span className="text-white">{movie.title}</span></h2>
            <p className="text-gray-400 mt-2 mb-6">Powered by CineVoyage AI Location Intelligence.</p>
            {renderContent()}
            {showTripModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
                    <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full">
                        <h3 className="text-2xl font-bold mb-4">Add to Trip</h3>
                        {trips.length > 0 && (
                            <div className="flex border-b border-gray-600 mb-4">
                                <button onClick={() => setModalView('select')} className={`flex-1 py-2 text-center font-semibold ${modalView === 'select' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400'}`}>Add to Existing</button>
                                <button onClick={() => setModalView('create')} className={`flex-1 py-2 text-center font-semibold ${modalView === 'create' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400'}`}>Create New Trip</button>
                            </div>
                        )}
                        {modalView === 'select' && trips.length > 0 ? (
                            <div className="space-y-2 max-h-60 overflow-y-auto">
                                {trips.map(trip => (
                                    <button key={trip.id} onClick={() => confirmAddToTrip(trip.id)} className="w-full text-left p-3 bg-gray-700 hover:bg-indigo-600 rounded-md transition-colors">
                                        {trip.title}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <form onSubmit={handleCreateAndAdd}>
                                <label htmlFor="tripTitle" className="block text-sm font-medium text-gray-300 mb-2">New Trip Name</label>
                                <input id="tripTitle" type="text" value={newTripTitle} onChange={(e) => setNewTripTitle(e.target.value)} className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                                <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md">Create Trip & Add Location</button>
                            </form>
                        )}
                        <button onClick={() => setShowTripModal(false)} className="mt-6 w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- 3. TRAVEL ITINERARY PLANNER ---
const TravelPlannerPage = ({ onNavigate }) => {
    const { db, user, isAuthReady } = useFirebase();
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    useEffect(() => {
        if (!isAuthReady || !db || !user) return;
        setLoading(true);
        const tripsCol = collection(db, `artifacts/${appId}/users/${user.uid}/trips`);
        const unsubscribe = onSnapshot(tripsCol, (snapshot) => {
            const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTrips(list);
            setLoading(false);
        }, (error) => { console.error("Error fetching trips:", error); setLoading(false); });
        return () => unsubscribe();
    }, [isAuthReady, db, user]);
    const handleTripCreated = () => { setShowForm(false); };
    return (
        <div>
            <div className="flex justify-between items-center mb-6"><h2 className="text-3xl font-bold text-indigo-400">My Travel Plans</h2><button onClick={() => setShowForm(!showForm)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md flex items-center gap-2 transition-colors"><Icon name="add" className="h-5 w-5" /> {showForm ? 'Cancel' : 'New Trip'}</button></div>
            {showForm && <TripForm onSuccess={handleTripCreated} />}
            {loading ? <LoadingSpinner /> : (<div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{trips.map(trip => (<div key={trip.id} className="bg-gray-800 rounded-lg shadow-xl p-6 cursor-pointer transform hover:-translate-y-1 transition-transform" onClick={() => onNavigate('tripDetails', { trip })}><h3 className="text-xl font-bold text-white truncate">{trip.title}</h3><p className="text-sm text-indigo-300">{trip.start_date} to {trip.end_date}</p><p className="mt-2 text-gray-400 truncate">{trip.description}</p></div>))}</div>)}
        </div>
    );
};
const TripForm = ({ onSuccess }) => {
    const { db, user } = useFirebase();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!db || !user) return;
        setLoading(true);
        try {
            const tripsCol = collection(db, `artifacts/${appId}/users/${user.uid}/trips`);
            await addDoc(tripsCol, { title, description, start_date: startDate, end_date: endDate, });
            setTitle(''); setDescription(''); setStartDate(''); setEndDate('');
            if (onSuccess) onSuccess();
        } catch (error) { console.error("Error creating trip:", error); } finally { setLoading(false); }
    };
    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-xl mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Trip Title" required className="bg-gray-700 p-3 rounded-md" />
                <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="bg-gray-700 p-3 rounded-md md:col-span-2" />
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required className="bg-gray-700 p-3 rounded-md" />
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required className="bg-gray-700 p-3 rounded-md" />
            </div>
            <button type="submit" disabled={loading} className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition-colors">{loading ? 'Creating...' : 'Create Trip'}</button>
        </form>
    );
};

// --- 4. TRIP DETAILS PAGE ---
const TripDetailsPage = ({ trip, onNavigate }) => {
    const { db, user, isAuthReady } = useFirebase();
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editableTrip, setEditableTrip] = useState({ ...trip });
    const [showSocialShare, setShowSocialShare] = useState(false);
    
    // State for inline forms
    const [showActivityFormFor, setShowActivityFormFor] = useState(null);
    const [newActivityTitle, setNewActivityTitle] = useState("");
    const [showNoteFormFor, setShowNoteFormFor] = useState(null);
    const [newNoteText, setNewNoteText] = useState("");

    useEffect(() => {
        if (!isAuthReady || !db || !user || !trip) return;
        setLoading(true);
        const destCol = collection(db, `artifacts/${appId}/users/${user.uid}/trips/${trip.id}/destinations`);
        const unsubscribe = onSnapshot(query(destCol), async (destSnapshot) => {
            const destListPromises = destSnapshot.docs.map(async (destDoc) => {
                const destination = { id: destDoc.id, ...destDoc.data(), activities: [], notes: [] };
                
                const actCol = collection(db, `artifacts/${appId}/users/${user.uid}/trips/${trip.id}/destinations/${destDoc.id}/activities`);
                const actSnapshot = await getDocs(query(actCol));
                destination.activities = actSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                const noteCol = collection(db, `artifacts/${appId}/users/${user.uid}/trips/${trip.id}/destinations/${destDoc.id}/notes`);
                const noteSnapshot = await getDocs(query(noteCol));
                destination.notes = noteSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                return destination;
            });
            const destList = await Promise.all(destListPromises);
            setDestinations(destList);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [isAuthReady, db, user, trip]);

    const handleSaveChanges = async () => {
        if (!db || !user) return;
        const tripRef = doc(db, `artifacts/${appId}/users/${user.uid}/trips`, trip.id);
        await updateDoc(tripRef, {
            title: editableTrip.title,
            description: editableTrip.description,
            start_date: editableTrip.start_date,
            end_date: editableTrip.end_date,
        });
        setIsEditing(false);
    };
    
    const handleDeleteTrip = async () => {
        if (window.confirm("Are you sure you want to delete this entire trip? This cannot be undone.")) {
            if (!db || !user) return;
            const tripRef = doc(db, `artifacts/${appId}/users/${user.uid}/trips`, trip.id);
            await deleteDoc(tripRef);
            onNavigate('travel');
        }
    };

    const handleAddActivity = async (destinationId) => {
        if (!newActivityTitle.trim() || !db || !user) return;
        const actCol = collection(db, `artifacts/${appId}/users/${user.uid}/trips/${trip.id}/destinations/${destinationId}/activities`);
        await addDoc(actCol, { title: newActivityTitle });
        setNewActivityTitle("");
        setShowActivityFormFor(null);
    };
    
    const handleAddNote = async (destinationId) => {
        if (!newNoteText.trim() || !db || !user) return;
        const noteCol = collection(db, `artifacts/${appId}/users/${user.uid}/trips/${trip.id}/destinations/${destinationId}/notes`);
        await addDoc(noteCol, { text: newNoteText });
        setNewNoteText("");
        setShowNoteFormFor(null);
    };

    const handleDelete = async (path) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;
        if (!db || !user) return;
        const itemRef = doc(db, path);
        await deleteDoc(itemRef);
    };
    
    return (
        <div>
            <button onClick={() => onNavigate('travel')} className="mb-6 text-indigo-400 hover:text-indigo-200">&larr; Back to All Trips</button>
            
            {isEditing ? (
                <div className="bg-gray-800 p-6 rounded-lg mb-6">
                    <input type="text" value={editableTrip.title} onChange={e => setEditableTrip({...editableTrip, title: e.target.value})} className="text-3xl font-bold bg-gray-700 rounded-md p-2 w-full mb-2" />
                    <textarea value={editableTrip.description} onChange={e => setEditableTrip({...editableTrip, description: e.target.value})} className="text-gray-400 bg-gray-700 rounded-md p-2 w-full mb-4" />
                    <div className="flex gap-4">
                        <input type="date" value={editableTrip.start_date} onChange={e => setEditableTrip({...editableTrip, start_date: e.target.value})} className="bg-gray-700 p-2 rounded-md w-full" />
                        <input type="date" value={editableTrip.end_date} onChange={e => setEditableTrip({...editableTrip, end_date: e.target.value})} className="bg-gray-700 p-2 rounded-md w-full" />
                    </div>
                    <div className="flex gap-4 mt-4">
                        <button onClick={handleSaveChanges} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md">Save Changes</button>
                        <button onClick={() => setIsEditing(false)} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md">Cancel</button>
                    </div>
                </div>
            ) : (
                <div className="mb-6 flex flex-wrap gap-4 justify-between items-start">
                    <div>
                        <h2 className="text-3xl font-bold text-indigo-400">{trip.title}</h2>
                        <p className="text-gray-400 mt-2">{trip.description}</p>
                        <p className="text-sm text-indigo-300 mt-2">{trip.start_date} to {trip.end_date}</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                         <button onClick={() => { setEditableTrip({...trip}); setIsEditing(true); }} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md flex items-center gap-2">
                            <Icon name="edit" className="h-5 w-5" /> Edit
                        </button>
                        <button onClick={() => setShowSocialShare(true)} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-md flex items-center gap-2">
                            <Icon name="share" className="h-5 w-5" /> Share
                        </button>
                    </div>
                </div>
            )}
             {showSocialShare && <SocialShareModal onClose={() => setShowSocialShare(false)} tripTitle={trip.title} />}
             <div className="my-8 border-t border-gray-700 pt-6">
                <h3 className="text-2xl font-bold text-indigo-400 mb-4">Plan & Explore</h3>
                <div className="flex flex-wrap gap-4">
                    <a href={`data:text/calendar;charset=utf8,${encodeURIComponent(generateICS(trip, destinations))}`} download={`${trip.title}.ics`} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex items-center gap-2"><Icon name="calendar" className="h-5 w-5"/> Add to Calendar</a>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destinations.map(d => d.location).join(' | '))}`} target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md flex items-center gap-2"><Icon name="map" className="h-5 w-5"/> View on Google Maps</a>
                </div>
            </div>

            {loading ? <LoadingSpinner /> : (
                <div className="space-y-6">
                    {destinations.map(dest => (
                        <div key={dest.id} className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-2xl font-semibold text-white">{dest.name}</h3>
                            <p className="text-indigo-300 mt-1">{dest.location}</p>
                            <p className="text-gray-300 mt-2">{dest.description}</p>
                            
                            <SceneRecreation movieTitle={trip.title} sceneDescription={dest.description} />
                            
                            {/* Activities Section */}
                            <div className="mt-6">
                                <h4 className="text-lg font-semibold text-gray-200 mb-2">Activities</h4>
                                <div className="pl-4 border-l-2 border-indigo-500 space-y-3">
                                    {dest.activities.map(act => (
                                        <div key={act.id} className="bg-gray-700 p-3 rounded-md flex justify-between items-center">
                                            <p className="font-semibold">{act.title}</p>
                                            <button onClick={() => handleDelete(`artifacts/${appId}/users/${user.uid}/trips/${trip.id}/destinations/${dest.id}/activities/${act.id}`)} className="text-red-400 hover:text-red-300"><Icon name="trash" className="h-5 w-5"/></button>
                                        </div>
                                    ))}
                                    {showActivityFormFor === dest.id ? (
                                        <div className="bg-gray-700 p-3 rounded-md">
                                            <input type="text" value={newActivityTitle} onChange={e => setNewActivityTitle(e.target.value)} placeholder="New activity..." className="bg-gray-600 w-full p-2 rounded-md mb-2"/>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleAddActivity(dest.id)} className="bg-green-600 text-sm px-3 py-1 rounded">Save</button>
                                                <button onClick={() => setShowActivityFormFor(null)} className="bg-gray-500 text-sm px-3 py-1 rounded">Cancel</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button onClick={() => setShowActivityFormFor(dest.id)} className="text-indigo-400 hover:text-indigo-200 text-sm font-semibold">+ Add Activity</button>
                                    )}
                                </div>
                            </div>
                            
                            {/* Notes Section */}
                            <div className="mt-6">
                                <h4 className="text-lg font-semibold text-gray-200 mb-2">Notes</h4>
                                <div className="pl-4 border-l-2 border-gray-500 space-y-3">
                                    {dest.notes.map(note => (
                                        <div key={note.id} className="bg-gray-700 p-3 rounded-md flex justify-between items-center">
                                            <p className="text-gray-300">{note.text}</p>
                                            <button onClick={() => handleDelete(`artifacts/${appId}/users/${user.uid}/trips/${trip.id}/destinations/${dest.id}/notes/${note.id}`)} className="text-red-400 hover:text-red-300"><Icon name="trash" className="h-5 w-5"/></button>
                                        </div>
                                    ))}
                                    {showNoteFormFor === dest.id ? (
                                         <div className="bg-gray-700 p-3 rounded-md">
                                            <textarea value={newNoteText} onChange={e => setNewNoteText(e.target.value)} placeholder="New note..." className="bg-gray-600 w-full p-2 rounded-md mb-2" rows="2"></textarea>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleAddNote(dest.id)} className="bg-green-600 text-sm px-3 py-1 rounded">Save</button>
                                                <button onClick={() => setShowNoteFormFor(null)} className="bg-gray-500 text-sm px-3 py-1 rounded">Cancel</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button onClick={() => setShowNoteFormFor(dest.id)} className="text-indigo-400 hover:text-indigo-200 text-sm font-semibold">+ Add Note</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
             <button onClick={handleDeleteTrip} className="mt-8 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md flex items-center gap-2">
                <Icon name="trash" className="h-5 w-5" /> Delete Entire Trip
            </button>
        </div>
    );
};

const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
});

const SceneRecreation = ({ movieTitle, sceneDescription }) => {
    const [userImage, setUserImage] = useState(null);
    const [userImageFile, setUserImageFile] = useState(null);
    const [aiImage, setAiImage] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [cameoImage, setCameoImage] = useState(null);
    const [isGeneratingCameo, setIsGeneratingCameo] = useState(false);
    const [cameoError, setCameoError] = useState(null);

    const handleImageUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setUserImageFile(file);
            setUserImage(URL.createObjectURL(file));
        }
    };

    const generateAiImage = async () => {
        setIsGenerating(true);
        setAiImage(null);
        try {
            const prompt = `A cinematic, photorealistic image of a scene: ${sceneDescription}. The style should be inspired by the movie ${movieTitle}.`;
            const payload = { instances: [{ prompt: prompt }], parameters: { "sampleCount": 1 } };
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${GEMINI_API_KEY}`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API call failed with status ${response.status}: ${errorText}`);
            }
            const resultText = await response.text();
            if (!resultText) {
                throw new Error("API returned an empty response body.");
            }
            const result = JSON.parse(resultText);

            if (result.predictions && result.predictions[0].bytesBase64Encoded) {
                setAiImage(`data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`);
            } else {
                console.error("API response missing image data:", result);
                throw new Error("Failed to generate image due to unexpected response format.");
            }
        } catch (error) {
            console.error("Image generation failed:", error);
            setAiImage('https://placehold.co/400x300/e74c3c/ffffff?text=Error');
        } finally {
            setIsGenerating(false);
        }
    };

    const generateSceneCameo = async () => {
        if (!userImageFile || !aiImage) {
            alert("Please upload your photo and generate an AI scene first.");
            return;
        }
        setIsGeneratingCameo(true);
        setCameoImage(null);
        setCameoError(null);
        try {
            const userImageBase64 = await fileToBase64(userImageFile);
            const aiImageBase64 = aiImage.split(',')[1];

            const prompt = "Take the person from the first uploaded image and realistically place them into the background scene from the second image. Match the lighting, shadows, and artistic style.";

            const payload = {
                contents: [{
                    parts: [
                        { text: prompt },
                        { inlineData: { mimeType: userImageFile.type, data: userImageBase64 } },
                        { inlineData: { mimeType: "image/png", data: aiImageBase64 } }
                    ]
                }],
                generationConfig: {
                    responseModalities: ['IMAGE']
                },
            };

            const apiKey = GEMINI_API_KEY;
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${apiKey}`;
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API call failed with status ${response.status}: ${errorText}`);
            }
            
            const resultText = await response.text();
            if (!resultText) {
                throw new Error("API returned an empty response body.");
            }
            const result = JSON.parse(resultText);
            const base64Data = result?.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
            
            if (!base64Data) {
                console.error("API response missing image data:", result);
                throw new Error("Image generation failed or response format is incorrect.");
            }
            
            setCameoImage(`data:image/png;base64,${base64Data}`);

        } catch (error) {
            console.error("Cameo generation failed:", error);
            if (error.message.includes("401")) {
                setCameoError(
                    <div className="text-red-400 p-4 text-center">
                        <p className="font-bold">Authentication Error (401)</p>
                        <p className="text-sm mt-2">
                            This feature requires a valid API key for the <strong>Gemini 2.0 Flash Image Generation model</strong>.
                        </p>
                        <p className="text-sm mt-2">
                            Please get a key from <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-300 underline">Google AI Studio</a> and ensure it is enabled for this model.
                        </p>
                    </div>
                );
            } else {
                setCameoError("Cameo generation failed. Please try again.");
            }
        } finally {
            setIsGeneratingCameo(false);
        }
    };

    return (
        <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-200 mb-2">Recreate the Scene</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-700 p-3 rounded-lg text-center">
                    <h5 className="font-semibold mb-2">1. AI Generated Scene</h5>
                    <div className="w-full h-48 flex items-center justify-center bg-gray-600 rounded-md">
                        {isGenerating ? <LoadingSpinner text="Generating..." /> : 
                            aiImage ? <img src={aiImage} alt="AI generated scene" className="rounded-md w-full h-full object-cover"/> : 
                            <button onClick={generateAiImage} className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">Generate with Imagen 3</button>
                        }
                    </div>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg text-center">
                     <h5 className="font-semibold mb-2">2. Upload Your Photo</h5>
                     {userImage ? (
                        <img src={userImage} alt="User recreation" className="rounded-md w-full h-48 object-cover"/>
                     ) : (
                        <div className="w-full h-48 flex items-center justify-center bg-gray-600 rounded-md">
                            <label htmlFor="upload-button" className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                                <Icon name="camera" className="h-5 w-5 inline-block mr-2"/>
                                Upload Your Photo
                            </label>
                            <input id="upload-button" type="file" accept="image/*" className="hidden" onChange={handleImageUpload}/>
                        </div>
                     )}
                </div>
            </div>
            <div className="mt-4 bg-gray-700 p-3 rounded-lg text-center">
                <h5 className="font-semibold mb-2">3. Your Scene Cameo</h5>
                <div className="w-full h-64 flex items-center justify-center bg-gray-600 rounded-md">
                    {isGeneratingCameo ? <LoadingSpinner text="Placing you in the scene..." /> :
                        cameoImage ? <img src={cameoImage} alt="User cameo in AI scene" className="rounded-md w-full h-full object-cover"/> :
                        cameoError ? <div className="text-red-400 p-4 text-center">{cameoError}</div> :
                        <button onClick={generateSceneCameo} disabled={!userImage || !aiImage} className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center gap-2">
                            <Icon name="magic_wand" className="h-5 w-5"/>
                            Generate Your Scene Cameo
                        </button>
                    }
                </div>
            </div>
        </div>
    );
};

const SmartRecommendations = ({ watchlist }) => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);

    const getRecommendations = async () => {
        setLoading(true);
        try {
            const movieTitles = watchlist.map(m => m.title).join(', ');
            const prompt = `Based on a user's watchlist which includes ${movieTitles}, recommend 3 other movies they might like. For each movie, provide a very brief, one-sentence reason for the recommendation. Return the response as a JSON array of objects, where each object has "title" and "reason" keys.`;
            let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = { 
                contents: chatHistory,
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: "ARRAY",
                        items: {
                            type: "OBJECT",
                            properties: {
                                "title": { "type": "STRING" },
                                "reason": { "type": "STRING" }
                            },
                            required: ["title", "reason"]
                        }
                    }
                }
            };
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API call failed with status ${response.status}: ${errorText}`);
            }
            const resultText = await response.text();
            if (!resultText) {
                throw new Error("API returned an empty response body.");
            }
            const result = JSON.parse(resultText);

            if (result.candidates && result.candidates[0].content && result.candidates[0].content.parts[0]) {
                const textPart = result.candidates[0].content.parts[0].text;
                if (!textPart) throw new Error("API response is missing the text part.");
                setRecommendations(JSON.parse(textPart));
            } else {
                 throw new Error("Invalid response structure from AI.");
            }
        } catch (error) {
            console.error("Recommendation generation failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-12">
            <h3 className="text-2xl font-bold text-indigo-400 mb-4 flex items-center gap-2">
                <Icon name="lightbulb" className="h-6 w-6" />
                Smart Recommendations
            </h3>
            {recommendations.length === 0 && !loading && (
                <button onClick={getRecommendations} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md">
                    Get AI Recommendations
                </button>
            )}
            {loading && <LoadingSpinner text="Finding recommendations..." />}
            {recommendations.length > 0 && (
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {recommendations.map((rec, index) => (
                        <div key={index} className="bg-gray-800 rounded-lg shadow-xl overflow-hidden p-4">
                            <h4 className="font-bold text-lg text-white">{rec.title}</h4>
                            <p className="text-sm text-gray-400 mt-2">"{rec.reason}"</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const SocialShareModal = ({ onClose, tripTitle }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full">
                <h3 className="text-2xl font-bold mb-2">Share Your Trip!</h3>
                <p className="text-gray-400 mb-6">Share your "{tripTitle}" itinerary with friends.</p>
                <div className="flex justify-center gap-4">
                    {/* These would be real share links */}
                    <button className="text-4xl text-blue-500 hover:opacity-80">f</button>
                    <button className="text-4xl text-blue-400 hover:opacity-80">t</button>
                    <button className="text-4xl text-pink-500 hover:opacity-80">i</button>
                    <button className="text-4xl text-green-500 hover:opacity-80">w</button>
                </div>
                <button onClick={onClose} className="mt-8 w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md">Close</button>
            </div>
        </div>
    );
};

function generateICS(trip, destinations) {
    let icsString = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//CineVoyage//EN
`;
    destinations.forEach(dest => {
        icsString += `BEGIN:VEVENT
UID:${dest.id}@cinevoyage.app
DTSTAMP:${new Date().toISOString().replace(/[-:.]/g, '')}Z
DTSTART;VALUE=DATE:${(trip.start_date || '').replace(/-/g, '')}
SUMMARY:${encodeURIComponent(dest.name)}
DESCRIPTION:${encodeURIComponent(dest.description)}
LOCATION:${encodeURIComponent(dest.location)}
END:VEVENT
`;
    });
    icsString += `END:VCALENDAR`;
    return icsString;
}


export default App;
