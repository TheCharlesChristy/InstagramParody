import React from 'react'
import './Post.css'
import Content from './Post/Content'
import Comments from './Post/Comments'

function Selectedpost({ post, returntoprofile }) {
  return (
    <div className='SelectedPost' id='selectedpost'>
      <button className='SelectedClosePost' onClick={returntoprofile}>X</button>
      <Content imgdata={post.imgdata}/>
      <Comments postcap={post.caption} posturl={post.content} username={post.username}/>
    </div>
  )
}

export default Selectedpost
