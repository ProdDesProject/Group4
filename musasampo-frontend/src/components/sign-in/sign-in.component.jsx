import React from 'react';

import FormInput from '../form-input/form-input.component';
import SignInButton from '../sign-in-button/sign-in-button.component';
import { withRouter} from 'react-router-dom';

import Data from '../../components/data/data.jsx';
import { stringify } from 'querystring';

import './sign-in.styles.scss';


class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  //when clicket sign in button: post-login and returns token if succeeded.
  handleSubmit = async event => 
  {
    event.preventDefault();
    var result = await Data.Signin(this.state.username,this.state.password);

    if (result.result == "true")
    {
      let token = result.token;
      
      this.props.history.push({
        pathname: '/',
        token: token,
        login: true
      });

    }else
    {
      alert("something went wrong!");
    }

  };

  //handles changes on user input 
  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };
  
  //render render stuff
  render() {
    return (
      <div className='sign-in'>
        <h2 className='title'>I already have an account</h2>
        <span className='subtitle'>Sign in with your username and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='username'
            type='text'
            handleChange={this.handleChange}
            value={this.state.username}
            label='Username'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={this.state.password}
            handleChange={this.handleChange}
            label='Password'
            required
          />
          <div className='buttons'>
            <SignInButton type='submit'> Sign in </SignInButton>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignIn);

