import NavBar from "./components/Nav/NavBar";
import Main from "./components/Main/Main";
import { useState } from "react";
import Numresults from "./components/Nav/Numresults";
import MovieList from "./components/Main/ListBox/MovieList";
import Box from "./utils/Box";
import WatchedSummary from "./components/Main/WatchedBox/WatchedSummary";
import WatchedMoviesList from "./components/Main/WatchedBox/WatchedMoviesList";
import Search from "./utils/Search";
import MovieDetails from "./components/Main/WatchedBox/MovieDetails";
import { useMovie } from "./useMovie";
import { useLocalStorage } from "./useLocalStorage";

export default function App() {
  const [query, setQuery] = useState("inter");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorage("watched");
  const { movies, isLoading, error } = useMovie(query, closeCloseMovie);

  function ErrorMessage({ message }) {
    return <p className="error">{message}</p>;
  }

  function handleSelectMovie(id) {
    setSelectedId((selectdId) => (id === selectdId ? null : id));
  }

  function closeCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatche(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbId !== id));
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <Numresults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <h1>Loading...</h1>}
          {!isLoading && !error && (
            <MovieList movies={movies} handleSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              closeCloseMovie={closeCloseMovie}
              handleAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                handleDeleteWatche={handleDeleteWatche}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
