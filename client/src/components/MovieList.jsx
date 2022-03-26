import React, { useEffect } from 'react';
import MovieEntry from './MovieEntry.jsx';

export default function MovieList({ movies, getMovies, display }) {
  return (
    <div>
      {movies.map((movie) => <MovieEntry key={movie._id} movie={movie} getMovies={getMovies} display={display}/>)}
    </div>
  )
}