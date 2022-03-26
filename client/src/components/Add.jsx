import React, { useState } from 'react';
import axios from 'axios';

export default function Add ({ getMovies }) {
  const [add, setAdd] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    addMovie()
      .then(() => getMovies())
      .then(() => setAdd(''));
  }

  function addMovie() {
    return axios.post('api/movies', {movieName: add})
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={add}
          placeholder="enter a movie name"
          onChange={(e) => setAdd(e.target.value)}/>
        <input
          type="submit"
          value="Add Movie"/>
      </form>
    </div>
  )
}