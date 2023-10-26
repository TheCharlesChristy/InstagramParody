import React, { useState, useEffect } from 'react'
import './postcontainer.css'
import Profilepost from './profilepost.js'

function Postcontainer({ username, openpost }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://192.168.0.31:5000/api/getuserposts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "username": username })
      })
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error(error));
  }, [username]);

  return (
    <div className='Postcontainer' id='profposts'>
      {posts.map(post => (
        <Profilepost openpost={openpost} key={post.content} post={post}/>
      ))}
    </div>
  )
}

export default Postcontainer
