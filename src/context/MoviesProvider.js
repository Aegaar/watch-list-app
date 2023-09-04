import React, { useReducer } from "react";
import MoviesContext from "./movies-context";

const defaultMovieState = {
  watchListMovies: [],
  watchedMovies: [],
};

const moviesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WATCH_LIST":
      return {
        ...state,
        watchListMovies: [...state.watchListMovies, action.movieID]
      };
    case "ADD_TO_WATCHED":
      return {
        ...state,
        watchedMovies: [...state.watchedMovies, action.id],
      };
    case "REMOVE":
      return {
        ...state,
        watchListMovies: state.watchListMovies.filter(
          (movie) => movie.id !== action.id
        ),
        watchedMovies: state.watchedMovies.filter((movieId) => movieId !== action.id),
      };
    default:
      return state;
  }
};

const MoviesProvider = (props) => {
  const [moviesState, dispatchMoviesAction] = useReducer(
    moviesReducer,
    defaultMovieState
  );

  console.log(moviesState);

  const addMovieToWatchListMovies = (id) => {
    dispatchMoviesAction({ type: "ADD_TO_WATCH_LIST", movieID: id });
  };

  const addMovieToWatchedMovies = (id) => {
    dispatchMoviesAction({ type: "ADD_TO_WATCHED", id: id });
  };

  const removeMovie = (id) => {
    dispatchMoviesAction({ type: "REMOVE", id: id });
  };

  const moviesContext = {
    watchListMovies: moviesState.watchListMovies,
    watchedMovies: moviesState.watchedMovies,
    addMovieToWatchListMovies: addMovieToWatchListMovies,
    addMovieToWatchedMovies: addMovieToWatchedMovies,
    removeMovie: removeMovie,
  };

  return (
    <MoviesContext.Provider value={moviesContext}>
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesProvider;

