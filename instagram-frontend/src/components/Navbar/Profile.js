import React from 'react'
import './Profile.css'

function Profile({ profileRedir }) {
  return (
    <div className='Profile'>
      <button className='Profilebtn' onClick={profileRedir} ></button>
    </div>
  )
}

export default Profile
