import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Search({ setSearchedView, setDisplay }) {
  const [search, setSearch] = useState('');

  function handleSubmit() {
    event.preventDefault();
    if (search.length !== 0) {
      searchMovies()
        .then(movies => setSearchedView(movies.data))
        .then(() => setSearch(''))
        .then(setDisplay('searched'))
        .catch(err => console.log(err));
    } else {
      setDisplay('watched')
    }
  }

  function searchMovies() {
    return axios.get('/api/movies/search', { params: { term: search } })
  }

  return(
    <div>
      <form>
        <input
          type="text"
          value={search}
          placeholder="enter a search query"
          onChange={(e) => setSearch(e.target.value)}/>
        <input
          type="button"
          value="Search"
          onClick={handleSubmit}/>
      </form>
    </div>
  )
}