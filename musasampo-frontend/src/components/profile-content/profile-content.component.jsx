import React, { Fragment, useState } from 'react';

import CustomButton from '../custom-button/custom-button.component';
import SignInButton from '../custom-button/custom-button.component';

import DeleteButton from '../profile-delete/profile-delete.component';
import { Link, withRouter } from 'react-router-dom';
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

          <Link to="/profile/newband" className='button'>
            <CustomButton> Add a Band </CustomButton>
          </Link>

          <Link to="/profile/newalbum" className='button'>
            <CustomButton> Add an Album for Your Band </CustomButton>
          </Link>

          <Link to="/profile/password" className='button'>
            <CustomButton> Change Password </CustomButton>
          </Link>

          <Link to="/profile/edit" className='button'>
            <CustomButton> Edit </CustomButton>
          </Link>

          <DeleteButton></DeleteButton>

         
        </div>
      </div>
    );
  }
}

export default withRouter(ProfileContent);