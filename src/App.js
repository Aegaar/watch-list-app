import React from "react";
import { Nav } from "./components/navbar/Nav";
import { AddMovies } from "./components/Pages/AddMovies";
import { WatchListMovies } from "./components/Pages/WatchListMovies";
import { WatchedMovies } from "./components/Pages/WatchedMovies";
import MoviesProvider from "./context/MoviesProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <MoviesProvider>
      <Router>
        <Nav />
        <div className="mt-20">
          <Routes>
            <Route path="/" element={<AddMovies />} />
            <Route path="/watch-list-movies" element={<WatchListMovies />} />
            <Route path="/watched-movies" element={<WatchedMovies />} />
            <Route path="/add-movies" element={<AddMovies />} />
          </Routes>
        </div>
      </Router>
    </MoviesProvider>
  );
}

export default App;
