import React from 'react';
import { Link } from 'react-router-dom';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

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
      <Link className='option' to='/'>
        CHAT
      </Link>
      <div className='option'>
        |
        </div>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/login'>
        SIGN IN
          </Link>
    </div>
  </div>
);

export default Header;
