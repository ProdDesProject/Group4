import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo2.png';
import Homepage from '../../pages/home-page/home-page.component';
import { withRouter} from 'react-router-dom';
import './header.styles.scss';

import Data from '../../components/data/data.jsx';
import { stringify } from 'querystring';

//var token = "";

class Header extends React.Component 
{
  constructor(props) 
  {
    super(props);

    this.state = {
      token: "asd",
      signInOut: "SIGN IN"
    };
  }

  //function that checks for the token and grants access to the path
  async tokenCheck(token, pathName)
  {
    //token not found
    if(!token)
    {
        this.setState({signInOut: "SIGN IN"});
        //push to the login page
        this.props.history.push({
          pathname: '/login',
        });
    }
    else //token found
    {
        this.setState({signInOut: "SIGN OUT"});
         //push to the guitarpage with the token
        this.props.history.push({
          pathname: pathName,
        });
    }
  }
  //function that only checks if token was given
  async tokenGiven()
  {
    var token2 = "Token: empty";

    //fetch for token from data.jsx
    token2 = await Data.loadToken();
    //save it to this.state.variable
    this.setState({ token: token2 });
    //singed out case
    if(!token2)
    {
        this.setState({signInOut : "SIGN IN"});
    }
    else//signed in case
    {
      this.setState({signInOut : "SIGN OUT"});
    }

  }

  //route to /guitartuner
  Guitartuner = async event => 
  {
    var token2 = "Guitartoken: empty";

    //fetch for token from data.jsx
    token2 = await Data.loadToken();
    //save it to this.state.variable
    this.setState({ token: token2 });

    //alert("bands:"+stringify(token2));

    this.tokenCheck(token2, '/guitartuner');
  };

  //route to /chat --needs the chat page
  Chat = async event =>
  {
    var token2 = "Chattoken: empty";

    //fetch for token from data.jsx
    token2 = await Data.loadToken();
    //save it to this.state.variable
    this.setState({ token: token2 });

    //alert("Cat: "+ stringify(token2));

    this.tokenCheck(token2, '/chat');
  }


  //route to /shop page
  Shop = async event =>
  {
    var token2 = "Shoptoken: empty";

    //fetch for token from data.jsx
    token2 = await Data.loadToken();
    //save it to this.state.variable
    this.setState({ token: token2 });

    //alert("Cat: "+ stringify(token2));

    this.tokenCheck(token2, '/shop');
  }

  //change header if user is logged in or not
  LoginLogout = async event =>
  {
      var logged = this.state.signInOut;
      
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
        this.setState({token: "", signInOut: "SIGN IN"});
        //destroy token
        await Data.deleteToken();
        //reroute to main page
        this.props.history.push({
          pathname: '/',
        });
      }
  }

  async componentDidUpdate()
  {
      //this.tokenGiven();
  }

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
            <Link className='option' onClick = {this.LoginLogout}>
                {this.state.signInOut}
                </Link>
            </div>
          </div>
        
      );
    }
  }
export default withRouter(Header);


/*
const Header = () => (
  <div className='header'>
    <Link className='logo-area' to='/'>
      <img src={logo} alt="logo" />
    </Link>
    <Link className='title' to='/'>
      MUSASAMPO
      </Link>
    <div className='options'>
      <Link className='option' to='/search'>
        SEARCH
      </Link>
      <Link className='option' to={goGuitar()}>
        GUITAR TUNER
      </Link>
      <Link className='option' to='/'>
        CHAT
      </Link>
      <div className='option'>
        |
        </div>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='login' to='/login'>
        SIGN IN
          </Link>
    </div>
  </div>
);*/

//export default Header;
