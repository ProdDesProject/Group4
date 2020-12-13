import React from 'react';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import SignInButton from '../../components/sign-in-button/sign-in-button.component';
import Switch from '../../components/switch/switch.component';
import { stringify } from 'querystring';

import './profile-edit.styles.scss';

class EditProfile extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      email: '',
      name: '',
      phoneNumber: ''
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { username, email, name, phoneNumber } = this.state;
    try {

      // SIGN UP CODE GOES HERE

      this.setState({
        username: '',
        email: '',
        name: '',
        phoneNumber: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  onClickHandler = () => {

    async function postmethod(data) {
      var FormData = data;

      const requestOptions =
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(FormData)
      }

      const response = await fetch('http://localhost:9000/users/createuser', requestOptions)
      const data2 = await response.json();

      //useless stuff that doesn't run

      alert(stringify(data2));

      this.setState(data2);

      switch (data2) {
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
    const { username, email, name, phoneNumber } = this.state;
    return (
      <div className='container'>
        <div className='edit'>
          <h2 className='title'>Change account details</h2>
          <form className='sign-up-form' onSubmit={this.handleSubmit}>
            <FormInput
              type='text'
              name='username'
              value={username}
              onChange={this.handleChange}
              label='coolPeter88'
            />
            <FormInput
              type='email'
              name='email'
              value={email}
              onChange={this.handleChange}
              label='peter.peter@mail.com'
            />
            <FormInput
              type='text'
              name='name'
              value={name}
              onChange={this.handleChange}
              label='Peter Peter'
            />
            <FormInput
              type='text'
              name='phoneNumber'
              value={phoneNumber}
              onChange={this.handleChange}
              label='123 90++'
            />
            <form>
              <p>Show NSFW content?</p>
              <Switch
                value="None"
                id="switch"
                name="check"
              />
            </form>
            <div className='buttons1'>
              <CustomButton type='submit' onClick={this.onClickHandler}> Cancel </CustomButton>
              <SignInButton type='submit' onClick={this.onClickHandler}> Save changes </SignInButton>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EditProfile;