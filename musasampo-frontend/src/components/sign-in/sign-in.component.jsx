import React from 'react';

import FormInput from '../form-input/form-input.component';
import SignInButton from '../sign-in-button/sign-in-button.component';
import { withRouter} from 'react-router-dom';

import './sign-in.styles.scss';

import {SignInServices} from '../../services/sign-in-service'


class SignIn extends React.Component 
{
  constructor(props) 
  {
    super(props);
    //state for current username, password, status of the login and submission awaiting
    this.state = 
    {
      username: '',
      password: '',
      status: true,
      submitting: false
    };
  }

  //when clicket sign in button: post-login and returns token if succeeded.
  handleSubmit = async event => 
  {
    event.preventDefault();
    this.setState({submitting: true});
    await SignInServices.Signin(this.state.username,this.state.password)
    .then(result =>
    {
      if (result !== undefined && result.result === true)
      {
        let token = result.token;
        
        this.setState({status: true, submitting: false});

        //reroute to main with authorization
        this.props.history.push({
          pathname: '/',
          token: token,
          login: true
        });
      }
      else
      {
        this.setState({status: false, submitting: false});
        //alert("Wrong credentials!");
      }
    });
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
            <SignInButton type='submit' disabled = {this.state.submitting}> Sign in </SignInButton>
            {this.state.submitting && <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />}
          </div>

          {!this.state.status && <p>Username or password incorrect!</p>}

        </form>
      </div>
    );
  }
}
export default withRouter(SignIn);

