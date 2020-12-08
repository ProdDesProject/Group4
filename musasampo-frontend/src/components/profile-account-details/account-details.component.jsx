import React, { Fragment, useState } from 'react';

import CustomButton from '../custom-button/custom-button.component';
import { Link, withRouter } from 'react-router-dom';

import getUserInfo from '../../services/user/get-user-info-service';

import '../custom-button/custom-button.component';
import './account-details.styles.scss';

import DeleteButton from '../profile-delete/profile-delete.component';
import ProfileUserInfo from '../profile-user-info/profile-user-info.component';

class AccountDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username:"",
      password:"",
      userId:"",
      username2:"",
      name:"",
      email:"",
      phoneNumber:"",
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
            <img className='img' src="http://localhost:9000/upload/userpicture/Kilpikalevi25/kilpikalevi.PNG" alt="bandpic1"></img>
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