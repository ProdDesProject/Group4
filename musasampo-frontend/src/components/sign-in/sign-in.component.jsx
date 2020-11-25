import React from 'react';

import FormInput from '../form-input/form-input.component';
import SignInButton from '../sign-in-button/sign-in-button.component';
import { withRouter} from 'react-router-dom';

import './sign-in.styles.scss';

var base64 = require('base-64');

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

    const { username, password } = this.state;

    try 
    {
      const requestOptions = 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username:username,password:password })
      }

      const response = await fetch('http://localhost:9000/users/checkuser2/',requestOptions)
      const data = await response.json();
      this.setState({ data: data });

      if (data == "404")
      {
        alert("404");  
      }
      else
      {
        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + base64.encode(username + ":" + password));

        const response2 = await fetch("http://localhost:9000/login", {method:'POST',headers: headers,})
        const token = await response2.json();

        alert(JSON.stringify(token));

        this.props.history.push({
          pathname: '/',
          state: { token: token }
        })

      }
    
      this.setState({ username: '', password: '' });

    } catch (error) {
      console.log(error);
    }
  };


  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };
  
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
