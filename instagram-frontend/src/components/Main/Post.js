import React from 'react'
import './Post.css'
import Postpg from './Post/Postpg'

function PostPG({ uname }) {
  return (
    <div className='PostPG'>
      <Postpg uname={uname} />
    </div>
  )
}

export default PostPG
