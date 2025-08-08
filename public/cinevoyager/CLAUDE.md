# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CineVoyage is a React/Next.js application that allows users to discover filming locations from movies and plan travel itineraries around them. The app features AI-powered location scraping, movie watchlist management, and trip planning capabilities.

## Development Commands

- `npm run dev` - Start the Next.js development server on http://localhost:3000
- `npm run build` - Create a production build
- `npm start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks
- `npm install` - Install project dependencies

## Architecture Overview

### Core Components
- **cinevoyage_gem.js**: Main React application with Firebase integration, includes all UI components and Firebase auth/database logic
- **integration_demo_app.js**: Alternative React app using Supabase as backend with simplified UI
- **integration_demo.js**: Supabase client configuration and location scraper service

### App Structure
The project uses Next.js App Router with:
- `app/layout.js`: Root layout with global CSS imports
- `app/page.js`: Homepage that renders the main CineVoyageApp component
- `app/globals.css`: Global Tailwind CSS styles

### Backend Options
The project supports two backend configurations:
1. **Firebase** (cinevoyage_gem.js): Uses Firebase Auth and Firestore for user management and data storage
2. **Supabase** (integration_demo_app.js): Uses Supabase for authentication and PostgreSQL database

### Key Features
- Movie search and watchlist management
- AI-powered filming location discovery using Gemini API
- Travel itinerary planning with destinations
- Scene recreation using AI image generation
- Social sharing functionality
- Real-time data synchronization

## Environment Configuration

Create a `.env.local` file with the following variables:

### Supabase Configuration (for integration_demo_app.js)
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

### Firebase Configuration (for cinevoyage_gem.js)
- `NEXT_PUBLIC_FIREBASE_API_KEY`: Firebase API key
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`: Firebase auth domain
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: Firebase project ID
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`: Firebase storage bucket
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`: Firebase messaging sender ID
- `NEXT_PUBLIC_FIREBASE_APP_ID`: Firebase app ID

### External APIs
- `NEXT_PUBLIC_TMDB_API_KEY`: The Movie Database API key for movie search
- `NEXT_PUBLIC_GEMINI_API_KEY`: Google Gemini API key for AI features

## Database Schema

### Supabase Tables (PostgreSQL)
- `movies`: Movie details from TMDB
- `watchlist`: User's movie watchlist with ratings
- `trips`: Travel itineraries 
- `destinations`: Locations within trips
- `activities`: Activities for specific destinations
- `notes`: User notes for destinations

### Firebase Collections (Firestore)
- `artifacts/{appId}/users/{uid}/watchlist`: User movie watchlist
- `artifacts/{appId}/users/{uid}/trips`: User travel plans
- `artifacts/{appId}/users/{uid}/trips/{tripId}/destinations`: Trip destinations
- `artifacts/{appId}/users/{uid}/trips/{tripId}/destinations/{destId}/activities`: Destination activities
- `artifacts/{appId}/users/{uid}/trips/{tripId}/destinations/{destId}/notes`: Destination notes

## Technology Stack

- **Frontend**: React 18, Next.js 14, Tailwind CSS
- **Backend Options**: Firebase/Firestore OR Supabase/PostgreSQL
- **AI Integration**: Google Gemini API for location discovery and image generation
- **Movie Data**: The Movie Database (TMDB) API
- **Authentication**: Firebase Auth OR Supabase Auth
- **Real-time Updates**: Firebase listeners OR Supabase real-time subscriptions

## Multi-Tier AI System

The project now includes a sophisticated multi-tier AI service (`services/aiService.js`) that provides:

### Service Tiers
- **PREMIUM**: Gemini AI + OpenAI (high cost, best quality)
- **STANDARD**: OpenAI GPT-3.5 + HuggingFace (medium cost, good quality)  
- **BUDGET**: HuggingFace free tier (low/no cost, basic quality)
- **DEMO**: Mock data service (free, full functionality)

### Key Features
- Automatic tier detection based on available API keys
- Budget tracking and spending limits
- Seamless provider fallback on failures
- Cost optimization and provider health monitoring
- Transparent cost tracking per operation

### App Versions Available
1. **app_selector.js**: Main entry point with version selection
2. **multi_tier_app.js**: Advanced version with multi-provider AI
3. **integration_demo_app.js**: Supabase backend version
4. **cinevoyage_gem.js**: Original Firebase version

## API Provider Integration

### Supported Providers
- **Gemini AI**: Advanced reasoning, image generation, structured outputs
- **OpenAI**: GPT models, DALL-E image generation, JSON mode
- **HuggingFace**: Free text generation, Stable Diffusion, various models
- **Mock Service**: Comprehensive demo data for all features

### Provider Selection Logic
The system automatically selects the best provider based on:
- API key availability
- Current budget constraints  
- Feature requirements (e.g., image generation)
- Provider health and rate limits

## Key Integration Points

- Multi-tier AI service provides unified interface across all providers
- Automatic fallback ensures application never fails completely
- Budget tracking prevents unexpected API charges
- Mock data service enables full functionality without any API keys
- All versions maintain the same core functionality with different backends and AI providers