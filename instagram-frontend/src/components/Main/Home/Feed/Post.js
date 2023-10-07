import React from 'react'
import './Post.css'
import User from './Post/User'
import Content from './Post/Content'
import Comments from './Post/Comments'

function Post() {
  return (
    <div className='FeedPost'>
      <User />
      <Content />
      <Comments />
    </div>
  )
}

export default Post
