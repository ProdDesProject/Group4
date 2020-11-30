import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo2.png';
import Homepage from '../../pages/home-page/home-page.component';
import { withRouter} from 'react-router-dom';
import './header.styles.scss';

import Data from '../../components/data/data.jsx';
import { stringify } from 'querystring';

class Header extends React.Component 
{
  constructor(props) 
  {
    super(props);

    this.state = {
      login: false,
      SignInOutText: "SIGN IN"
    };
  }

  //function that checks for the token and grants access to the path
  async loginCheck(pathName)
  {
    //login not true
    if(this.state.login !== true)
    {
        //push to the login page
        this.props.history.push({
          pathname: '/login',
        });
    }
    else //login true
    {
         //push to the guitarpage
        this.props.history.push({
          pathname: pathName,
        });
    }
  }

  //route to /guitartuner
  Guitartuner = async event => 
  {
    this.loginCheck('/guitartuner');
  };

  //route to /chat --needs the chat page
  Chat = async event =>
  {
    this.loginCheck('/chat');
  }

  //route to /shop page
  Shop = async event =>
  {
    this.loginCheck('/shop');
  }

  //change header if user is logged in or not
  LoginLogout = async event =>
  {
      var logged = this.state.SignInOutText;
      
      //user is logged out, reroute to login page
      if(logged === "SIGN IN")
      {
        this.props.history.push({
          pathname: '/login',
        });
      }
      else //user is logged in, destroy token, set state to SIGN IN and reroute to main page
      { 
        //set states
        this.setState({login: false, SignInOutText: "SIGN IN"});
        
        //erase token
        this.props.history.push({token: ''});

        //reroute to main page
        this.props.history.push({
          pathname: '/',
        });
      }
  }

  //Checks updates on props and states
  componentDidUpdate (prevProps, prevState) 
  {
    //prevProps contains props, prevState contains local states
    var login1 = prevProps.history.location.login;
    var login2 = prevState.login;
    
    //token can access like this:
    var token = prevProps.history.location.token;
  
    //if props is changed and props and states are differents, stuff happens
    if (login1 !== undefined && login1 !== login2)
    {
      //if login is true can change proceed
      if(login1 === true)
      {
        //local states changes now:
        this.setState({SignInOutText: "SIGN OUT"});
        this.setState({login: true});
      }
    }
      
  }

  //render render stuff
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

            <Link className='option' onClick={this.Guitartuner}>
              GUITAR TUNER
            </Link>

            <Link className='option' onClick={this.Chat}>
              CHAT
            </Link>

            <div className='option'>
              |
              </div>

            <Link className='option' onClick={this.Shop}>
              SHOP
            </Link>

            <Link className='option' onClick={this.myBand}>
              MY BANDS
            </Link>

            <Link className='option' onClick = {this.LoginLogout}>{this.state.SignInOutText}</Link>
            </div>

          </div>
        
      );
    }
  }
export default withRouter(Header);