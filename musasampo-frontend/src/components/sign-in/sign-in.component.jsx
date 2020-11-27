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

  //push to Mainpage when called with global variable singInOut goes -> home-page
  async goMain(token)
  {
    this.props.history.push({
      pathname: '/',
      signInOut: "SIGN OUT"
    });
  }

  //when clicket sign in button: post-login and returns token if succeeded.
  handleSubmit = async event => 
  {
    var token="";
    event.preventDefault();

    //alert("start");
    var result = await Data.Signin(this.state.username,this.state.password);
    
    //alert("asd!:"+stringify(result.token));

    if (result.result == "true")
    {
      token = result.token;
      //alert(stringify(token));
      this.goMain(token);
    }else
    {
      alert("something went wrong!");
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

const sign = new SignIn();

export default withRouter(SignIn);
//export default sign;
/*export{
  sign
 };*/
