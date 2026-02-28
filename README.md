# Movie Finder

MovieFinder is a React-based web application that allows users to search for movies using the OMDb API, view detailed information about selected films, and save their favorite movies using browser localStorage.

## Technologies used
- React (Vite)
- JavaScript(ES6+)
- CSS
- Fetch API
- OMDb API (External Data Source)
- localStorage (Browser Storage API)

## Components

The application is structured using reusable React components:
- `Seachbar` - Handles user input and triggers search
- `MovieGrid` - Displays Seach results
- `MovieCard` - Individual movie preview
- `MovieDetails` - Displays detailed movie information
- `Favorites` - Displays saved movies 

## React Hooks used 

The project uses multile React hooks:
- `useState` manage seach query, stores movie results, Stores selected movie details, manages faforites, handles loading and error states 
-` useEffect` Fetches movie data from OMDb, fetches movies when selected and persists favorites to localStorages
- `useMemo` Deduplicates movie results to prevent React Key warmings and optimizes favorite lookups 

## Features

- Search movies by title
- Display search results dynamically
- View detailed movie information 
- Loading and error handling
- At least 2 React Hooks
- External API integration(AJAX)
- Sticky navigation header

## Installation & Usage

- Clone the repository :git clone https://github.com/mbafousu/Movie_Finder.git
- Install dependencies : `npm install`
- Create a `.env` file in the root directory and add: VITE_OMDB_API_KEY=your_api_key_here
- Start de development server: `npm run dev`
