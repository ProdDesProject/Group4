import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import SubmitButton from '../submit-button/submit-button.component';

import './profile-edit.styles.scss';

import { Link } from 'react-router-dom';

class EditProfile extends React.Component 
{
  constructor(props)
  {
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
   handleSubmit = async event => {
    event.preventDefault();

    const { username, email, name, phoneNumber } = this.state;
    alert("edit user info:");
    alert(username);
    alert(email);
    alert(name);
    alert(phoneNumber);
    
    //component connection for creating album:->

     //Back to profile-page:
     this.props.history.push('/profile');
  }

  //Handles changes when user input is coming:
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };


  render() {
    const { username, email,name, phoneNumber } = this.state;
    return (
      <div className='container'>
        <div className='edit'>
            <h2 className='title'>Change account details</h2>
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
                required
              />
              <div className='buttons'>
                <Link to = "/profile" className='button'>
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