const posterFallback =
  "https://via.placeholder.com/60x90?text=No+Poster";

export default function Favorites({ favorites, onSelect, onRemove }) {
  if (!favorites.length) {
    return <p className="muted">No favorites yet. Save some movies ⭐</p>;
  }

  return (
    <div className="fav-list">
      {favorites.map((m) => {
        const poster = m.Poster && m.Poster !== "N/A" ? m.Poster : posterFallback;

        return (
          <div className="fav-item" key={m.imdbID}>
            <button className="fav-click" onClick={() => onSelect(m.imdbID)} type="button">
              <img className="fav-poster" src={poster} alt={`${m.Title} poster`} />
              <div>
                <div className="fav-title">{m.Title}</div>
                <div className="muted">{m.Year}</div>
              </div>
            </button>

            <button className="btn small ghost" onClick={() => onRemove(m.imdbID)} type="button">
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
}