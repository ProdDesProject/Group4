import React, { Fragment, useState } from 'react';

import CustomButton from '../custom-button/custom-button.component';
import { Link, withRouter } from 'react-router-dom';

import '../custom-button/custom-button.component';
import './account-details.styles.scss';

import DeleteButton from '../profile-delete/profile-delete.component';
import ProfileUserInfo from '../profile-user-info/profile-user-info.component';

class AccountDetails extends React.Component {
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
      <div className='profile-item1'>
        <div className='profile-box'>
          <div className='profileImage'>
            <img className='img' src="http://localhost:9000/upload/imagepath.png/kilpikalevi.PNG" alt="bandpic1"></img>
          </div>
          <div className='titleText'>
            Account details:
        </div>
          <ProfileUserInfo></ProfileUserInfo>
          <DeleteButton></DeleteButton>
          <Link to="/profile/edit" className='button'>
            <CustomButton> Edit </CustomButton>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(AccountDetails);