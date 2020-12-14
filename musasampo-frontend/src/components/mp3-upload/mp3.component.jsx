import React , { Component,Fragment, useState } from 'react';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import ReactPlayer from "react-player";
import checkUploadData from '../../services/check-upload-data-service';
import uploadData from '../../services/upload-mp3-service' 
import createFolders from '../../services/create-folders-for-upload-servise'
import './mp3.styles.scss';
import { stringify } from 'querystring';
import getAlbum from '../../services/album/albums-by-albumid-service';
import getband from '../../services/band/get-band-by-bandId-servise';
import postSong from '../../services/songs/post-song-by-albumid-service';

var base64 = require('base-64');

class Mp3_upload extends Component {
  constructor(props) {
    super(props);

    //this.state contains info for creating folders and uploading stuff. Stefan?
    this.state = {
      bandId:"",
      bandName: "",
      albumName: "",
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
    }else{
      this.setState({showing:false});
    }

    console.log("selectedFilename:"+this.state.selectedFileName);

    var split = this.state.selectedFileName.split(/\.(?=[^\.]+$)/);
    console.log(split[0]);

    await this.setState({songName:split[0]});
   
  };

  async componentDidMount()
  {
    var albumId = await this.props.location.state.albumId;
    var albumName = await this.props.location.state.albumName;
    //var bandName = await this.props.location.state.bandName;
    
    //console.log(bandName);
    console.log(albumId);
    console.log(albumName);

    //Fetch album by albumId
    var albumObj = await getAlbum(albumId);
    
    console.log(albumObj.albums[0].bandId);

    //BandId to state:
    await this.setState({bandId:albumObj.albums[0].bandId});

    //fetch bandName by bandId:
    var bandObj = await (await getband(albumObj.albums[0].bandId)).json();
    
    //bandName to state:
    await this.setState({bandName:bandObj[0].bandName});

    

  }


  //Clickhandler:
  onClickHandler = async () => 
  {
    var albumId = await this.props.location.state.albumId;
    var bandName = await this.state.bandName;
    var albumName = await this.props.location.state.albumName;
    
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
            alert(result);

            //band successfully created
            if(result !== undefined && result === 201)
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


