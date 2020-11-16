import React from 'react';
import logo from '../../assets/logo.png';

import './homepage.styles.scss';

const HomePage = () => (
  <div className='homepage'>
    <div className='introduction'>
      <div className='logo-area'>
        <img src={logo} alt="logo" />
      </div>
      <div className='infoText'>
        MUSASAMPO is a website dedicated to all your music needs. We offer a multitude of services for bands and fans alike. Please edit this text.
      </div>
    </div>
    <div className='parts'>
      <div className='part-container'>
        <div className='part1'>
        </div>
        <div className='part2'>
        </div>
      </div>
      <div className='part3'>
      </div>
    </div>
  </div>
);

export default HomePage;
