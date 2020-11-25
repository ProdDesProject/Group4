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

class Data extends React.Component 
{
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      data: "",
      token: ""
    };
  }

  //save token need test
  async loadToken()
  {
    return this.state.token;
  }


  async Signin(username2,password2)
  {
    //alert(username2);
    //alert(password2);
    //return "true";
    //alert("Going in!");
    //alert(username2);
    //alert(password2);

    //const { username, password } = this.state;
      
    try
    {
    const requestOptions = 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username:username2,password:password2 })
      }

      //alert(requestOptions.body);

      const response = await fetch('http://localhost:9000/users/checkuser2/',requestOptions)
      const data = await response.json();
      //this.setState({ data: data });
      //alert(data);

      //alert(this.state.data);

      
      //alert("data:"+data);

      if (data == "404")
      {
        alert("404");  
      }
      else
      {

        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + base64.encode(username2 + ":" + password2));

        const response2 = await fetch("http://localhost:9000/login", {method:'POST',headers: headers,})
        const token = await response2.json();
        this.setState({ token: token });
        
        //alert("Data:"+token);

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

