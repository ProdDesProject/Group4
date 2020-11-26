import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { stringify } from 'querystring';
import Data from '../../components/data/data.jsx';

import { withRouter} from 'react-router-dom';

import './sign-up.styles.scss';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

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

  onClickHandler = async () =>
  {
    var result = await Data.Signup(this.state.username,this.state.email,this.state.name,this.state.phoneNumber,this.state.password);
    alert(result);

    if (result.result == "true")
    {
      this.props.history.push({
        pathname: '/',
      });
    }else
    {
      alert("something went wrong!");
    }
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

export default withRouter(SignUp);
