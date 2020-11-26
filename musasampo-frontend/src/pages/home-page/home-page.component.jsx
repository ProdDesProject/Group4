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

class Mainpage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token2: "asd"
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    //const { token2 } = this.state;
    //alert(this.props.location.state);
  }


  //
  childFunction=(e)=>{
    e.preventDefault();
    this.props.functionCallFromParent("Hello From Child1");
}



  //check if token is ready to use
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
  
  async componentDidMount() {
    
    //get token from data
    var token = await Data.loadToken();
    alert(stringify(token));

    //var result = await this.callAPI();
    //alert(result);

    //alert(stringify(this.props.location.state.token) );

    //this.handleChange();
    //alert(stringify(this.props.location.state.token));
    //this.childFunction()
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
        <p1>{this.callAPI()}</p1>
      </div>

      

      
    );
  }
}

export default withRouter(Mainpage);
//export default Mainpage;
