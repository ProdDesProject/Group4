import React , { Component,Fragment, useState } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import ReactPlayer from "react-player";
import checkUploadData from '../../services/check-upload-data-service';
import uploadData from '../../services/upload-mp3-service' 
import createFolders from '../../services/create-folders-for-upload-servise'
import './band-pic.styles.scss';
import { stringify } from 'querystring';

var base64 = require('base-64');

class BandPic extends Component {
  constructor(props) {
    super(props);

    //this.state contains info for creating folders and uploading stuff. Stefan?
    this.state = {
      bandName: "",
      albumName: "",
      filetype: "png",
      selectedFile: null,
      selectedFileName: "",

      showing: false
    };
  }

  //Handles changes on upload realtime:
  handleChange = async event => 
  {
    //save file
    await this.setState({ selectedFile: event.target.files[0],
    loaded: 0,
    });
    //save filename
    await this.setState({ selectedFileName: event.target.files[0].name,
      loaded: 0,
      });

    if (this.state.selectedFile != null)
    {
      await this.setState({showing:true});
      console.log(this.state.selectedFileName);
    }
    else
    {
      await this.setState({showing:false});
    }

  };

  //Clickhandler:
  onClickHandler = async () => 
  {
    console.log(this.state.selectedFileName);
    try
    {
      var bandName = await this.props.location.state.bandname;
      var bandLogo = await this.props.location.state.bandlogo;
  
      console.log("bandName:"+bandName);
      console.log("bandLogo"+bandLogo);
  
  
      await this.setState({bandName:bandName});
      await this.setState({bandLogo:bandLogo});
    }
    catch
    {
      alert("something went Wrong");
    }
    

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

      //createFolders.result:
      if (createFoldersresult == "200" && this.state.filetype == "png")
      {
        //Upload MP3-Data:
        var fileInfo = "png-band";

        if (fileInfo === "png-band")
        {
          await uploadData(data,this.state.bandName,"",fileInfo)
          .then(result =>
            {
              if(result.status === 204)
              {
                this.props.history.push({
                  pathname: '/profile'
                });
              }
              else
              {
                alert("Upload failed");
              }
            });
        }
        
      }else
      {
        alert("Upload failed");
      }
    }else
    {
      alert("CheckResults went wrong, try again!");
    }

  }
  
/**
 * Upload-
 * Button:
 * 
 * <input type = "button"  value = "Click to upload!" name = "button" onClick = {this.onClickHandler} className="btn btn-primary btn-sm"/>
 */

  render() {
    const { showing } = this.state;
    return (
      <div className="Main">
      <header className="btn btn-secondary btn-sm">
        < div >
        <form enctype="multipart/form-data">
          <input type = "file"  name="file" id="file" accept = ".png" onChange = {this.handleChange}></input>
          { showing 
                    ? <input type = "button"  value = "Click to upload!" name = "button" onClick = {this.onClickHandler} className="btn btn-primary btn-sm"/>
                    : null
                }

        </form>
        </div>
      </header>

      
      </div>
    );
  }
}

export default BandPic;


