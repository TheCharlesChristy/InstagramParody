import React from 'react'
import { useState } from 'react'
import './profiledetails.css'
import Pfp from './Profile-details/pfp.js'
import Userstats from './Profile-details/userstats.js'
import Editorfollow from './Profile-details/editorfollow.js'

function Profiledetails({ userData, viewing }) {
  const [imgdata, setImgdata] = useState(userData.imgdata);

  const updatepfp = (data) => {
    console.log(data);
    console.log(imgdata);
    setImgdata(data);
    console.log(imgdata);
  }

  return (
    <div className='profiledetails' id='profdetails'>
      <Pfp imgdata={imgdata}/>
      <div className='profilebars'>
        <Userstats userData={userData}/>
        <Editorfollow username={userData.username} viewing={viewing} updatepfp={updatepfp}/>
      </div>
    </div>
  )
}

export default Profiledetails
