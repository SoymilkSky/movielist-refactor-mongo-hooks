import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Add from './Add.jsx';
import Search from './Search.jsx';
import MovieList from './MovieList.jsx';

export default function App () {
  const [movies, setMovies] = useState([]);
  const [searchedView, setSearchedView] = useState([]);
  const [display, setDisplay] = useState('toWatch');

  useEffect(() => {
    let isMounted = true;
    getMovies().then(movies => {
      if (isMounted) { setMovies(movies.data); }
    })
    return () => { isMounted = false }
  }, [movies])

  function getMovies() {
    return axios.get('/api/movies')
  }

  function filterMovies() {
    if (display === 'watched') {
      return movies.filter(movie => movie.watched === true)
    } else if (display === 'toWatch') {
      return movies.filter(movie => movie.watched === false)
    } else if (display === 'searched') {
      return searchedView;
    }
  }

  return (
    <div>Movie List
      <Add getMovies={getMovies}/>
      <Search setSearchedView={setSearchedView} setDisplay={setDisplay}/>
      <button onClick={() => {setDisplay('toWatch');} }>To Watch</button>
      <button onClick={() => {setDisplay('watched');} }>Watched</button>
      <MovieList movies={filterMovies()} getMovies={getMovies} display={display}/>
    </div>
  )
}