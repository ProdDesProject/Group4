import React from 'react';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import SubmitButton from '../../components/submit-button/submit-button.component';
import { stringify } from 'querystring';
import { Link } from 'react-router-dom';

import './profile-new-band.styles.scss';

var req = <p className="req">*</p>;

class NewBand extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      email: '',
      name: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      formedIn: ''
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { username, email,name, phoneNumber, password, confirmPassword, formedIn } = this.state;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    if(!username || !email || !name)
    {
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
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  onClickHandler = () =>
  {

    async function postmethod(data)
    {
      var FormData = data;

      const requestOptions = 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(FormData)
      }
  
      const response =  await fetch('http://localhost:9000/users/createuser',requestOptions)
      const data2 = await response.json();
      
      //useless stuff that doesn't run

      alert(stringify(data2));

      this.setState(data2);

      switch (data2)
      {
          case '404': alert('not found'); break;
          case '400': alert('bad request'); break;
          case '200': alert('done'); break;
          default: alert('something went wrong');
      }
      
    }

    const data = new FormData();
    var object = 
    {
      "username": this.state.username, 
      "password": this.state.password,
      "name": this.state.name, 
      "email": this.state.email, 
      "phoneNumber": this.state.phoneNumber,
      "usersToken": null
    };

    postmethod(object);

    //alert object
    //alert(stringify(object));
  }

  render() {
    const { username, email,name, phoneNumber, password, confirmPassword, formedIn } = this.state;
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
                      name='username'
                      id='bandName'
                      value={username}
                      onChange={this.handleChange}
                      placeholder=""
                      maxLength='30'
                      required
                    />
                    <label for="country">Country of Origin: {req}</label>
                    <FormInput
                      type='email'
                      name='email'
                      id='country'
                      value={email}
                      onChange={this.handleChange}
                      placeholder=""
                      maxLength='30'
                      required
                    />
                </div>



              <div className='right-side'>
                  <label for="AlbumLogo">Band Logo: {req}</label>
                  <FormInput
                    type='text'
                    name='albumLogo'
                    id='AlbumLogo'
                    value={formedIn}
                    onChange={this.handleChange}
                    placeholder='Upload a picture for the album logo'
                    required
                  />
                  <form>
                    <p>NSFW: {req}</p>
                    <div class="switch">	
                        <input type="checkbox" 
                        value="None" 
                        id="switch" 
                        name="check" 
                        onChange={this.handleChange}/>
                        <label for="switch"></label>
                    </div>
                  </form>
                  <div className='buttons'>
                      <Link to = "/profile" className='button'>
                        <CustomButton> Cancel </CustomButton>
                      </Link>
                      <SubmitButton type='submit' onClick = {this.onClickHandler}> Add Band </SubmitButton>
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