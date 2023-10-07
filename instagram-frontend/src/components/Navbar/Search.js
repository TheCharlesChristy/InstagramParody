import React from 'react';
import './Search.css';

function Search({ searchRedir }) {
  return (
    <div className='Search'>
      <button className='Searchbtn' onClick={searchRedir} ></button>
    </div>
  )
}

export default Search
