import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MovieEntry({ movie, getMovies, display } ) {
  const [watchedState, setWatchedState] = useState(movie.watched);
  const [titleState, setTitleState] = useState(false);
  const [tmdbData, setTmbdData] = useState([]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) setTitleState(false);
    return () => { isMounted = false }
  }, [watchedState ,display])

  function onTitleClick() {
    if (tmdbData.length === 0) {
      axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=ce2c7cb6a10e5145e2d433e13db5058b&language=en-US&query=${movie.movieName}`)
        .then(searchResult => searchResult.data.results[0].id)
        .then(movieId => axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=ce2c7cb6a10e5145e2d433e13db5058b&language=en-US`))
        .then(movie => setTmbdData(movie.data))
        .then(() => setTitleState(!titleState))
        .catch(err => console.log(err));
    } else {
      setTitleState(!titleState);
    }
  }

  function onWatchToggle() {
    event.preventDefault();
    axios.put('/api/movies', {movieName: movie.movieName, watched: !watchedState})
    .then(() => {
      setWatchedState(!watchedState);
      setTitleState(!titleState);
    })
    .then(err => console.log(err));
  }

  return (
    <div>
      <span onClick={onTitleClick}>{movie.movieName}</span>
      <div>
        {titleState ?
          <div>
            <button onClick={onWatchToggle}>
              {watchedState ? "To Watch" : "Watched"}
            </button>
            <div>Release year: {tmdbData.release_date}</div>
            <div>Runtime: {tmdbData.runtime} minutes</div>
            <div>Rating: {tmdbData.vote_average}</div>
            <div>Description: {tmdbData.overview}</div>
            <img src={`https://image.tmdb.org/t/p/w500/${tmdbData.poster_path}`} width="150" height="250"/>
            <br></br>
          </div>
          : null }
      </div>
    </div>
  )
}