const posterFallback =
  "https://via.placeholder.com/300x450?text=No+Poster";

export default function MovieCard({
  movie,
  isSelected,
  isFavorite,
  onSelect,
  onToggleFavorite,
}) {
  const poster = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : posterFallback;

  return (
    <div className={`card ${isSelected ? "selected" : ""}`}>
      <button className="card-click" onClick={onSelect} type="button">
        <img
  className="poster"
  src={poster}
  alt={`${movie.Title} poster`}
  onError={(e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = posterFallback;
  }}
/>
        
        <div className="card-body">
          <h3 className="card-title">{movie.Title}</h3>
          <p className="muted">{movie.Year}</p>
        </div>
      </button>

      <button
        className={`btn small ${isFavorite ? "danger" : "ghost"}`}
        onClick={onToggleFavorite}
        type="button"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? "Remove" : "Favorite"}
      </button>
    </div>
  );
}