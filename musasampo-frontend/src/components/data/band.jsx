import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { withRouter} from 'react-router-dom';
import { stringify } from 'querystring';
import ReactPlayer from "react-player";
import Signin2 from '../../components/sign-in/sign-in.component.jsx'

var base64 = require('base-64');

var token2 = "";


class Bands extends React.Component 
{
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  async getAllBands()
    {
      const response1 = await fetch('http://localhost:9000/bands/')
      const data1 = await response1.json();
      
      //stringify(data2.songs)
      //alert(data1[0].country);
          
      return data1;
    }

  async getBandPicture(band,picture)
    {
      var band = band;
      var picture = picture;
      
      const response1 = await fetch('http://localhost:9000/upload/imagepath.png/'+ band +'/'+ picture +'.png')
      const data1 = await response1.json();
      
      //stringify(data2.songs)
      //alert(data1[0].country);
          
      return data1;
    }

  


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



}

//Data class object thas is exported to another files
const band = new Bands();
export default band;

