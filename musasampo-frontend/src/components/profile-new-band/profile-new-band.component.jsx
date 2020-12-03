import React from 'react';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import SubmitButton from '../../components/submit-button/submit-button.component';
import { stringify } from 'querystring';
import { Link } from 'react-router-dom';

import './profile-new-band.styles.scss';
import band from '../data/band';

var req = <p className="req">*</p>;

class NewBand extends React.Component {
  constructor() {
    super();

    //local state variables
    this.state = {
     bandName: "",
     country: "",
     bandLogo: "",
     nsfw: false,
    };
  }

  //handles submit when clicked button ADD BAND:
  handleSubmit = async event => {
    event.preventDefault();

    const { bandName, country, bandLogo, nsfw } = this.state;
    alert("Create a band:");
    alert(bandName);
    alert(country);
    alert(bandLogo);
    alert("nsfw:"+nsfw);

    //component connection for creating band:->

     //Back to profile-page:
     this.props.history.push('/profile');

  }

  //handles user input from render: 
  handleChange = event => {
    const { value, name, defaultChecked } = event.target;
    this.setState({ [name]: value });
    
  };

  //if user change checkbox, state update:
  toggleChange = () => {
      this.setState({
        nsfw: !this.state.nsfw,
      });
  };

  //Render:
  render() {
    const {bandName, country, bandLogo, chkbox, nsfw} = this.state;
    return (
      <div className='container'>
        <div className='new-band'>
          <h2 className='title'>Add a new band</h2>
          <span className='subtitle'>Fill in information for your band</span>
          <br></br><br></br>
          <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <div className='sides'>

                <div className='left-side'>
                    <label for="bandName">Band Name: {req}</label>
                    <FormInput
                      type='text'
                      name='bandName'
                      id='bandName'
                      value={bandName}
                      onChange={this.handleChange}
                      placeholder=""
                      maxLength='30'
                      required
                    />
                    <label for="country">Country of Origin: {req}</label>
                    <FormInput
                      type='text'
                      name='country'
                      id='country'
                      value={country}
                      onChange={this.handleChange}
                      placeholder=""
                      maxLength='30'
                      required
                    />
                </div>



              <div className='right-side'>
                  <label for="Bandlogo">Band Logo: {req}</label>
                  <FormInput
                    type='text'
                    name='bandLogo'
                    id='bandLogo'
                    value={bandLogo}
                    onChange={this.handleChange}
                    placeholder=''
                    required
                  />
                  <form>
                    <p>NSFW:{req}</p>
                    <div class="switch">	
                        <input type="checkbox" 
                        name="nsfw" 
                        id="switch"
                        value={nsfw} 
                        defaultChecked={nsfw}
                        checked={nsfw}
                        onChange={this.toggleChange}/>
                        <label for="switch"></label>
                    </div>
                  </form>
                  <div className='buttons'>
                      <Link to = "/profile" className='button'>
                        <CustomButton> Cancel </CustomButton>
                      </Link>
                      <SubmitButton type='submit' > Add Band </SubmitButton>
                  </div>
                </div>
              </div>
          </form>
        </div>
      </div>
    );
  }
}

export default NewBand;