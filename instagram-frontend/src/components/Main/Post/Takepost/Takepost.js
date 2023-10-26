import React, { useState, useEffect, useRef } from 'react'
import './Takepost.css'

function Takepost({ photopost }) {
  const [stream, setStream] = useState(null);
  const [photo, setPhoto] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    async function getMediaStream() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(mediaStream);
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    }

    getMediaStream();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const takePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const data = canvas.toDataURL('image/png');
    setPhoto(data);
    photopost(data);
  };

  const selectPhoto = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
    fileInput.addEventListener("change", (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = function () {
          const img = new Image();
          img.src = reader.result;
          img.onload = function () {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            context.scale(-1, 1);
            context.drawImage(img, -img.width, 0);
            const base64Data = canvas.toDataURL("image/png");
            setPhoto(base64Data);
            photopost(base64Data);
          };
        };
        reader.readAsDataURL(selectedFile);
      }
    });
  }
  
  
  

  return (
    <div className='Takepost'>
        <input type="file" id="fileInput" className='hiddeninput' accept="image/*"></input>
        <button onClick={selectPhoto} className='selectpost'>Select photo</button>
        <div className='takephotodiv'>
          <video ref={videoRef} autoPlay muted style={{ transform: 'scaleX(-1)' }} className='stream'/>
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <button onClick={takePhoto} className='takephoto'></button>
        </div>
    </div>
  )
}

export default Takepost
