import React from 'react';
import './Home.css';

function Home({ homeRedir }) {
  return (
    <div className='Home'>
      <button className='Homebtn' onClick={homeRedir}></button>
    </div>
  );
}

export default Home;
