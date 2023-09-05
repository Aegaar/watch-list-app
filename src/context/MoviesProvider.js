import React, { useReducer, useCallback } from "react";
import MoviesContext from "./movies-context";

const defaultMovieState = {
  watchListMovies: [],
  watchedMovies: [],
};

const removeFromArray = (array, itemToRemove) => {
  return array.filter((item) => item.id !== itemToRemove.id);
};

const moviesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WATCH_LIST":
      if (
        !state.watchListMovies.some(
          (movieObj) => movieObj.id === action.movie.id
        )
      ) {
        const updatedWatchListMovies = [...state.watchListMovies, action.movie];
        localStorage.setItem(
          "watchListMovies",
          JSON.stringify(updatedWatchListMovies)
        );

        const updatedWatchedMovies = removeFromArray(
          state.watchedMovies,
          action.movie
        );

        localStorage.setItem(
          "watchedMovies",
          JSON.stringify(updatedWatchedMovies)
        );

        return {
          ...state,
          watchListMovies: updatedWatchListMovies,
          watchedMovies: updatedWatchedMovies,
        };
      }
      return state;
    case "ADD_TO_WATCHED":
      if (
        !state.watchedMovies.some((movieObj) => movieObj.id === action.movie.id)
      ) {
        const updatedWatchedMovies = [...state.watchedMovies, action.movie];
        localStorage.setItem(
          "watchedMovies",
          JSON.stringify(updatedWatchedMovies)
        );

        const updatedWatchListMovies = removeFromArray(
          state.watchListMovies,
          action.movie
        );

        localStorage.setItem(
          "watchListMovies",
          JSON.stringify(updatedWatchListMovies)
        );

        return {
          ...state,
          watchListMovies: updatedWatchListMovies,
          watchedMovies: updatedWatchedMovies,
        };
      }
      return state;
    case "REMOVE":
      const updatedWatchListMoviesAfterRemove = removeFromArray(
        state.watchListMovies,
        action.movie
      );
      const updatedWatchedMoviesAfterRemove = removeFromArray(
        state.watchedMovies,
        action.movie
      );

      localStorage.setItem(
        "watchListMovies",
        JSON.stringify(updatedWatchListMoviesAfterRemove)
      );
      localStorage.setItem(
        "watchedMovies",
        JSON.stringify(updatedWatchedMoviesAfterRemove)
      );

      return {
        ...state,
        watchListMovies: updatedWatchListMoviesAfterRemove,
        watchedMovies: updatedWatchedMoviesAfterRemove,
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

  const addMovieToWatchListMovies = useCallback((movie) => {
    dispatchMoviesAction({ type: "ADD_TO_WATCH_LIST", movie });
  }, []);

  const addMovieToWatchedMovies = useCallback((movie) => {
    dispatchMoviesAction({ type: "ADD_TO_WATCHED", movie });
  }, []);

  const removeMovie = useCallback((movie) => {
    dispatchMoviesAction({ type: "REMOVE", movie });
  }, []);

  const moviesContext = {
    watchListMovies: moviesState.watchListMovies,
    watchedMovies: moviesState.watchedMovies,
    addMovieToWatchListMovies,
    addMovieToWatchedMovies,
    removeMovie,
  };

  return (
    <MoviesContext.Provider value={moviesContext}>
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesProvider;
