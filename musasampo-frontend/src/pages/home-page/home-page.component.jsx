import React from 'react';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { withRouter } from 'react-router-dom';
import './home-page.styles.scss';

import logo from '../../assets/logo.png';




class Mainpage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token2: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { token2 } = this.state;

  }

  callAPI() {
    if (this.props.location.state != undefined) {
      var token2 = this.props.location.state.detail;
      //<p1>{this.callAPI()}</p1>
      return JSON.stringify(token2);
    }
    else {
      return "tyhjä"
    }

  }

  handleChange = event => {
    //const { value, name } = event.target;
    //this.setState({ [name]: value });




  };

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
            <div className='parts'>
              <div className='part-container'>
                <div className='part1'>
                </div>
                <div className='part2'>
                </div>
              </div>
              <div className='part3'>
              </div>
            </div>
          </div>
        </header>
        <p className="Mainpage">{this.state.apiResponse}</p>
      </div>
    );
  }
}



/*const HomePage = () => (
  <div className='homepage'>
    <div className='introduction'>
      <div className='logo-area'>
        <img src={logo} alt="logo" />
      </div>
      <div className='infoText'>
        MUSASAMPO is a website dedicated to all your music needs. We offer a multitude of services for bands and fans alike. Please edit this text.
      </div>
    </div>
    <div className='parts'>
      <div className='part-container'>
        <div className='part1'>
        </div>
        <div className='part2'>
        </div>
      </div>
      <div className='part3'>
      </div>
    </div>
  </div>
);*/

export default withRouter(Mainpage);
