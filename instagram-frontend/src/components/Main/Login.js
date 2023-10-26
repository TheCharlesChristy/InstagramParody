import React from 'react'
import './Login.css'

String.prototype.hashCode = function() {
    var hash = 0,
      i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr = this.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

function LoginPG({ login }) {
    const handleSubmit = async (event) => {
      event.preventDefault();
      let username = event.target[0].value
      let password = event.target[1].value.hashCode()

      await fetch('http://192.168.0.31:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "username": username, "password": password })
      }).then((response) => {
        if (response.status === 210) {
          response.json().then((data) => {
            login(data.username);
          });
        } else {
          alert("Incorrect username or password");
        }
      });
    };
  
    return (
      <div className='LoginPG'>
        <div className='LoginPG-img' />
        <form className='LoginPG-form' onSubmit={handleSubmit} method='POST'>
          <div className='LoginPG-title' />
          <input className='LoginPG-input' type='text' name='username' placeholder='Username' />
          <input className='LoginPG-input' type='password' name='password' placeholder='Password' />
          <button type='submit' className='LoginPG-button'>Login</button>
        </form>
      </div>
    );
  }
  
export default LoginPG
