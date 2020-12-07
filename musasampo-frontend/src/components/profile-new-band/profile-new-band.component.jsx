import React from 'react';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import SubmitButton from '../../components/submit-button/submit-button.component';
import Switch from '../../components/switch/switch.component';
import { stringify } from 'querystring';
import { Link } from 'react-router-dom';

import './profile-new-band.styles.scss';

var req = <p className="req">*</p>;

class NewBand extends React.Component {
  constructor() {
    super();

    this.state = {
      bandName: "",
      country: "",
      bandLogo: "",
      Nsfw: "",

      chkbox: false
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { username, email, name, phoneNumber, password, confirmPassword, formedIn } = this.state;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    if (!username || !email || !name) {
      alert("Neccessary fields not filled!");
      return;
    }
    try {

      // SIGN UP CODE GOES HERE

      this.setState({
        username: '',
        email: '',
        name: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        formedIn: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = event => {
    const { bandName, country, bandLogo, nsfw } = event.target;

    if (nsfw == true) {
      this.setState({ bandName: bandName, country: country, bandLogo: bandLogo, nsfw: false });
    } else {
      this.setState({ bandName: bandName, country: country, bandLogo: bandLogo, nsfw: true });
    }

  };

  onClickHandler = () => {
    const { bandName, country, bandLogo, nsfw } = this.state;
    //upload stuff to create a band.

  }

  render() {
    const { bandName, country, bandLogo, nsfw } = this.state;
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
                <label for="Band logo">Band Logo: {req}</label>
                <FormInput
                  type='text'
                  name='bandlogo'
                  id='Bandlogo'
                  value={bandLogo}
                  onChange={this.handleChange}
                  placeholder='Upload a picture for the band logo'
                  required
                />
                <form>
                  <p>NSFW: {req}</p>
                  <Switch
                    value="None"
                    id="switch"
                    name="check"
                  />
                </form>
                <div className='buttons5'>
                  <Link to="/profile" className='button'>
                    <CustomButton> Cancel </CustomButton>
                  </Link>
                  <SubmitButton type='submit' onClick={this.onClickHandler}> Add Band </SubmitButton>
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