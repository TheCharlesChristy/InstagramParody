import React from 'react'
import './Postpg.css'
import Takepost from './Takepost/Takepost'
import Editpost from './EditPost/Editpost'
import { useState } from 'react'

function Postpg({ uname }) {
  const [content, setContent] = useState(<Takepost photopost = {gotoedit}/>)
  
  function gotoedit(origphoto) {
    console.log(origphoto);
    setContent(<Editpost origphoto={origphoto} returntoselect={returntoselect} postphoto={postphoto} uname={uname} />)
  }

  function returntoselect() {
    setContent(<Takepost photopost = {gotoedit}/>)
  }

  function postphoto() {
    alert("Photo posted!");
    setContent(<Takepost photopost = {gotoedit}/>)
  }
  return (
    <div className='Postpg'>
      {content}
    </div>
  )
}

export default Postpg
