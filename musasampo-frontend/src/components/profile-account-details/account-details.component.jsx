import React, { Fragment, useState } from 'react';

import CustomButton from '../custom-button/custom-button.component';
import { Link, withRouter } from 'react-router-dom';

import getUserInfo from '../../services/user/get-user-info-service';

import '../custom-button/custom-button.component';
import './account-details.styles.scss';

class AccountDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username:"Kilpikalevi25",
      password:"salis12",
      userId:"",
      username2:"",
      name:"",
      email:"",
      phoneNumber:"",
      selectedFile: null

    };
  }

  async componentDidMount()
  {
    var result2 = [];
    result2 = await getUserInfo(this.state.username,this.state.password);

    this.setState({userId:result2.user[0].userId});
    this.setState({username:result2.user[0].username});
    this.setState({name:result2.user[0].name});
    this.setState({email:result2.user[0].email});
    this.setState({phoneNumber:result2.user[0].phoneNumber});
    //save result to this.state
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
          <div className='user-info'>
            <div className='descriptor'>
              <dt>Username:</dt>
              <dt>Email:</dt>
              <dt>Name:</dt>
              <dt>Phone number:</dt>
            </div>

            <div className='infotext'>
              <dt>{this.state.username}</dt>
              <dt>{this.state.email}</dt>
              <dt>{this.state.name}</dt>
              <dt>{this.state.phoneNumber}</dt>
            </div>
          </div>
          <Link to="/profile/edit" className='button'>
            <CustomButton> Edit </CustomButton>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(AccountDetails);