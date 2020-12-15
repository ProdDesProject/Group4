import React from 'react';
import { withRouter } from 'react-router-dom';
import './home-page.styles.scss';
import logo from '../../assets/logo.png';
import HomeChat from '../../components/home-chat/home-chat.component';
import HomeGuitarTuner from '../../components/home-guitar-tuner/home-guitar-tuner.component';

class Mainpage extends React.Component {
  constructor(props) {
    super(props);
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

