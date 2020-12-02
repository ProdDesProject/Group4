import React , { Component,Fragment, useState } from 'react';

import axios from 'axios';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import ReactPlayer from "react-player";

import HomePage from '../home-page/home-page.component';

import checkUploadData from '../../services/check-upload-data-service';
import uploadData from '../../services/upload-mp3-jpg-service' 
import createFolders from '../../services/create-folders-for-upload-servise'

import { withRouter} from 'react-router-dom';
import './mp3.styles.scss';
import { saveAs } from 'file-saver';
import logo from '../../assets/bandpic1.png';
import { stringify } from 'querystring';

var fs = require('fs'),
request = require('request');

var base64 = require('base-64');

class Mp3_upload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bandName: "Hiipparit",
      albumName: "Hiirialbum",
      selectedFile: null,
      selectedFileName: ""
    };
  }

  //Handles changes on upload realtime:
  handleChange = event => {
    
    //save file
    this.setState({ selectedFile: event.target.files[0],
    loaded: 0,
    });
    //save filename
    this.setState({ selectedFileName: event.target.files[0].name,
      loaded: 0,
      });

    //alert(event.target.files[0]);
    //alert(event.target.files[0].name);
  };


  //Clickhandler:
  onClickHandler = async () => 
  {

    /*async function postmethod(data)
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
      
    }*/

    //checkResult can be 200 or 400
    var checkResult = await checkUploadData(this.state.selectedFileName);

    alert("checkResult:"+checkResult);

    if (checkResult == "200")
    {
      const data = new FormData();
      data.append('testFile', this.state.selectedFile);
      //postmethod(data);
      alert("toimii");

      //need these here!:
      var bandName,albumName;

      //now local state variables: need to get them from token
      createFolders(this.state.bandName,this.state.albumName);
      //uploadData(data,bandName,albumName);
    }else
    {
      alert("CheckResults went wrong, try again");
    }
   
    
  }

  /**
   * RENDER
   * 
   *      
    </div >
       
        <img src="http://localhost:9000/upload/imagepath.png/bandpic1.png" alt="bandpic1" width="200" height="200"></img>
        <div>

        <div>
          <ReactPlayer
            url="http://localhost:9000/upload/mp3path.mp3/Hurt.mp3"
            width="400px"
            height="50px"
            playing={false}
            controls={true}
          />
        </div>
   */

  render() {
    return (
      <div className="App">
      <header className="App-header">
        < div >
   

        <form enctype="multipart/form-data">
          <input type = "file" name="file" id="file" accept = ".mp3" onChange={this.handleChange}/>
          <input type = "button" value = "Click to upload!" name = "button" onClick = {this.onClickHandler}/>
        </form>

        </div>
      </header>
    </div>

    );
  }
}

//export default withRouter(Mp3_upload);
export default Mp3_upload;
