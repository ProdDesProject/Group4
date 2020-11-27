import React , { Fragment, useState } from 'react';

import axios from 'axios';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import ReactPlayer from "react-player";
import SignInButton from '../../components/custom-button/custom-button.component';



import { withRouter} from 'react-router-dom';

import '../../components/custom-button/custom-button.component';

import './profile.styles.scss';

import { saveAs } from 'file-saver';


//const logo = require('./pictures/bandpic1.png');

//import music from '../../music';
//import logo from '../../assets/bandpic1.png';
import { stringify } from 'querystring';

//var fs = require('fs'),
//request = require('request');

var base64 = require('base-64');

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null
    
    };
  }

  /**
   * TOKEN
   */
  callAPI() 
  {
    if (this.props.location.state != undefined)
    {
      var token2 = this.props.location.state.detail;
      //<p1>{this.callAPI()}</p1>
    return JSON.stringify(token2);
    }
    else{
      return "tyhjä"
    }

  }


  handleChange = event => {
    //const {name,value } = event.target;
    this.setState({ selectedFile: event.target.files[0],
    loaded: 0,
    });

    alert(event.target.files[0]);
  };


  onClickHandler = () => 
  {
    //THIS WORKS WITH MP3:

    async function postmethod(data)
    {
      var FormData = data;

      const requestOptions = 
      {
        method: 'POST',
        //headers: { 'Content-Type': '' },
        body: FormData
      }
  
      const response =  await fetch('http://localhost:9000/upload/mp3byfile',requestOptions)
      const data2 = await response;

      //THIS REPLY DOESNT WORK YET
      //alert("Data2:"+stringify(data2));
  
      if (data2 == "404")
        {
          alert("404");  
        }
        else
        {
          alert("done");
        }
      
    }

    const data = new FormData();
    data.append('testFile', this.state.selectedFile);

    postmethod(data);
    
  }

  /**
   * UPDATE ALWAYS WHEN CTRL+R
   * 
   */
  async componentDidMount() 
  {
      //this.fetchMusic();
  }

  /**
   * RENDER
   */

  render() {
    return (
      <div className='profile-item'>
      <div className="App">
        <div className='test'>
        <div className='profileImage'>
          <img className='img' src="http://localhost:9000/upload/imagepath.png/kilpikalevi.PNG" alt="bandpic1"></img>
        </div>
        <div className='titleText'>
          Account details:
        </div>
        <div className='user-info'>
             <div className='descriptor'>
                <dt>Username:</dt>
                <dt>Email:</dt>
                <dt>Name:</dt>
                <dt>Phone number:</dt>
            </div>

            <div className='infotext'>
                <dt>coolPeter88</dt>
                <dt>peter.peter@mail.com</dt>
                <dt>Peter Peter</dt>
                <dt>123 90++</dt>
            </div>
        </div>
        <a href="/profile/edit" className='button'>
            <SignInButton> Edit </SignInButton>
          </a>
    </div>
    <div className='band-stuff'></div>
    </div>
    </div>
    );
  }
}

export default withRouter(Profile);
