import React, { useReducer } from "react";
import MoviesContext from "./movies-context";

const defaultMovieState = {
  watchListMovies: [],
  watchedMovies: [],
};

const moviesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WATCH_LIST":
      if (!state.watchListMovies.find(movieObj => movieObj.id === action.movie.id)) {
        const updatedWatchListMovies = [...state.watchListMovies, action.movie];
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
      if (!state.watchedMovies.find(movieObj => movieObj.id === action.movie.id)) {
        const updatedWatchedMovies = [...state.watchedMovies, action.movie];
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
        console.log("Removing movie:", action.movie);
        const updatedWatchListMoviesAfterRemove = state.watchListMovies.slice();
        const updatedWatchedMoviesAfterRemove = state.watchedMovies.slice();
      
        const indexToRemoveFromWatchList = updatedWatchListMoviesAfterRemove.findIndex(
          (movieObj) => movieObj.id === action.movie.id
        );
        const indexToRemoveFromWatched = updatedWatchedMoviesAfterRemove.findIndex(
          (movieObj) => movieObj.id === action.movie.id
        );
      
        if (indexToRemoveFromWatchList !== -1) {
          console.log("Removing from watchListMovies:", updatedWatchListMoviesAfterRemove[indexToRemoveFromWatchList]);
          updatedWatchListMoviesAfterRemove.splice(indexToRemoveFromWatchList, 1);
        }
        if (indexToRemoveFromWatched !== -1) {
          console.log("Removing from watchedMovies:", updatedWatchedMoviesAfterRemove[indexToRemoveFromWatched]);
          updatedWatchedMoviesAfterRemove.splice(indexToRemoveFromWatched, 1);
        }
      
        localStorage.setItem(
          "watchListMovies",
          JSON.stringify(updatedWatchListMoviesAfterRemove)
        );
        localStorage.setItem(
          "watchedMovies",
          JSON.stringify(updatedWatchedMoviesAfterRemove)
        );
      
        console.log("Updated watchListMovies:", updatedWatchListMoviesAfterRemove);
        console.log("Updated watchedMovies:", updatedWatchedMoviesAfterRemove);
      
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


  const addMovieToWatchListMovies = (movie) => {
    dispatchMoviesAction({ type: "ADD_TO_WATCH_LIST", movie: movie });
  };

  const addMovieToWatchedMovies = (movie) => {
    dispatchMoviesAction({ type: "ADD_TO_WATCHED", movie: movie });
  };

  const removeMovie = (movie) => {
    dispatchMoviesAction({ type: "REMOVE", movie: movie });
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
