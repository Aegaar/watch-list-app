import React, { useState, useEffect, useContext } from "react";
import { CardMovie } from "../Card/CardMovie";
import MoviesContext from "../../context/movies-context";

const WatchedMovies = () => {
  const movieCtx = useContext(MoviesContext);
  const [results, setResults] = useState(movieCtx.watchedMovies);

  useEffect(() => {
    const watchedMovies = JSON.parse(localStorage.getItem("watchedMovies"));
    setResults(watchedMovies);
  }, [movieCtx.watchedMovies]);

  return (
    <div className="pt-8 flex flex-col items-center justify-center">
      <div htmlFor="movieSearch" className="font-bold text-2xl text-gray-800">
        Watched movies
      </div>
      {Array.isArray(results) && results.length > 0 ? (
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
                    name: "Remove",
                    type: "REMOVE",
                    onClick: () => {
                      movieCtx.removeMovie(movie);
                    },
                  },
                ]}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="pt-3 font-bold text-indigo-600">
          No movies watched by you
        </p>
      )}
    </div>
  );
};

export { WatchedMovies };
