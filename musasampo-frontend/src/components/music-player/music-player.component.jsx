import React , { Component,Fragment, useState } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import ReactPlayer from "react-player";
import checkUploadData from '../../services/check-upload-data-service';
import uploadData from '../../services/upload-mp3-service' 
import createFolders from '../../services/create-folders-for-upload-servise'
import './music-player.styles.scss';
import { stringify } from 'querystring';

var base64 = require('base-64');

class Music_player extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
      <div className="btn btn-secondary btn-sm">
      <header className="">
        < div >
        <audio controls>
        <source src={'http://localhost:9000/upload/mp3path.mp3/Hiipparit/Hiirialbum/Hurt.mp3'} type="audio/mpeg"/>
        Your browser does not support the audio element.
        </audio>
        </div>

      </header>
      </div>
    );
  }
}

export default Music_player;


