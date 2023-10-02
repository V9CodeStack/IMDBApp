import React from "react";
import WatchedMovie from "./WatchedMovie";

const WatchedMoviesList = ({ watched, handleDeleteWatche }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbId}
          movie={movie}
          handleDeleteWatche={handleDeleteWatche}
        />
      ))}
    </ul>
  );
};

export default WatchedMoviesList;
