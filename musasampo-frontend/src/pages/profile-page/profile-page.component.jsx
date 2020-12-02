import React , { Fragment, useState } from 'react';

import CustomButton from '../../components/custom-button/custom-button.component';

import { Link, withRouter } from 'react-router-dom';

import '../../components/custom-button/custom-button.component';

import './profile-page.styles.scss';

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

            <div className='user-info'>

                <div className='descriptor'>
                    <dt>Username:</dt>
                    <dt>Email:</dt>
                    <dt>Name:</dt>
                    <dt>Phone number:</dt>
                </div>

                <div className='infotext'>
                    <dt>coolPeter88</dt>
                    <dt>peter.peter@mail.com</dt>
                    <dt>Peter Peter</dt>
                    <dt>123 90++</dt>
                </div>
            </div>

            <Link to = "/profile/edit" className='button'>
                <CustomButton> Edit </CustomButton>
            </Link>

            <Link to = "/profile/password" className='button'>
                <CustomButton> Change Password </CustomButton>
            </Link>
        </div>

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
    );
  }
}

export default withRouter(ProfilePage);
