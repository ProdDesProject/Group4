import React from 'react';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import SignInButton from '../../components/sign-in-button/sign-in-button.component';
import { stringify } from 'querystring';

import './profile-new-band.styles.scss';

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
      <div className='container'>
      <div className='new-band'>
        <h2 className='title5'>Add a new band</h2>
        <span className='subtitle5'>Fill in information for your band</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput
            type='text'
            name='bandName'
            value={username}
            onChange={this.handleChange}
            label='Band Name'
            required
          />
          <FormInput
            type='email'
            name='countryOfOrigin'
            value={email}
            onChange={this.handleChange}
            label='Country of Origin'
            required
          />
          <FormInput
            type='text'
            name='location'
            value={name}
            onChange={this.handleChange}
            label='Location'
            required
          />
          <FormInput
            type='text'
            name='formedIn'
            value={phoneNumber}
            onChange={this.handleChange}
            label='Formed In (Year)'
          />
          <FormInput
            type='text'
            name='genres'
            value={password}
            onChange={this.handleChange}
            label='Genres'
            required
          />
          <FormInput
            type='text'
            name='LyricalThemes'
            value={confirmPassword}
            onChange={this.handleChange}
            label='Lyrical Themes'
            required
          />
          <FormInput
            type='text'
            name='currentLabel'
            value={confirmPassword}
            onChange={this.handleChange}
            label='Current Label'
            required
          />
          <div className='buttons5'>
          <SignInButton type='submit' onClick = {this.onClickHandler}> Add Band </SignInButton>
            </div>
        </form>
      </div>
      </div>
    );
  }
}

export default SignUp;