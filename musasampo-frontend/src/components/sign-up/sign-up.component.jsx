import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { withRouter} from 'react-router-dom';

import {Signup} from '../../services/sign-up-service';

import './sign-up.styles.scss';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = 
    {
      status: true,
      submitting: false,
      submittingMessage: '',
      username: '',
      email: '',
      name: '',
      phoneNumber: '',
      password: '',
      confirmPassword: ''
    };
  }

  //I don't know if it's used but I don't think so (overwritten by onClickHandler)
  handleSubmit = async event => {
    event.preventDefault();

    const { username, email,name, phoneNumber, password, confirmPassword } = this.state;

    if (password !== confirmPassword) 
    {
      //alert("Passwords don't match");
      this.setState({status: false, submittingMessage: "Passwords don't match!"});
      return;
    }
    if(!username || !email || !name)
    {
      //alert("Neccessary fields not filled!");
      this.setState({status: false, submittingMessage: "Neccessary fields not filled!"});
      return;
    }
    try 
    {
      // SIGN UP CODE GOES HERE
      this.setState({
        username: '',
        email: '',
        name: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
      });
    } 
    catch (error) 
    {
      console.error(error);
    }
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  onClickHandler = async event=>
  {
    event.preventDefault();

    const { username, email,name, phoneNumber, password, confirmPassword } = this.state;

    //required fields not filled
    if(!username || !email || !name)
    {
      this.setState({
        status: false, 
        submittingMessage: "Neccessary fields not filled!",
        username: '',
        email: '',
        name: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
      });
    }
    //password check
    else if (password !== confirmPassword) 
    {
      this.setState({
        status: false, 
        submittingMessage: "Passwords don't match!",
        username: '',
        email: '',
        name: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
      });
    }
    else
    {
      //sign up procedure
      //submitting data
      this.setState({submitting: true});

      await Signup(this.state.username,this.state.email,this.state.name,this.state.phoneNumber,this.state.password)
      .then(result =>
        {
          //alert(result);
          
          if (result !== undefined && result.result === true)
          {
            this.setState({status: true, submitting: false});
            this.props.history.push({
              pathname: '/',
            });
          }
          else
          {
            this.setState({status: false, submitting: false});
            //alert("something went wrong!");
          }
        })
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
              <CustomButton type='submit' onClick = {this.onClickHandler} disabled = {this.state.submitting}> Sign up </CustomButton>
              {this.state.submitting && <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />}
          </div>

          {!this.state.status && <p>{this.state.submittingMessage}</p>}

        </form>
      </div>
    );
  }
}

export default withRouter(SignUp);
