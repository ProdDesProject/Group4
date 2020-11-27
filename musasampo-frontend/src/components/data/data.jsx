import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import './data.scss';

import { withRouter} from 'react-router-dom';
import { stringify } from 'querystring';
import ReactPlayer from "react-player";
import Signin2 from '../../components/sign-in/sign-in.component.jsx'


var base64 = require('base-64');

var token2 = "";


class Data extends React.Component 
{
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      data: "",
    };
  }

  //delete token2 local variable
  async deleteToken()
  {
    token2 = "";
  }

  //load token 
  async loadToken()
  {
    return token2;
  }

  //save token 
  async saveToken(data)
  {
    token2 = data;
  }

  //User Signup in login. Gets variables for creating new user
  async Signup(username,email,name,phoneNumber,password)
  {
    //Postmethod async function that get data as an object and creates new user
    async function postmethod(data)
    {
      var FormData = data;

      //Parameter for postmethod
      const requestOptions = 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(FormData)
      }
  
      //fetch for creating a new user and it sends response back if succeeded or not
      const response =  await fetch('http://localhost:9000/users/createuser',requestOptions)
      const data2 = await response.json();

      switch (data2)
      {
          case '404': alert('not found'); break;
          case '400': alert('bad request'); break;
          case '200': alert('done'); break;
          default: alert('something went wrong');
      }
      
    }

    /**
     * LOADTOKEN() START HERE
     */

    //const data = new FormData();
    var object = 
    {
      "username": username, 
      "password": password,
      "name": name, 
      "email": email, 
      "phoneNumber": phoneNumber,
    };

    postmethod(object);

    var obj = {
      result: "true",
    };
    
    //returns if all goes well to sign-up.component.jsx
    return obj;
  }

  //User Signin in login. gets variables if all good and try login in
  async Signin(username2,password2)
  {
      
    try
    {
      //Parameter for postmethod
      const requestOptions = 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username:username2,password:password2 })
      }

      //fetch for checkuser2 and get a response
      const response = await fetch('http://localhost:9000/users/checkuser2/',requestOptions)
      const data = await response.json();

      if (data == "404")
      {
        alert("404");  
      }
      else
      {
        //if response good, setting headers for login and saves token to variable 
        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + base64.encode(username2 + ":" + password2));

        //fetch for login and response2 is token if all goes well
        const response2 = await fetch("http://localhost:9000/login", {method:'POST',headers: headers,})
        const token = await response2.json();
        
        this.setState({ token: token });
        
        //save token for global variable
        this.saveToken(token);

        //object for result and token to sign-in.component
        var obj = {
          result: "true",
          token: token
        };
        
        return obj;
      }
    
      //this.setState({ username: '', password: '' });

    } catch (error) {
      console.log(error);
      return "false";
     
    }

  };


  async createBand(nsfw, bandName, bandLogo, country)
  {
    async function postmethod(data)
    {
      var FormData = data;
      
      const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(FormData)
      }

      const response = await fetch('http://localhost:9000/bands/createband/:userId',requestOptions)
      const data2 = await response.json();
      switch (data2)
    {
      case '404': alert('not found'); break;
      case '400': alert('bad request'); break;
      case '200': alert('done'); break;
      default: alert('something went wrong'); 
    }
    }

  }



  async createAlbum(albumName, albumLaunchDate, albumPicture, albumGenre)
  {
    async function postmethod(data)
    {
      var FormData = data;
      
      const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(FormData)
      }

      const response = await fetch('http://localhost:9000/albums/:bandId',requestOptions)
      const data2 = await response.json();

      switch (data2)
    {
      case '404': alert('not found'); break;
      case '400': alert('bad request'); break;
      case '200': alert('done'); break;
      default: alert('something went wrong'); 
    }
    }

    
  }


  async createSong(songName, MP3, MP4)
  {
    async function postmethod(data)
    {
      var FormData = data;
      
      const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(FormData)
      }

      const response = await fetch('http://localhost:9000/:albumId/createsong',requestOptions)
      const data2 = await response.json();

      switch (data2)
    {
      case '404': alert('not found'); break;
      case '400': alert('bad request'); break;
      case '200': alert('done'); break;
      default: alert('something went wrong'); 
    }
    }

    
  }


  //Method for Get-method for all songs from backend.
  async getAllSongs() 
  {
    const response2 = await fetch('http://localhost:9000/songs')
    const data2 = await response2.json(); 
    
    //this is furioiting to find right path to inside of object:
    //alert(data2.songs[0].songName);
    return data2;
  }

  //Method for Get-method for all bands from backend.
  async getAllBands()
    {
      //BANDS INFO FROM BACK-END
      const response1 = await fetch('http://localhost:9000/bands/')
      const data1 = await response1.json();
      
      //stringify(data2.songs)
      //alert(data1[0].country);
          
      return data1;
    }

  //method for Allusers from backend
  async getAllUsers()
  {
    const result = await fetch("http://localhost:9000/users/")
    const data = await result.json();

    return data;
  }

}

//Data class object thas is exported to another files
const data = new Data();
export default data;

