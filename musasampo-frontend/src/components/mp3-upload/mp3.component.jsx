import React , { Component} from 'react';
import checkUploadData from '../../services/check-upload-data-service';
import uploadData from '../../services/upload-mp3-service' 
import createFolders from '../../services/create-folders-for-upload-servise'
import './mp3.styles.scss';

class Mp3_upload extends Component {
  constructor(props) {
    super(props);

    //this.state contains info for creating folders and uploading stuff. Stefan?
    this.state = {
      bandName: "Hiipparit",
      albumName: "Hiirialbum",
      filetype: "mp3",
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
    var checkResult = await checkUploadData(this.state.selectedFileName);

    //if 200:
    if (checkResult === "200")
    {
      //append testFile and uploadData:
      const data = new FormData();
      data.append('testFile', this.state.selectedFile);
      
      //Create folders for upload:
      var createFoldersresult = await createFolders(this.state.bandName,this.state.albumName);

      //createFolders.result:
      if (createFoldersresult === "200" && this.state.filetype === "mp3")
      {
        //Upload MP3-Data:
        var fileInfo = "mp3-upload";
        var result = await uploadData(data,this.state.bandName,this.state.albumName,fileInfo);
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
          <input type = "file"  name="file" id="file" accept = ".mp3" onChange={this.handleChange} />
          <input type = "button" value = "Click to upload!" name = "button" onClick = {this.onClickHandler} className="btn btn-primary btn-sm"/>
        </form>
        </div>
      </header>
      </div>
      

    

    

    );
  }
}

export default Mp3_upload;


