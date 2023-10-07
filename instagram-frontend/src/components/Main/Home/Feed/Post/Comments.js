import React from 'react'
import './Comments.css'
import Caption from './Comments/Caption'
import PostComment from './Comments/PostComment'

function Comments() {
  return (
    <div className='Comments'>
      <Caption />
      <PostComment />
    </div>
  )
}

export default Comments
