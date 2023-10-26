import React from 'react'
import './editorfollow.css'

function Editorfollow({ username, viewing, updatepfp }) {

  function editpfp() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const rawFileData = reader.result;
        // Send the raw file data to the server
        fetch('http://192.168.0.31:5000/api/changepfp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "username": username, "rawFileData": rawFileData })
        })
        .then(response => response.json())
        .then(data => {
          updatepfp(data.imgdata);
        })
        .catch(error => console.error(error));
      };
    };
    input.click();
  }
  
  return (
    <div className='editorfollow'>
      {viewing === username ? (
        <div className='editprofile'>
          <button className='editbtn' onClick={editpfp}>Change Profile Picture</button>
        </div>
      ) : (
        <div className='follow'>
          <button className='followbtn'>Follow</button>
        </div>
      )}
    </div>
  )
}

export default Editorfollow
