import { useEffect, useState } from "react";

export const useMovie = (query, closeCloseMovie) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const key = "26a181df";

  useEffect(() => {
    closeCloseMovie?.();

    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");

        if (query.length < 3) throw new Error("Search any Movies");

        const url = `http://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=${query}`;
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await response.json();

        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
        setIsLoading(false);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    // closeCloseMovie();
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
};
