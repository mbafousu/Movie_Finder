import { useEffect, useRef } from "react";

export default function SearchBar({ query, setQuery, onSearch, loading }) {
  const inputRef = useRef(null);

  
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form className="search" onSubmit={onSubmit}>
      <input
        ref={inputRef}
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies (ex: Inception)…"
        aria-label="Search movies"
      />
      <button className="btn" disabled={loading}>
        {loading ? "Searching…" : "Search"}
      </button>
    </form>
  );
}