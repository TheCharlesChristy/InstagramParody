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
import LoginPG from './components/Main/Login.js';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [isLoggedin, setLoggedin] = useState(false);
  const [username, setUsername] = useState("");   
  const [content, setContent] = useState(<LoginPG login={login} />);
  const [isHome, setHome] = useState(0);
  const [isSearch, setSearch] = useState(0);
  const [isPost, setPost] = useState(0);
  const [isProfile, setProfile] = useState(0);

  function login(uname) {
    setLoggedin(true);
    setUsername(uname);
    setContent(<HomePG />);
    setHome(1);
    setSearch(0);
    setPost(0);
    setProfile(0);
  }

  function homeRedir() {
    if (isLoggedin===true) {
      setContent(<HomePG />);
      setHome(1);
      setSearch(0);
      setPost(0);
      setProfile(0);
    }else if(isLoggedin===false){
      alert("Please login first!");
    }
  }

  function searchRedir() {
    if (isLoggedin===true) {
      setContent(<SearchPG username={username}/>);
      setHome(0);
      setSearch(1);
      setPost(0);
      setProfile(0);
    }else if(isLoggedin===false){
      alert("Please login first!");
    }
  }

  function postRedir() {
    if (isLoggedin===true) {
      setContent(<PostPG uname={username}/>);
      setHome(0);
      setSearch(0);
      setPost(1);
      setProfile(0);
    }else if(isLoggedin===false){
      alert("Please login first!");
    }
  }

  function selfprofileRedir() {
    if (isLoggedin===true) {
      setContent(<ProfilePG username={username} viewing={username} />);
      setHome(0);
      setSearch(0);
      setPost(0);
      setProfile(1);
    }else if(isLoggedin===false){
      alert("Please login first!");
    }
  }
  
  return (
    <Router>
      <div className="App">
        <Navbar homeRedir={homeRedir} searchRedir={searchRedir} postRedir={postRedir} profileRedir={selfprofileRedir}/>
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
