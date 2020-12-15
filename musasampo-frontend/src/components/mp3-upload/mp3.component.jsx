import React , { Component,Fragment, useState } from 'react';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import ReactPlayer from "react-player";
import checkUploadData from '../../services/check-upload-data-service';
import uploadData from '../../services/upload-mp3-service' 
import createFolders from '../../services/create-folders-for-upload-servise'
import './mp3.styles.scss';
import { stringify } from 'querystring';
import getband from '../../services/band/get-band-by-bandId-servise';
import postSong from '../../services/songs/post-song-by-albumid-service';

var base64 = require('base-64');

class Mp3_upload extends Component {
  constructor(props) {
    super(props);

    //this.state contains info for creating folders and uploading stuff. Stefan?
    this.state = {
      bandName: "",
      album: {},

      filetype: "mp3",
      selectedFile: null,
      selectedFileName: "",
      songName:"",

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
      this.setState({showing:true});
    }
    else
    {
      this.setState({showing:false});
    }

    var split = this.state.selectedFileName.split(/\.(?=[^\.]+$)/);

    this.setState({songName:split[0]});
   
  };

  async componentDidMount()
  {
    const album = this.props.location.state;

    this.setState({album: album});

    //fetch bandName by bandId:
    const result = await getband(album.bandId);
   
    if(result.status === 200)
    {
      const band = await result.json();
      console.log(band);
      this.setState({bandName: band[0].bandName});
    }   
  }


  //Clickhandler:
  onClickHandler = async () => 
  {
    var albumId = await this.state.album.albumId;
    var bandName = await this.state.bandName;
    var albumName = await this.state.album.albumName;
    
    console.log("Clikced:");
    console.log("albumId:"+albumId);
    console.log("bandName:"+bandName);
    console.log("albumName:"+albumName);

    console.log("selectedFilename:"+this.state.selectedFileName);

    //Post song-object for db:
    var obj = {
      songName: this.state.songName,
      MP3: this.state.selectedFileName,
      MP4: this.state.selectedFileName
    };

    console.log("Song-obj:"+obj);

    //post-method:
    var result = await postSong(albumId,obj);
    console.log("postSong:"+result);

    //checkResult for file name and datatype:
    var checkResult = await checkUploadData(this.state.selectedFileName);

    //if 200:
    if (checkResult == "200")
    {
      //append testFile and uploadData:
      const data = new FormData();
      data.append('testFile', this.state.selectedFile);
      
      //Create folders for upload:
      var createFoldersresult = await createFolders(bandName,albumName);

      //createFolders.result:
      if (createFoldersresult == "200" && this.state.filetype == "mp3")
      {
        //Upload MP3-Data:
        var fileInfo = "mp3-upload";
        var result = await uploadData(data,bandName,albumName,fileInfo)
        .then(result =>
          {
            console.log(result);
            //mp3 successfully uploaded
            if(result !== undefined && result.status === 204)
            {
              console.log("Uploaded!");
              //redirect to profile page to show the band
              this.props.history.push(
                {
                  pathname: '/profile'
                }
              );
            }
            else
            {
              alert("upload went wrong!");
            }
          });

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
    const { showing } = this.state;
    return (
      <div className="Main">
      <header className="btn btn-secondary btn-sm">
        < div >
        <form enctype="multipart/form-data">
          <input type = "file"  name="file" id="file" accept = ".mp3" onChange={this.handleChange}></input>
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

export default Mp3_upload;


