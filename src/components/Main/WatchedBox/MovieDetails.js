import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import StarRating from "../../../utils/StarRating";

const key = "26a181df";

const MovieDetails = ({
  selectedId,
  closeCloseMovie,
  handleAddWatched,
  watched,
}) => {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.map((movie) => movie.imdbId).includes(selectedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbId === selectedId
  )?.userRating;

  useEffect(
    function () {
      const callback = (e) => {
        if (e.code === "Enter") {
          closeCloseMovie();
        }
      };
      document.addEventListener("keydown", callback);
      return () => {
        document.removeEventListener("keydown", callback);
      };
    },
    [closeCloseMovie]
  );

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return () => {
        document.title = `usePopcorn`;
      };
    },
    [title]
  );

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const url = `http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`;
        const response = await fetch(url);
        const data = await response.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  function handleAdd() {
    const newWatchedMovie = {
      imdbId: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      userRating: userRating,
      runtime: Number(runtime.split(" ").at(0)),
    };
    console.log(newWatchedMovie);
    handleAddWatched(newWatchedMovie);
    closeCloseMovie();
  }

  return (
    <div className="details">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={closeCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>
                <span>💫</span>
                {imdbRating} IMDB Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add Movie
                    </button>
                  )}
                </>
              ) : (
                <p>you have already Rated {watchedUserRating}</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starting {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
