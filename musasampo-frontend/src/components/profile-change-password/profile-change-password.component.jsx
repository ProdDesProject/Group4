import React from 'react';

import FormInput from '../form-input/form-input.component';
import SubmitButton from '../submit-button/submit-button.component';
import { stringify } from 'querystring';
import CustomButton from '../custom-button/custom-button.component';

import { Link } from 'react-router-dom';

import './profile-change-password.styles.scss';

class ChangePassword extends React.Component {
  constructor() {
    super();

    this.state = {
      password: '',
      newPassword: '',
      confirmNewPassword: ''
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    //variables from this.state:
    const { password, newPassword, confirmNewPassword } = this.state;

    //check new password and confirmedpassword match:
    if (newPassword !== confirmNewPassword) {
      alert("Passwords don't match");
      return;
    }
    //check that all is included in userinput: 
    if(!password || !newPassword || !confirmNewPassword)
    {
      alert("Neccessary fields not filled!");
      return;
    }

    /**
     * 
     *  NEED two methods here from services/sign-in and /create-album:
     * 1.check current password or token authentication
     * 2.Metthod for uploadtin information-> Dd
     * 
     * 
     */

     alert(password);
     alert(newPassword);
     alert(confirmNewPassword);
   
    
    //Delete values from local state variables because safety:
    try {
      this.setState({
        password: '',
        newPassword: '',
        confirmNewPassword: ''
      });
    } catch (error) {
      console.error(error);
    }

    //Back to profile-page:
    this.props.history.push('/profile');
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  onClickHandler = () =>
  {

  }

  render() {
    const { password, newPassword, confirmNewPassword } = this.state;
    return (
      <div className='container'>
      <div className='sign-up'>
        <h2 className='title'>Change your password</h2>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
            <FormInput
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
            label='Current Password'
            required
          />
          <FormInput
            type='password'
            name='newPassword'
            value={newPassword}
            onChange={this.handleChange}
            label='New Password'
            required
          />
          <FormInput
            type='password'
            name='confirmNewPassword'
            value={confirmNewPassword}
            onChange={this.handleChange}
            label='Confirm New Password'
            required
          />
          <div className='buttons'>
                <Link to = "/profile" className='button'>
                  <CustomButton> Cancel </CustomButton>
                </Link>

              <SubmitButton type='submit' onClick = {this.onClickHandler}> Save Changes </SubmitButton>
          </div>
        </form>
      </div>
      </div>
    );
  }
}

export default ChangePassword;