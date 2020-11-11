import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo2.png';

import './header.styles.scss';

const Header = () => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <img src={logo} alt="logo" />
    </Link>
    <div className='options'>
      <Link className='option' to='/'>
        GUITAR TUNER
      </Link>
      <Link className='option' to='/'>
        CHAT
      </Link>
      <Link className='option' to='/'>
        PLACEHOLDER
      </Link>
      <div className='option'>
        |
        </div>
      <Link className='option' to='/shop/albums'>
        SHOP
      </Link>
      <Link className='option' to='/login'>
        SIGN IN
          </Link>
    </div>
  </div>
);

export default Header;
