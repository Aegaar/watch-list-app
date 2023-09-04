import React, { useState } from "react";
import { CardMovie } from "./Card/CardMovie";
import MoviesContext from "../context/movies-context";
import { useContext } from "react";

const AddMovies = () => {
  const [inputValue, setInputValue] = useState("");
  const [results, setResult] = useState([]);
  const movieCtx = useContext(MoviesContext);

  const inputValueHandler = (event) => {
    event.preventDefault();

    setInputValue(event.target.value);

    const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${event.target.value}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.REACT_APP_TMDB_API_KEY,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setResult(data.results);
        } else {
          setResult([""]);
        }
      });
  };

  return (
    <div className="pt-8 flex flex-col items-center justify-center">
      <label htmlFor="movieSearch" className="font-bold text-2xl text-gray-800">
        Search for movie
      </label>
      <input
        type="text"
        name="movieSearch"
        id="movieSearch"
        value={inputValue}
        onChange={inputValueHandler}
        placeholder="Enter the name of the movie"
        className="border-2 rounded-md pl-2 mt-3 border-indigo-600 w-5/6 h-10 sm:w-4/6 lg:w-3/6 2xl:w-2/6"
      />
      {results.length > 0 && (
        <ul className="mt-8">
          {/* {console.log(results)} */}
          {results.map((movie) => (
            <li
              key={movie.id}
              className="mt-10 border-2 border-indigo-600 rounded-md mr-7 ml-7"
            >
              <CardMovie
                movieInfo={movie}
                buttonsNames={[
                  {
                    name: "Add to watch list",
                    type: "ADD",
                    onClick: () => {
                      console.log(movie.id);
                      movieCtx.addMovieToWatchListMovies(movie.id);
                    },
                  },
                  {
                    name: "Add to watched movies",
                    type: "ADD",
                    onClick: () => {
                      console.log(movie.id);
                      movieCtx.addMovieToWatchedMovies(movie.id);
                    },
                  },
                ]}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { AddMovies };
