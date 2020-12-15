import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import SubmitButton from '../submit-button/submit-button.component';
import EditUser from '../../services/edit-user-service';
import {SignInServices} from '../../services/sign-in-service'

import './profile-edit.styles.scss';

import { Link } from 'react-router-dom';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      username: '',
      email: '',
      name: '',
      phoneNumber: ''
    };
  }

   //handles submit when clicked button ADD ALBUM:
   handleSubmit = async event => 
   {
    event.preventDefault();
    const updatedUser = 
    {
      username: this.state.username,
      email: this.state.email,
      name: this.state.name,
      phoneNumber: this.state.phoneNumber
    }

    //call service that modifies user with authorization
    await EditUser(updatedUser.username, updatedUser.email, updatedUser.name, updatedUser.phoneNumber)
    .then(status =>
      {
        if(status.status === 204)
        {
          //sign out user for the changes to take effect (only in the case of changing username it's required in fact)
          alert("Your profile has been edited successfully, you're being logged out and you have to login for the changes to have effect!");
          SignInServices.Signout();
        }
        else
        {
          alert("Error at editing the profile!");
        }
      });   
  }

  //Handles changes when user input is coming:
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };


  render() 
  {
    const { username, email, name, phoneNumber } = this.state;
    return (
      <div className='container'>
        <div className='edit'>
          <h2 className='title92'>Change account details</h2>
          <form className='edit-form' onSubmit={this.handleSubmit}>
            <FormInput
              type='text'
              name='username'
              value={username}
              onChange={this.handleChange}
              label='Username'
              required
            />
            <FormInput
              type='email'
              name='email'
              value={email}
              onChange={this.handleChange}
              label='E-mail'
              required
            />
            <FormInput
              type='text'
              name='name'
              value={name}
              onChange={this.handleChange}
              label='Name'
              required
            />
            <FormInput
              type='text'
              name='phoneNumber'
              value={phoneNumber}
              onChange={this.handleChange}
              label='Phone Number'
            />
            <div className='buttons17'>
              <Link to="/profile" className='button'>
                <CustomButton> Cancel </CustomButton>
              </Link>
              <SubmitButton type='submit'> Save changes </SubmitButton>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EditProfile;