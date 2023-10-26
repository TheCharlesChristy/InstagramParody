import React from 'react'
import './profilepost.css'

function Profilepost({ post, openpost }) {

  const doclick = () => {
    openpost(post)
  }
  return (
    <div className='profilepost' onClick={doclick}>
      <img src={`data:image/webp;base64,${post.imgdata}`} alt='post' className='profilepostimg'/>
    </div>
  )
}

export default Profilepost
