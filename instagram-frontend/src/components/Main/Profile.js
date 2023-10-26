import React, { useEffect, useState } from 'react'
import './Profile.css'
import Profiledetails from './Profile/profiledetails.js'
import Postcontainer from './Profile/profile-posts/postcontainer.js'
import Selectedpost from './Profile/Selectedpost/Post.js'

function ProfilePG({ username, viewing }) {

  const samplepostdata = {caption:"Loading",content:"Loading",imgdata:"Loading",username:"Loading"}

  const [userData, setUserData] = useState();
  const [post, setPost] = useState(samplepostdata);

  const openpost = (post) => {
    setPost(post);
    const profDetails = document.getElementById('profdetails');
    const profPosts = document.getElementById('profposts');
    const selectedpost = document.getElementById('selectedpost');
    if (profDetails && profPosts && selectedpost) {
      profDetails.style.display = 'none';
      profPosts.style.display = 'none';
      selectedpost.style.display = 'flex';
    }
  }
  const returntoprofile = () => {
    const profDetails = document.getElementById('profdetails');
    const profPosts = document.getElementById('profposts');
    const selectedpost = document.getElementById('selectedpost');
    if (profDetails && profPosts && selectedpost) {
      profDetails.style.display = 'flex';
      profPosts.style.display = 'flex';
      selectedpost.style.display = 'none';
    }
  }

  useEffect(() => {
    fetch('http://192.168.0.31:5000/api/userdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    })
    .then(response => response.json())
    .then(data => {setUserData(data)})
    .catch(error => console.error(error));
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='ProfilePG'>
      <div className='profile__header'>
        <div className='userstats__name'>
          <text>@{userData.username}</text>
        </div>
        <Profiledetails userData={userData} viewing={viewing}/>
      </div>
      <Postcontainer username={username} openpost={openpost} />
      <Selectedpost post={post} returntoprofile={returntoprofile}/>
    </div>
  )
}

export default ProfilePG
