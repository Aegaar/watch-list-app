import React, { useReducer } from "react";
import MoviesContext from "./movies-context";

const defaultMovieState = {
  watchListMovies: [],
  watchedMovies: [],
};

const moviesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WATCH_LIST":
      if (!state.watchListMovies.includes(action.id)) {
        const updatedWatchListMovies = [...state.watchListMovies, action.id];
        localStorage.setItem(
          "watchListMovies",
          JSON.stringify(updatedWatchListMovies)
        );
        return {
          ...state,
          watchListMovies: updatedWatchListMovies,
        };
      }
      return state;
    case "ADD_TO_WATCHED":
      if (!state.watchedMovies.includes(action.id)) {
        const updatedWatchedMovies = [...state.watchedMovies, action.id];
        localStorage.setItem(
          "watchedMovies",
          JSON.stringify(updatedWatchedMovies)
        );
        return {
          ...state,
          watchedMovies: updatedWatchedMovies,
        };
      }
      return state;
    case "REMOVE":
      const updatedWatchListMovies = state.watchListMovies.filter(
        (movie) => movie !== action.id
      );
      const updatedWatchedMovies = state.watchedMovies.filter(
        (movieId) => movieId !== action.id
      );
    //   localStorage.setItem(
    //     "watchListMovies",
    //     JSON.stringify(updatedWatchListMovies)
    //   );
    //   localStorage.setItem(
    //     "watchedMovies",
    //     JSON.stringify(updatedWatchedMovies)
    //   );
      return {
        ...state,
        watchListMovies: updatedWatchListMovies,
        watchedMovies: updatedWatchedMovies,
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


  // console.log(moviesState);

  const addMovieToWatchListMovies = (id) => {
    dispatchMoviesAction({ type: "ADD_TO_WATCH_LIST", id: id });
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
