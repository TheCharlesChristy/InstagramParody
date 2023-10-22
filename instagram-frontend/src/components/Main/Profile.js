import React from 'react'
import './Profile.css'
import Profiledetails from './Profile/profiledetails.js'
import Postcontainer from './Profile/profile-posts/postcontainer.js'

function ProfilePG() {
  return (
    <div className='ProfilePG'>
      <Profiledetails />
      <Postcontainer />
    </div>
  )
}

export default ProfilePG
