import React from 'react'
import './Comments.css'
import Caption from './Comments/Caption'
import PostComment from './Comments/PostComment'

function Comments({ postcap, posturl, username }) {
  return (
    <div className='SelectedComments'>
      <Caption postcap={postcap} username={username}/>
      <PostComment posturl={posturl}/>
    </div>
  )
}

export default Comments
