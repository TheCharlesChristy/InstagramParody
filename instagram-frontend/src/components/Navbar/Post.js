import React from 'react'
import './Post.css'

function Post({ postRedir }) {
  return (
    <div className='Post'>
      <button className='Postbtn' onClick={postRedir}></button>
    </div>
  )
}

export default Post
