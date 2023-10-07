import React from 'react';
import './App.css';
import Navbar from './components/Navbar.js';
import Home from './components/Navbar/Home.js'; 
import Search from './components/Navbar/Search.js'; 
import Post from './components/Navbar/Post.js'; 
import Profile from './components/Navbar/Profile.js';
import HomePG from './components/Main/Home.js';
import SearchPG from './components/Main/Search.js';
import PostPG from './components/Main/Post.js';
import ProfilePG from './components/Main/Profile.js';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [content, setContent] = useState(<HomePG />);
  const [isHome, setHome] = useState(0);
  const [isSearch, setSearch] = useState(0);
  const [isPost, setPost] = useState(0);
  const [isProfile, setProfile] = useState(0);

  function homeRedir() {
    if (isHome === 0) {
      setContent(<HomePG />);
      setHome(1);
      setSearch(0);
      setPost(0);
      setProfile(0);
      console.log(content)
    }
  }

  function searchRedir() {
    if (isSearch === 0) {
      setContent(<SearchPG />);
      setHome(0);
      setSearch(1);
      setPost(0);
      setProfile(0);
      console.log(content)
    }
  }

  function postRedir() {
    if (isPost === 0) {
      setContent(<PostPG />);
      setHome(0);
      setSearch(0);
      setPost(1);
      setProfile(0);
      console.log(content)
    }
  }

  function profileRedir() {
    if (isProfile === 0) {
      setContent(<ProfilePG />);
      setHome(0);
      setSearch(0);
      setPost(0);
      setProfile(1);
      console.log(content)
    }
  }
  
  return (
    <Router>
      <div className="App">
        <Navbar homeRedir={homeRedir} searchRedir={searchRedir} postRedir={postRedir} profileRedir={profileRedir}/>
        <Routes>
          <Route path="/" exact component={Home} />
          <Route path="/search" exact component={Search} />
          <Route path="/post" exact component={Post} />
          <Route path="/profile" exact component={Profile} />
        </Routes>
        {content}
      </div>
    </Router>
  );
}

export default App;
