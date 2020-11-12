import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { withRouter} from 'react-router-dom';


import './sign-in.styles.scss';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  

  handleSubmit = async event => {
    event.preventDefault();

    const { username, password } = this.state;

    

    

    try {

      //Kilpikalevi25
      //testerpassword

      //const userslist = [];

      /*app.post(
        '/login',
        passport.authenticate('basic', { session: false }),
        (req, res) => 
        {
          const token = login(req);
          //add the token to the userToken field
          db.query("UPDATE users SET usersToken = ? WHERE userId = ?", [token, req.user.userId]);
          //return token and ok status
          return res.status(200).json({ token });
      })*/

      //TOIMII
      /*
      const response = await fetch('http://localhost:9000/users/checkuser/Kilpikalevi25')
      const data = await response.json();
      this.setState({ data: data });

      alert(data.user[0].username);
      */

      

      //params
      /*
      const response = await fetch('http://localhost:9000/users/checkuser/'+ username)
      const data = await response.json();
      this.setState({ data: data });

      if (data.user[0].username != undefined)
      {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username:username,password:password })
      };

        const response = await fetch('http://localhost:9000/login', requestOptions)
        const data = await response.json();
        this.setState({ data: data.token });
      }*/
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username:username,password:password })
        };

      const response = await fetch('http://localhost:9000/users/checkuser2/',requestOptions)
      const data = await response.json();
      this.setState({ data: data });

      if (data == "404")
      {
        alert("404");  
      }
      else
      {
        alert(data.user[0].username);
        //---->MAINPAGE
        this.props.history.push('/');

      }

      /*if (data.user[0].username != undefined)
      {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username:username,password:password })
      };

        const response = await fetch('http://localhost:9000/login', requestOptions)
        const data = await response.json();
        this.setState({ data: data.token });
      }*/
      
      

      /*.then(res => res.json())
          //.then(data => this.setState({ postId: data.id }));
          .then(data => userslist.push(data));*/
      //alert(userslist[0].user[0].username);
      /*await fetch('http://localhost:9000/users')
      .then(res => res.json())
      .then(data => userslist.push(data));
      //.then(json => json.map(user => user.username));
      //alert(userslist[0].user[0].username);
      alert(userslist);*/

      const userslist = [];

      //testing only, need new method for usernames only to check if there is existing user for login.

      await fetch('http://localhost:9000/users/')
      .then(res => res.json())
      .then(data => userslist.push(data));
      

      //alert(userslist.user[0].username);
     alert(userslist[0].user[0].username);

    
      this.setState({ username: '', password: '' });
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your username and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='username'
            type='text'
            handleChange={this.handleChange}
            value={this.state.username}
            label='Username'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={this.state.password}
            handleChange={this.handleChange}
            label='Password'
            required
          />
          <div className='buttons'>
            <CustomButton type='submit'> Sign in </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignIn);
