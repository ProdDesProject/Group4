import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo2.png';
import Homepage from '../../pages/home-page/home-page.component';
import { withRouter} from 'react-router-dom';
import './header.styles.scss';

import {SignInServices} from '../../services/sign-in-service';
import { stringify } from 'querystring';

class Header extends React.Component 
{
  constructor(props) 
  {
    super(props);

    if(SignInServices.currentTokenValue !== null)
    {
      this.state = 
      {
        login: true,
        SignInOutText: "SIGN OUT"
      };
    }
    else
    {
      this.state = 
      {
        login: false,
        SignInOutText: "SIGN IN"
      };
    }
  }

  //function that checks for the token and grants access to the path
  loginCheck(pathName)
  {
    //login not true, token missing, requires page refresh
    if(!SignInServices.currentTokenValue)
    {
        //push to the login page
        this.props.history.push({
          pathname: '/login',
        });
    }
    else //login state true
    {
         //push to the guitarpage
        this.props.history.push({
          pathname: pathName,
        });
    }
  }

  //route to /guitartuner
  Guitartuner = event => 
  {
    this.loginCheck('/guitartuner');
  };

  //route to /chat --needs the chat page
  Chat = event =>
  {
    this.loginCheck('/chat');
  }

  //route to /shop page
  Shop = event =>
  {
    this.loginCheck('/shop');
  }

  Profile = event =>
  {
    this.loginCheck('/profile');
  }

  //change header if user is logged in or not
  LoginLogout = event =>
  {      
      //user is logged out, reroute to login page
      if(this.state.SignInOutText === "SIGN IN")
      {
        this.props.history.push({
          pathname: '/login',
        });
      }
      else //user is logged in, destroy token, set state to SIGN IN and reroute to main page
      { 
        //set states
        this.setState({login: false, SignInOutText: "SIGN IN"});

        //call the logout function to erase the token from the local storage
        SignInServices.Signout();

        //reroute to sign in page
        this.props.history.push({
          pathname: '/login',
        });
      }
  }

  //Checks updates on props and states
  componentDidUpdate () 
  {
    //if user logged in then change the header 
    //(this.state.login is the previous status and if we have token it means that the header needs a change)
    if(SignInServices.currentTokenValue !== null && !this.state.login)
    {
      this.setState({login: true, SignInOutText: 'SIGN OUT'});
    }
  }

  //render render stuff

  //SHOP:
  /* {this.state.login &&<Link className='option' onClick={this.Shop}>
              SHOP
            </Link>}*/
  render() 
  {
    return (

        <div className='header'>

          <Link className='logo-area' to='/'>
            <img src={logo} alt="logo" />
          </Link>

          <Link className='title' to = '/'>
            MUSASAMPO
            </Link>

          <div className='options'>
            <Link className='option' to='/search'>
              SEARCH
            </Link>

            {this.state.login && <Link className='option' onClick={this.Guitartuner}>
              GUITAR TUNER
            </Link>}

            {this.state.login &&<Link className='option' onClick={this.Chat}>
              CHAT
            </Link>}

            <div className='option'>
              |
            </div>

            {this.state.login && <Link className='option' onClick={this.Profile}>
              PROFILE
            </Link>}

            <Link className='option' onClick = {this.LoginLogout}>{this.state.SignInOutText}</Link>
            </div>

          </div>

      );
    }
  }
export default withRouter(Header);