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

    const { password, newPassword, confirmNewPassword } = this.state;

    if (newPassword !== confirmNewPassword) {
      alert("Passwords don't match");
      return;
    }
    if(!password || !newPassword || !confirmNewPassword)
    {
      alert("Neccessary fields not filled!");
      return;
    }
    try {

      // SIGN UP CODE GOES HERE

      this.setState({
        password: '',
        newPassword: '',
        confirmNewPassword: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  onClickHandler = () =>
  {

    async function postmethod(data)
    {
      var FormData = data;

      const requestOptions = 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(FormData)
      }
  
      const response =  await fetch('http://localhost:9000/users/createuser',requestOptions)
      const data2 = await response.json();
      
      //useless stuff that doesn't run

      alert(stringify(data2));

      this.setState(data2);

      switch (data2)
      {
          case '404': alert('not found'); break;
          case '400': alert('bad request'); break;
          case '200': alert('done'); break;
          default: alert('something went wrong');
      }
    }

    const data = new FormData();
    var object = 
    { 
      "newPassword": this.state.newPassword
    };

    postmethod(object);

    //alert object
    //alert(stringify(object));
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