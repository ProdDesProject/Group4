import React , { Fragment, useState } from 'react';

import CustomButton from '../../components/custom-button/custom-button.component';

import { Link, withRouter } from 'react-router-dom';

import '../../components/custom-button/custom-button.component';
import '../../components/profile-user-info/profile-user-info.component';

import './profile-page.styles.scss';
import ProfileUserInfo from '../../components/profile-user-info/profile-user-info.component';
import DeleteButton from '../../components/profile-delete/profile-delete.component';

var base64 = require('base-64');

class ProfilePage extends React.Component 
{
  constructor(props)
  {
    super(props);

  }

  //render the html
  render() {
    return (
      <div className='profile-item'>
        <div className="App">
          <div className='test'>

            <div className='profileImage'>
              <img className='img' src="http://localhost:9000/upload/imagepath.png/kilpikalevi.PNG" alt="bandpic1"></img>
            </div>

            <div className='titleText'>
              Account details:
            </div>

           <ProfileUserInfo></ProfileUserInfo>

            <DeleteButton className = 'button'></DeleteButton>

            <Link to = "/profile/edit" className='button'>
                <CustomButton> Edit </CustomButton>
            </Link>

            <Link to = "/profile/password" className='button'>
                <CustomButton> Change Password </CustomButton>
            </Link>

          <div className='band-stuff'>
            <Link to ="/profile/newband" className='button'>
                    <CustomButton> Add Your Band </CustomButton>
            </Link>
            
            <Link to="/profile/newalbum" className='button'>
                    <CustomButton> Add an Album for Your Band </CustomButton>
            </Link>
          </div>
          </div>
        </div>
    </div>
    );
  }
}

export default withRouter(ProfilePage);
