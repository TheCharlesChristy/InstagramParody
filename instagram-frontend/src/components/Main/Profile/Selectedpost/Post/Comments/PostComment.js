import React from 'react'
import './PostComment.css'

function PostComment({ posturl }) {
  return (
    <div className='SelectedPostCommentdiv'>
      <div className='commentdiv'>
        COMMENTER: SAMPLE COMMENT
      </div>
      <div className='commentinputarea'>
        <textarea className='postinputcomment' placeholder='Comment Something...' id="postinputcomment"/>
        <button className='postcommentbutton'></button>
      </div>
    </div>
  )
}

export default PostComment
