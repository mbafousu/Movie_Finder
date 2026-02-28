import { useEffect, useMemo, useState, useCallback } from "react";
import SearchBar from "./components/SearchBar";
import MovieGrid from "./components/MovieGrid";
import MovieDetails from "./components/MovieDetails";
import Favorites from "./components/Favorites";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const safeParse = (value, fallback) => {
  try {
    return JSON.parse(value) ?? fallback;
  } catch {
    return fallback;
  }
};

export default function App() {
  const [query, setQuery] = useState("batman");
  const [movies, setMovies] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [favorites, setFavorites] = useState(() =>
    safeParse(localStorage.getItem("favorites"), [])
  );

  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState("");

  // Persist favorites 
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // DEDUPE results to avoid duplicate key warnings
  const uniqueMovies = useMemo(() => {
    const map = new Map();
    for (const m of movies) map.set(m.imdbID, m);
    return Array.from(map.values());
  }, [movies]);

  const favoriteIds = useMemo(
    () => new Set(favorites.map((m) => m.imdbID)),
    [favorites]
  );

  const clearSelection = () => {
    setSelectedId(null);
    setSelectedMovie(null);
  };

  // Search movies 
  const searchMovies = useCallback(async (term) => {
    if (!API_KEY) {
      setError("Missing OMDb API key. Add VITE_OMDB_API_KEY to your .env file.");
      return;
    }
    if (!term.trim()) return;

    const controller = new AbortController();

    setError("");
    setLoadingSearch(true);
    setSelectedId(null);
    setSelectedMovie(null);

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(
          term.trim()
        )}&type=movie`,
        { signal: controller.signal }
      );
      const data = await res.json();

      if (data.Response === "False") {
        setMovies([]);
        setError(data.Error || "No results found.");
      } else {
        setMovies(data.Search || []);
      }
    } catch (e) {
      if (e.name !== "AbortError") setError("Network error. Please try again.");
    } finally {
      setLoadingSearch(false);
    }

    return () => controller.abort();
  }, []);

  // Initial search 
  useEffect(() => {
    searchMovies(query);
  }, [searchMovies]);

  // Fetch details 
  useEffect(() => {
    if (!API_KEY || !selectedId) return;

    const controller = new AbortController();

    const fetchDetails = async () => {
      setError("");
      setLoadingDetails(true);
      setSelectedMovie(null);

      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}&plot=full`,
          { signal: controller.signal }
        );
        const data = await res.json();

        if (data.Response === "False") {
          setError(data.Error || "Could not load movie details.");
        } else {
          setSelectedMovie(data);
        }
      } catch (e) {
        if (e.name !== "AbortError") setError("Network error loading details.");
      } finally {
        setLoadingDetails(false);
      }
    };

    fetchDetails();
    return () => controller.abort();
  }, [selectedId]);

  const toggleFavorite = (movieSummaryOrDetails) => {
    const imdbID = movieSummaryOrDetails?.imdbID;
    if (!imdbID) return;

    setFavorites((prev) => {
      const exists = prev.some((m) => m.imdbID === imdbID);
      if (exists) return prev.filter((m) => m.imdbID !== imdbID);

      const compact = {
        imdbID,
        Title: movieSummaryOrDetails.Title,
        Year: movieSummaryOrDetails.Year,
        Poster: movieSummaryOrDetails.Poster,
      };

      return [compact, ...prev];
    });
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <h1 className="brand">MovieFinder</h1>
          <p className="subtitle">Search movies with OMDb • Save favorites</p>
        </div>

        <SearchBar
          query={query}
          setQuery={setQuery}
          onSearch={() => searchMovies(query)}
          loading={loadingSearch}
        />
      </header>

      <main className="main">
        {error ? <div className="error">{error}</div> : null}

        <section className="content">
          <div className="panel">
            <div className="panel-header">
              <h2>Results</h2>
              {loadingSearch ? <span className="badge">Loading…</span> : null}
            </div>

            <MovieGrid
              movies={uniqueMovies}
              onSelect={setSelectedId}
              selectedId={selectedId}
              favoriteIds={favoriteIds}
              onToggleFavorite={toggleFavorite}
            />
          </div>

          <div className="panel">
            <div className="panel-header">
              <h2>Details</h2>
              {loadingDetails ? <span className="badge">Loading…</span> : null}
              {selectedId ? (
                <button className="btn ghost" onClick={clearSelection} type="button">
                  Clear
                </button>
              ) : null}
            </div>

            <MovieDetails
              movie={selectedMovie}
              loading={loadingDetails}
              isFavorite={selectedMovie ? favoriteIds.has(selectedMovie.imdbID) : false}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2>Favorites</h2>
            <span className="badge">{favorites.length}</span>
          </div>

          <Favorites
            favorites={favorites}
            onSelect={setSelectedId}
            onRemove={(id) =>
              setFavorites((prev) => prev.filter((m) => m.imdbID !== id))
            }
          />
        </section>
      </main>

      <footer className="footer">Data from OMDb API • Built with React + CSS</footer>
    </div>
  );
}