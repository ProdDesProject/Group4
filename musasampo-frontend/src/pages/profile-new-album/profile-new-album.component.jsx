import React from 'react';

import FormInput from '../../components/form-input/form-input.component';
import FormInput2 from '../../components/form-input2/form-input2.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import SignInButton from '../../components/sign-in-button/sign-in-button.component';
import { stringify } from 'querystring';

import './profile-new-album.styles.scss';

var req = <p className="req">*</p>;

class SignUp extends React.Component {
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
      <div className='new-album'>
        <h2 className='title6'>Add a new album</h2>
        <span className='subtitle6'>Fill in information for an album from your band</span>
        <br></br><br></br>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
        <div className='sides'>
            <div className='left-side'>
        <label for="albumName">Album Name: {req}</label>
          <FormInput2
            type='text'
            name='username'
            id='albumName'
            value={username}
            onChange={this.handleChange}
            placeholder=""
            maxLength='30'
            required
          />
          <label for="type">Type: {req}</label>
          <FormInput2
            type='email'
            name='email'
            id='type'
            value={email}
            onChange={this.handleChange}
            placeholder="Full-length, Demo, etc."
            maxLength='30'
            required
          />
          <label for="releaseData">Release Date: {req}</label>
          <FormInput2
            type='text'
            name='name'
            id='releaseDate'
            value={name}
            onChange={this.handleChange}
            placeholder='Format: January 1st 2020'
            maxLength='20'
          />
          <label for="label">Label: {req}</label>
          <FormInput2
            type='text'
            name='lLabel'
            id='label'
            value={formedIn}
            onChange={this.handleChange}
            placeholder=''
            maxLength='30'
            required
          />
          </div>



          <div className='right-side'>
          <form>
          <label for="format">Format: {req}</label>
          <FormInput2
            type='text'
            name='format'
            id='format'
            value={formedIn}
            onChange={this.handleChange}
            placeholder='CD, Vinyl, etc.'
            maxLength='30'
            required
            />
            </form>
          <form>
          <label for="songs">Songs: {req}</label>
            <FormInput2
            type='text'
            name='songs'
            value={formedIn}
            onChange={this.handleChange}
            id='songs'
            maxLength='30'
            required
          />
          </form>
          <label for="lineup">Lineup: {req}</label>
          <FormInput2
            type='text'
            name='lineup'
            id='lineup'
            value={formedIn}
            onChange={this.handleChange}
            placeholder='Format: Peter Smith - Drums, Vocals'
            maxLength='50'
            required
          />
          <label for="description">Description:</label>
          <FormInput2
            type='text'
            name='description'
            id='description'
            value={formedIn}
            onChange={this.handleChange}
            maxLength='1600'
            placeholder='Write a description for the album'
          />
          <div className='buttons6'>
          <CustomButton type='submit' onClick = {this.onClickHandler}> Add Album </CustomButton>
            </div>
            </div>
            </div>
        </form>
        
      </div>
      </div>
    );
  }
}

export default SignUp;