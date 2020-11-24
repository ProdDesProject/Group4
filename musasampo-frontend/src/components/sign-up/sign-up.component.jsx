import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { stringify } from 'querystring';

import './sign-up.styles.scss';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      email: '',
      name: '',
      phoneNumber: '',
      password: '',
      confirmPassword: ''
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { username, email,name, phoneNumber, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    if(!username || !email || !name)
    {
      alert("Neccessary fields not filled!");
      return;
    }
    try {

      // SIGN UP CODE GOES HERE

      this.setState({
        username: '',
        email: '',
        name: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
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
      "username": this.state.username, 
      "password": this.state.password,
      "name": this.state.name, 
      "email": this.state.email, 
      "phoneNumber": this.state.phoneNumber,
      "usersToken": null
    };

    postmethod(object);

    //alert object
    //alert(stringify(object));
  }

  render() {
    const { username, email,name, phoneNumber, password, confirmPassword } = this.state;
    return (
      <div className='sign-up'>
        <h2 className='title'>I do not have an account</h2>
        <span className='subtitle'>Sign up with your email and a username</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
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
            label='Email'
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
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={this.handleChange}
            label='Confirm Password'
            required
          />
          <div className='buttons'>
          <CustomButton type='submit' onClick = {this.onClickHandler}> Sign up </CustomButton>
            </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
