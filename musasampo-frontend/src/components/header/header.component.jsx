import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo2.png';

import './header.styles.scss';

const Header = () => (
  <div className='header'>
    <Link className='logo-area' to='/'>
      <img src={logo} alt="logo" />
    </Link>
    <Link className='title' to='/'>
      MUSASAMPO
      </Link>
    <div className='options'>
      <Link className='option' to='/search'>
        SEARCH
      </Link>
      <Link className='option' to='/guitartuner'>
        GUITAR TUNER
      </Link>
      <Link className='option' to='/chat'>
        CHAT
      </Link>
      <div className='option'>
        |
        </div>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='login' to='/login'>
        SIGN IN
          </Link>
    </div>
  </div>
);

export default Header;
