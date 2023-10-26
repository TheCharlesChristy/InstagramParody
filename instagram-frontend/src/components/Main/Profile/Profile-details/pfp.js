import React, { useState, useEffect } from 'react';
import './pfp.css';

function Pfp({ imgdata }) {
  const [imageSource, setImageSource] = useState(null);

  const updatepfp = () => {
    // Decode the base64 data when the component mounts
    if (imgdata) {
      const binaryImage = atob(imgdata);
      const byteArray = new Uint8Array(binaryImage.length);
      for (let i = 0; i < binaryImage.length; i++) {
        byteArray[i] = binaryImage.charCodeAt(i);
      }
      const blob = new Blob([byteArray], { type: 'image/png' });
      const url = URL.createObjectURL(blob);
      setImageSource(url);
    }
  };

  useEffect(() => {
    updatepfp();
  }, [imgdata]);

  return (
    <div className='pfp'>
      {imageSource ? (
        <img src={imageSource} alt='Profile Picture' className='pfpimg'/>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Pfp;