import React from 'react'
import { useState, useEffect } from 'react'
import './Search.css'

function SearchPG({ username }) {
  useEffect(() => {
    fetch('http://192.168.0.31:5000/api/getrecommendedusers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  }, []);
  return (
    <div className='SearchPG'>
    </div>
  )
}

export default SearchPG
