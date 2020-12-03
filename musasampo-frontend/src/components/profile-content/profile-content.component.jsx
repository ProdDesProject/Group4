import React , { Fragment, useState } from 'react';

import CustomButton from '../custom-button/custom-button.component';
import SignInButton from '../custom-button/custom-button.component';
import { withRouter} from 'react-router-dom';
import '../custom-button/custom-button.component';

import './profile-content.styles.scss';

var base64 = require('base-64');

class ProfileContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null
    
    };
  }

  /**
   * RENDER
   */

  render() {
    return (
      <div className='profile-item2'>
        <div className='band-stuff'>
        <a href="/profile/newband" className='button'>
                <CustomButton> Add Your Band </CustomButton>
            </a>
        <a href="/profile/newalbum" className='button'>
                <CustomButton> Add an Album for Your Band </CustomButton>
            </a>
        <a href="/profile/password" className='button'>
                <CustomButton> Change Password </CustomButton>
            </a>
        </div>
    </div>
    );
  }
}

export default withRouter(ProfileContent);