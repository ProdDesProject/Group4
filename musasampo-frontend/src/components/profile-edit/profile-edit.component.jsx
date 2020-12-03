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