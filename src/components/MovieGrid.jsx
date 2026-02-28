import MovieCard from "./MovieCard";

export default function MovieGrid({
  movies,
  onSelect,
  selectedId,
  favoriteIds,
  onToggleFavorite,
}) {
  if (!movies?.length) {
    return <p className="muted">No results yet. Try searching a movie title.</p>;
  }

  return (
    <div className="grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          isSelected={movie.imdbID === selectedId}
          isFavorite={favoriteIds.has(movie.imdbID)}
          onSelect={() => onSelect(movie.imdbID)}
          onToggleFavorite={() => onToggleFavorite(movie)}
        />
      ))}
    </div>
  );
}