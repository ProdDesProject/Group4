import React , { Component,Fragment, useState } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import ReactPlayer from "react-player";
import checkUploadData from '../../services/check-upload-data-service';
import uploadData from '../../services/upload-mp3-service' 
import createFolders from '../../services/create-folders-for-upload-servise'
import './band-pic.styles.scss';
import { stringify } from 'querystring';
import Music_player from '../music-player/music-player.component';

var base64 = require('base-64');

class BandPic extends Component {
  constructor(props) {
    super(props);

    //this.state contains info for creating folders and uploading stuff. Stefan?
    this.state = {
      bandName: "Hiipparit",
      albumName: "Hiirialbum",
      filetype: "png",
      selectedFile: null,
      selectedFileName: ""
    };
  }

  //Handles changes on upload realtime:
  handleChange = event => 
  {
    //save file
    this.setState({ selectedFile: event.target.files[0],
    loaded: 0,
    });
    //save filename
    this.setState({ selectedFileName: event.target.files[0].name,
      loaded: 0,
      });
  };


  //Clickhandler:
  onClickHandler = async () => 
  {
    //checkResult for file name and datatype:
    //alert("checkdata" + this.state.selectedFileName );
    var checkResult = await checkUploadData(this.state.selectedFileName);

    //if 200:
    if (checkResult == "200")
    {
      //append testFile and uploadData:
      const data = new FormData();
      data.append('testFile', this.state.selectedFile);
      
      //Create folders for upload:
      //alert("createFolder");
      var createFoldersresult = await createFolders(this.state.bandName,this.state.albumName);

      //alert("createFoldersresult:"+createFoldersresult);
      //createFolders.result:
      if (createFoldersresult == "200" && this.state.filetype == "png")
      {
        //Upload MP3-Data:
        alert("Upload");
        var fileInfo = "png-band";
        var result = await uploadData(data,this.state.bandName,fileInfo);
      }else
      {
        alert("Upload failed");
      }
    }else
    {
      alert("CheckResults went wrong, try again!");
    }
  }

  render() {
    return (
      <div className="Main">
      <header className="btn btn-secondary btn-sm">
        < div >
        <form enctype="multipart/form-data">
          <input type = "file"  name="file" id="file" accept = ".png" onChange={this.handleChange} />
          <input type = "button" value = "Click to upload!" name = "button" onClick = {this.onClickHandler} className="btn btn-primary btn-sm"/>
        </form>
        </div>
      </header>
      </div>
      

    

    

    );
  }
}

export default BandPic;


