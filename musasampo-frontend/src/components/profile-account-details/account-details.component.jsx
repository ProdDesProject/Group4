import React, { Fragment, useState } from 'react';

import CustomButton from '../custom-button/custom-button.component';
import { withRouter} from 'react-router-dom';

import '../custom-button/custom-button.component';

import './account-details.styles.scss';

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
        <a href="/profile/edit" className='button'>
            <CustomButton> Edit </CustomButton>
          </a>
    </div>
    </div>
    );
  }
}

export default withRouter(AccountDetails);