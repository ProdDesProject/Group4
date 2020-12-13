import React from 'react';
import { withRouter } from 'react-router-dom';
import './home-page.styles.scss';
import logo from '../../assets/logo.png';
import HomeNew from '../../components/home-new/home-new.component';
import HomeChat from '../../components/home-chat/home-chat.component';
import HomeGuitarTuner from '../../components/home-guitar-tuner/home-guitar-tuner.component';

class Mainpage extends React.Component {
  constructor(props) {
    super(props);

  }

  //handle event if needed
  handleSubmit = async event => {
    event.preventDefault();

  }

  componentDidMount() {
    //this is how you can access props on different components
    var login1 = this.props.history.location.login;
    var token = this.props.history.location.token;

  }

  render() {
    return (
      <div className="homepage">
        <header className="homepage-header">
          <div className='homepage'>
            <div className='home-content'>
              <div className='logo-row'>
                <div className='logo-area'>
                  <img src={logo} alt="logo" />
                </div>
                <div className='infoText'>
                  MUSASAMPO - Fulfilling all your music needs with a single website
                  <br></br> We offer services for bands and fans alike
            </div>
              </div>
            </div>
            <div className='top-row'>
            <HomeNew />
            </div>
            <div className='bottom-row'>
              <HomeChat />
              <HomeGuitarTuner />
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default withRouter(Mainpage);

