import React from 'react';

const MoviesContext = React.createContext({
  watchListMovies: [],
  watchedMovies:[],
});

export default MoviesContext;