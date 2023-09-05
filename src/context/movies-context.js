import React from "react";

const MoviesContext = React.createContext({
  watchListMovies: [],
  watchedMovies: [],
  addMovieToWatchListMovies: (movie) => {},
  addMovieToWatchedMovies: (movie) => {},
  removeMovie: (movie) => {},
});

export default MoviesContext;
