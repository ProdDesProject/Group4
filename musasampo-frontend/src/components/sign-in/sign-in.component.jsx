import React from 'react';

import FormInput from '../form-input/form-input.component';
import SubmitButton from '../submit-button/submit-button.component';
import { withRouter} from 'react-router-dom';
import './sign-in.styles.scss';
import {SignInServices} from '../../services/sign-in-service';
import {UserSearchService} from '../../services/user-search-service';

class SignIn extends React.Component 
{
  constructor(props) 
  {
    super(props);

    //check for already existing token in the browser(user already logged in)
    if(SignInServices.currentTokenValue)
    {
      //reroute to main with authorization
      this.props.history.push({
        pathname: '/',
      });
    }

    //state for current username, password, status of the login and submission awaiting
    this.state = 
    {
      username: '',
      password: '',
      status: true,
      submitting: false,
      submitMessage: ''
    };
  }

  //when clicked sign in button: post-login and returns token if succeeded.
  handleSubmit = async event => 
  {
    event.preventDefault();
    this.setState({submitting: true});
    //check if user is allowed to sign in first(usersToken doesn't have the value "disabled")
    const checkUser = await UserSearchService.usernameSearch(this.state.username);
    if(checkUser === undefined)
    {
      this.setState({submitMessage: "User does not exist!"});
      this.setState({submitting: false, status: false});
    }
    else
    {
      if(checkUser[0].usersToken !== "disabled")
      {
          await SignInServices.Signin(this.state.username,this.state.password)
          .then(result =>
          {
            if (result !== undefined && result.result === true)
            {
              
              this.setState({status: true, submitting: false});
      
              //remember some user info for the profile data fetching
              //alert(result.username);
      
              //reroute to main with authorization
              this.props.history.push({
                pathname: '/'
              });
            }
            else
            {
              this.setState({submitMessage: "Password incorrect!"});
              this.setState({status: false, submitting: false});
            }
          });
      }
      else
      {
        this.setState({submitting: false, status: false});
        this.setState({submitMessage: "Your account has been disabled!"});
      }
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
            <SubmitButton type='submit' disabled = {this.state.submitting}> Sign in </SubmitButton>
            {this.state.submitting && <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />}
          </div>

          {!this.state.status && <p>{this.state.submitMessage}</p>}

        </form>
      </div>
    );
  }
}
export default withRouter(SignIn);

