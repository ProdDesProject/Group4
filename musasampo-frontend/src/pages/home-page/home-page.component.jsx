import React from 'react';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { withRouter } from 'react-router-dom';
import './home-page.styles.scss';
import { stringify } from 'querystring';
import Header from '../../components/header/header.component';
import Mp3 from '../mp3-upload/mp3.component';
import logo from '../../assets/logo.png';

import Data from '../../components/data/data.jsx';

class Mainpage extends React.Component 
{
  constructor(props) 
  {
    super(props);

  }

  //handle event if needed
  handleSubmit = async event => {
    event.preventDefault();

  }

  componentDidMount()
  {
    //this is how you can access props on different components
    var login1 = this.props.history.location.login;
    var token = this.props.history.location.token;

  }

  render() {
    return (
      <div className="homepage">
        <header className="homepage-header">
          <div className='homepage'>
          <div className='introduction'>
            
            <div className='logo-area'>
            <img src={logo} alt="logo" />
            </div>

            <div className='infoText'>
                MUSASAMPO is a website dedicated to all your music needs. We offer a multitude of services for bands and fans alike. Please edit this text.
            </div>

          </div>
          </div>
        </header>
      </div>
    );
  }
}

export default withRouter(Mainpage);

