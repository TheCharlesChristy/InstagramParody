import React from 'react'
import './Content.css'

function Content({ imgdata }) {
  return (
    <div className='SelectedContent'>
      <img className='SelectedContent-post' src={`data:image/webp;base64,${imgdata}`} alt='post content' />
    </div>
  )
}

export default Content
