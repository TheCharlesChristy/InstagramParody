import React from 'react'
import './profiledetails.css'
import Pfp from './Profile-details/pfp.js'
import Userstats from './Profile-details/userstats.js'
import Editorfollow from './Profile-details/editorfollow.js'

function Profiledetails() {
  return (
    <div className='profiledetails'>
      <Pfp />
      <div className='profilebars'>
        <Userstats />
        <Editorfollow />
      </div>
    </div>
  )
}

export default Profiledetails
