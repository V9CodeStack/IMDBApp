import React from "react";

const WatchedMovie = ({ movie, handleDeleteWatche }) => {
  console.log(movie.imdbId);
  return (
    <li key={movie.imdbId}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => handleDeleteWatche(movie.imdbId)}
        >
          X
        </button>
      </div>
    </li>
  );
};

export default WatchedMovie;
