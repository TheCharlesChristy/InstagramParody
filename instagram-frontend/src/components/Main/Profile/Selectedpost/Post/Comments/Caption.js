import React from 'react'
import './Caption.css'

function Caption({ postcap, username }) {
  return (
    <div className='SelectedCaption'>
        <div className='SelectedCap'>{username}: {postcap}</div>
        <button className='SelectedViewComments'>View all</button>
    </div>
  )
}

export default Caption
