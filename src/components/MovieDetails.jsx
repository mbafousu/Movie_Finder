const posterFallback = "https://via.placeholder.com/300x450?text=No+Poster";

export default function MovieDetails({ movie, loading, isFavorite, onToggleFavorite }) {
  if (loading) return <p className="muted">Loading movie details…</p>;
  if (!movie) return <p className="muted">Select a movie to see details.</p>;

  const poster =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : posterFallback;

  return (
    <div className="details">
      <img
        className="details-poster"
        src={poster}
        alt={`${movie.Title} poster`}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = posterFallback;
        }}
      />

      <div className="details-body">
        <div className="details-header">
          <h3 className="details-title">
            {movie.Title} <span className="muted">({movie.Year})</span>
          </h3>

          <button
            className={`btn ${isFavorite ? "danger" : ""}`}
            onClick={() => onToggleFavorite(movie)}
            type="button"
          >
            {isFavorite ? "Remove Favorite" : "Save Favorite"}
          </button>
        </div>

        <p className="muted">
          {movie.Genre} • {movie.Runtime}
        </p>

        <p className="plot">{movie.Plot}</p>

        <ul className="meta">
          <li>
            <strong>Actors:</strong> {movie.Actors}
          </li>
          <li>
            <strong>Director:</strong> {movie.Director}
          </li>
          <li>
            <strong>Rated:</strong> {movie.Rated}
          </li>
          <li>
            <strong>IMDb:</strong> {movie.imdbRating}
          </li>
        </ul>
      </div>
    </div>
  );
}