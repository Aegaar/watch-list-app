import React, { useState, useEffect, useContext } from "react";
import { CardMovie } from "./Card/CardMovie";
import MoviesContext from "../context/movies-context";

const WatchListMovies = () => {
  const movieCtx = useContext(MoviesContext);
  const [results, setResults] = useState(movieCtx.watchListMovies);

  useEffect(() => {
    // Aktualizuj results na podstawie zmian w kontekście
    setResults(movieCtx.watchListMovies);
  }, [movieCtx.watchListMovies]);

  return (
    <div className="pt-8 flex flex-col items-center justify-center">
      <div htmlFor="movieSearch" className="font-bold text-2xl text-gray-800">
        Watch list movies
      </div>
      {results.length > 0 ? (
        <ul className="mt-8">
          {results.map((movie) => (
            <li
              key={movie.id}
              className="mt-10 border-2 border-indigo-600 rounded-md mr-7 ml-7"
            >
              <CardMovie
                movieInfo={movie}
                buttonsNames={[
                  {
                    name: "Add to watched movies",
                    type: "ADD",
                    onClick: () => {
                      console.log(movie.id);
                      movieCtx.addMovieToWatchedMovies(movie);
                    },
                  },
                  {
                    name: "Remove",
                    type: "REMOVE",
                    onClick: () => {
                      console.log(movie.id);
                      movieCtx.removeMovie(movie, 'watchListMovies');
                    },
                  },
                ]}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies in your watchlist. You can add movies.</p>
      )}
    </div>
  );
};

export { WatchListMovies };


