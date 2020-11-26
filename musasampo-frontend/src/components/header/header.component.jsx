import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo2.png';
import Homepage from '../../pages/home-page/home-page.component';
import { withRouter} from 'react-router-dom';
import './header.styles.scss';


class Header extends React.Component 
{
  constructor(props) 
  {
    super(props);

    this.state = {
      token: "asd"
    };
  }

  //route to /guitartune
  Guitartuner = async event => 
  {
    this.props.history.push({
      pathname: '/guitartuner',
      state: { token: "secret" }
    });
    
  }

  render() {
    return (

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
            <Link className='option' onClick={this.Guitartuner}>
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
            <Link className='option' to='/login'>
              SIGN IN
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
