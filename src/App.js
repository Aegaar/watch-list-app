import React from 'react'
import { Nav } from "./components/navbar/Nav";
import { AddMovies } from "./components/AddMovies";
import { WatchedMovies } from "./components/WatchedMovies";
import { WatchListMovies } from "./components/WatchListMovies";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
       <Nav />
       <div className='mt-20'>
      <Routes>
        <Route path="/" element={<WatchListMovies />} />
        <Route path="/watch-list-movies" element={<WatchListMovies />} />
        <Route path="/watched-movies" element={<WatchedMovies />} />
        <Route path="/add-movies" element={<AddMovies />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;

