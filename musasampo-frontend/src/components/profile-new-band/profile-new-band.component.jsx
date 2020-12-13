import React, { useState } from 'react';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import SubmitButton from '../../components/submit-button/submit-button.component';
import { Link } from 'react-router-dom';

import BandPic from '../band-pic-upload/band-pic.component'

import './profile-new-band.styles.scss';
import createBand from '../../services/band/create-band-service'
import Switch from '../switch/switch.component';

var req = <p className="req">*</p>;

class NewBand extends React.Component 
{
  constructor() {
    super();

    //local state variables
    this.state = 
    {
      status: true,
      submitting: false,
      submittingMessage: '',

      bandName: '',
      country: '',
      bandLogo: '',
      nsfw: false
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  //handles submit when clicked button ADD BAND:
  handleSubmit = async event => 
  {
    event.preventDefault();

    //reset state
    try
    {
      this.setState(
        {
          bandName: '',
          country: '',
          bandLogo: '',
          nsfw: false
        }
      )
    }
    catch(error)
    {
      console.log(error);
    }

  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  
  };

  //switch toggle
  handleToggle(checked)
  {
    this.setState({nsfw: checked});
    console.log(this.state.nsfw);
  }

  onClickHandler = async event => 
  {
    event.preventDefault();

    const { bandName, country, bandLogo, nsfw } = this.state;
    
    if (!bandName || !country || !bandLogo || nsfw === null) 
    {
      //alert("Neccessary fields not filled!");
      this.setState({status: false, submittingMessage: "Neccessary fields not filled!"});
      return;
    }
    else
    {
      //band registration procedure
      //submitting data
      this.setState({submitting: true});

      await createBand(bandName, country, bandLogo, nsfw)
      .then(status =>
        {
          //band successfully created
          if(status !== undefined && status === 201)
          {
            //change submission status
            this.setState({submitting: false, status: true});
            //redirect to profile page to show the band
            this.props.history.push(
              {
                pathname: '/profile'
              }
            );
          }
          else
          {
            this.setState({submitting: false, status: false});
          }
        })
      
    }
  }

  //Render:
  render() 
  {
    var value = false
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
                  name='bandLogo'
                  id='bandLogo'
                  value={bandLogo}
                  onChange={this.handleChange}
                  placeholder=''
                  required
                />
                <form>
                  <p>NSFW: {req}</p>
                  <Switch
                      value="None"
                      id="switch"
                      name="check"
                      checked = {this.state.nsfw}
                      onChange = {this.handleToggle}
                  />
                
                </form>
                <div className='buttons'>
                  <Link to="/profile" className='button'>
                    <CustomButton> Cancel </CustomButton>
                  </Link>
                  <SubmitButton type='submit' onClick={this.onClickHandler} disabled = {this.state.submitting}> Add Band </SubmitButton>
                  {this.state.submitting && <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />}
                </div>
                {!this.state.status && <h3>{this.state.submittingMessage}</h3>}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default NewBand;