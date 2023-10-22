import {React, useState} from 'react'
import './Editpost.css'

function Editpost({ origphoto, returntoselect, postphoto, uname }) {
  const [blur, setBlur] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [grayscale, setGrayscale] = useState(0);
  const [saturate, setSaturate] = useState(100);

  const applyFilter = () => {
    let videoelement = document.querySelector('.thepost');
    videoelement.style.filter = 'blur('+blur+'px) brightness('+brightness+'%) contrast('+contrast+'%) grayscale('+grayscale+'%) saturate('+saturate+'%)';
  };

  const dopost = () => {
    const canvas = document.createElement('canvas');
    const videoelement = document.querySelector('.thepost');
    const context = canvas.getContext('2d');
    const img = new Image();
    img.src = videoelement.src;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.filter = 'blur('+blur+'px) brightness('+brightness+'%) contrast('+contrast+'%) grayscale('+grayscale+'%) saturate('+saturate+'%)';
      context.drawImage(img, 0, 0);
      const filteredImageData = canvas.toDataURL();
      postphoto(filteredImageData);
    };
  }

  async function postphoto (filteredImageData) {
    const caption = document.getElementById('inputcaption').value;
    const data = {username: uname, photo: filteredImageData, caption: caption};
    await fetch('http://localhost:5000/api/addPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      }).then((response) => {
        if(response.status === 200){
          alert("Photo posted!");
          returntoselect();
        }else{
          alert("Error posting photo!");
        }
      });
  }

  return (
    <div className='Editpost'>
      <input type="button" className='returnbtn' onClick={returntoselect}/>
      <img src={origphoto} alt='origphoto' className='thepost'/>
        <div className='filters'>
          <div className='slider'>
            <label htmlFor="blur">Blur: {blur}</label>
            <input type="range" id="blur" name="blur" min="0" max="10" value={blur} onChange={(e) => {setBlur(e.target.value); applyFilter();}} className='theslider' />
          </div>
          <div className='slider'>
            <label htmlFor="brightness">Brightness: {brightness}</label>
            <input type="range" id="brightness" name="brightness" min="0" max="200" value={brightness} onChange={(e) => {setBrightness(e.target.value); applyFilter();}} className='theslider' />
          </div>
          <div className='slider'>
            <label htmlFor="contrast">Contrast: {contrast}</label>
            <input type="range" id="contrast" name="contrast" min="0" max="200" value={contrast} onChange={(e) => {setContrast(e.target.value); applyFilter();}} className='theslider' />
          </div>
          <div className='slider'>
            <label htmlFor="grayscale">Grayscale: {grayscale}</label>
            <input type="range" id="grayscale" name="grayscale" min="0" max="100" value={grayscale} onChange={(e) => {setGrayscale(e.target.value); applyFilter();}} className='theslider' />
          </div>
          <div className='slider'>
            <label htmlFor="saturate">Saturation: {saturate}</label>
            <input type="range" id="saturate" name="saturate" min="0" max="200" value={saturate} onChange={(e) => {setSaturate(e.target.value); applyFilter();}} className='theslider' />
          </div>
        </div>
        <textarea className='inputcaption' placeholder='Caption' id="inputcaption"/>
        <input type="button" className='postbutton' onClick={dopost}/>
    </div>
  )
}

export default Editpost
