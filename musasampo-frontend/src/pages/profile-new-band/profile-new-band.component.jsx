import React from 'react';

import FormInput from '../../components/form-input/form-input.component';
import FormInput2 from '../../components/form-input2/form-input2.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import SignInButton from '../../components/sign-in-button/sign-in-button.component';
import { stringify } from 'querystring';

import './profile-new-band.styles.scss';

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
      <div className='new-band'>
        <h2 className='title5'>Add a new band</h2>
        <span className='subtitle5'>Fill in information for your band</span>
        <br></br><br></br>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
        <div className='sides'>
            <div className='left-side'>
        <label for="bandName">Band Name: {req}</label>
          <FormInput2
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
          <FormInput2
            type='email'
            name='email'
            id='country'
            value={email}
            onChange={this.handleChange}
            placeholder=""
            maxLength='30'
            required
          />
          {/*<label for="location">Band Location:</label>
          <FormInput2
            type='text'
            name='name'
            id='location'
            value={name}
            onChange={this.handleChange}
            placeholder='London, Texas, etc.'
            maxLength='40'
          />
    */}
          {/*<label for="currentLabel">Current Label: {req}</label>
          <FormInput2
            type='text'
            name='currentLabel'
            id='currentLabel'
            value={formedIn}
            onChange={this.handleChange}
            placeholder=''
            maxLength='30'
            required
          />
*/}
            {/*<form>
            <p>Band Status: {req}</p>
            <input
                type='radio'
                id='Active'
                name='Band Status'
                value="None"
                onChange={this.handleChange}/>
                <label for='Active'>Active</label>
                <br></br>

                <input
                type='radio'
                id='Disbanded'
                name='Band Status'
                value="None" 
                onChange={this.handleChange}/>
                <label for='Disbanded'>Disbanded</label>
                <br></br>
                
                <input
                type='radio'
                id='On Break'
                name='Band Status'
                value="On Break"
                onChange={this.handleChange}/>
                <label for='On Break'>On Break</label>
          </form>
            */}
          </div>



          <div className='right-side'>
          {/*<form>
          <label for="formedIn">Formed in (Year): {req}</label>
          <FormInput2
            type='text'
            name='formedIn'
            id='formedIn'
            value={formedIn}
            onChange={this.handleChange}
            maxLength='4'
            required
            />
            </form>
          */}
          {/*<form>
          <label for="yearsActive">Years active: {req}</label>
            <FormInput2
            type='text'
            name='yearsActive'
            value={formedIn}
            onChange={this.handleChange}
            id='yearsActive'
            maxLength='30'
            required
          />
          </form>
          */}
          {/*<label for="genres">Genres: {req}</label>
          <FormInput2
            type='text'
            name='genres'
            id='genres'
            value={formedIn}
            onChange={this.handleChange}
            placeholder='Metal, Rock, etc.'
            maxLength='30'
            required
          />
        */}
          {/*<label for="lyricalThemes">Lyrical Themes:</label>
          <FormInput2
            type='text'
            name='lyricalThemes'
            id='themes'
            value={formedIn}
            onChange={this.handleChange}
            maxLength='40'
            placeholder='Nature, Love, War, etc.'
          />
    */}
        <label for="AlbumLogo">Band Logo: {req}</label>
          <FormInput2
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
          <div className='buttons5'>
          <CustomButton type='submit' onClick = {this.onClickHandler}> Add Band </CustomButton>
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