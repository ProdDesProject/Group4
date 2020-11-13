import React from 'react';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { withRouter} from 'react-router-dom';
import './homepage.styles.scss';

class Mainpage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token2 : ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const {token2} = this.state;
  
  }

  callAPI() 
  {
    if (this.props.location.state != undefined)
    {
      var token2 = this.props.location.state.detail;
    return JSON.stringify(token2);
    }
    else{
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

      <p1>{this.callAPI()}</p1>

      <button onClick={() => this.props.history.push('/login') }>Sign in</button>

      <button onClick={() => this.props.history.push('/Shop') }>Shop</button>


      </header>
      <p className="Mainpage">{this.state.apiResponse}</p>
      </div>
    );
  }
}

export default withRouter(Mainpage);
