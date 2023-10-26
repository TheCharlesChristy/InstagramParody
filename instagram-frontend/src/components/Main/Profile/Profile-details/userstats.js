import React from 'react'
import { useState } from 'react'
import './userstats.css'

function Userstats({ userData }) {
  const [uname, setUname] = useState(userData.username);
  const [followers, setfollowers] = useState(userData.followers);
  const [following, setfollowing] = useState(userData.following);
  const [pfpurl, setpfpurl] = useState(userData.pfpurl);

  return (
    <div className='userstats'>
      <div className='userstats__followers'>
        <text>{followers}</text>
        <text>Followers</text>
      </div>
      <div className='userstats__following'>
        <text>{following}</text>
        <text>Following</text>
      </div>
    </div>
  )
}

export default Userstats
