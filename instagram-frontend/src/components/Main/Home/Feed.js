import React, { useRef } from 'react'
import './Feed.css'
import Story from './Feed/Story.js'
import Dm from './Feed/Dm'
import Post from './Feed/Post.js'

function Feed() {
  const storyBarRef = useRef(null);

  const handleWheelScroll = (e) => {
    let constant = 15;
    if (e.deltaY < 0) {
      constant = constant*-1;
    }
    if (storyBarRef.current) {
      storyBarRef.current.scrollLeft += constant;
    };
  };
  return (
    <div className='Feed'>
      <div className='StoryBar' ref={storyBarRef} onWheel={handleWheelScroll}>
        <Story />
        <Story />
        <Story />
      </div>
      <Dm />
      <div className='Posts'>
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  )
}

export default Feed
