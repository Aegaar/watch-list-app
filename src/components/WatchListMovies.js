import React, { useState, useEffect } from "react";
import { CardMovie } from "./Card/CardMovie";
import MoviesContext from "../context/movies-context";
import { useContext } from "react";

const WatchListMovies = () => {
  const movieCtx = useContext(MoviesContext);
  const [results, setResult] = useState([]);

  // console.log(JSON.parse(localStorage.getItem("watchListMovies")));

  useEffect(() => {
    const watchListMovies = JSON.parse(localStorage.getItem("watchListMovies"));
    setResult(watchListMovies);
  }, []);

  // console.log(results)

if(results){
  results.map((movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.REACT_APP_TMDB_API_KEY,
      },
    };
    return fetch(url, options)
      .then((res) => {
        res.json();
        console.log(res);
      })
      .catch((error) => {
        console.error("API request error:", error);
        return null;
      });
  });
}

  // const fetchMovieDetails = (movieId) => {
  //   const url = `https://api.themoviedb.org/3/movie/${movieId}`;
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       accept: "application/json",
  //       Authorization: process.env.REACT_APP_TMDB_API_KEY,
  //     },
  //   };

  //   return fetch(url, options)
  //     .then((res) => res.json())
  //     .catch((error) => {
  //       console.error("API request error:", error);
  //       return null;
  //     });
  // };

  // useEffect(() => {
  //   const fetchMovieDetailsPromises = results.map((movieId) =>
  //     fetchMovieDetails(movieId)
  //   );

  //   Promise.all(fetchMovieDetailsPromises)
  //     .then((movieDetails) => {
  //       // Filtrujemy filmowe z null (obsługuje to błąd żądania API)
  //       const filteredMovieDetails = movieDetails.filter((movieDetail) => movieDetail !== null);
  //       setResult(filteredMovieDetails);
  //     });
  // }, [results]);

  // return (
  //   <div>
  //     {results.length > 0 ? (
  //       <ul className="mt-8">
  //         {results.map((movie) => (
  //           <li
  //             key={movie.id}
  //             className="mt-10 border-2 border-indigo-600 rounded-md mr-7 ml-7"
  //           >
  //             <CardMovie
  //               movieInfo={movie}
  //               buttonsNames={[
  //                 {
  //                   name: "Add to watch list",
  //                   type: "ADD",
  //                   onClick: () => {
  //                     console.log(movie.id);
  //                     movieCtx.addMovieToWatchListMovies(movie.id);
  //                   },
  //                 },
  //                 {
  //                   name: "Add to watched movies",
  //                   type: "ADD",
  //                   onClick: () => {
  //                     console.log(movie.id);
  //                     movieCtx.addMovieToWatchedMovies(movie.id);
  //                   },
  //                 },
  //               ]}
  //             />
  //           </li>
  //         ))}
  //       </ul>
  //     ) : (
  //       <p>Błąd</p>
  //     )}
  //   </div>
  // );
};

export { WatchListMovies };
