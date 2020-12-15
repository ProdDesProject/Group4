import React from 'react';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import SubmitButton from '../submit-button/submit-button.component';

import { Link } from 'react-router-dom';

import './profile-new-album.styles.scss';

import checkUploadData from '../../services/check-upload-data-service';
import uploadData from '../../services/upload-mp3-service' 
import createFolders from '../../services/create-folders-for-upload-servise'

import createAlbum from '../../services/album/create-albums-service'

var req = <p className="req">*</p>;

/**
 * This should be inside of bands, where We need bandInfo for creating album for it.
 * Ex. User clicks Band->Can add album inside of band.->need info which band is for album 
 * 
 * 
 */

class NewAlbum extends React.Component {
  constructor(props) 
  {
    super(props);

    this.state = 
    {
      status: true,
      submitting: false,
      submittingMessage: '',

      albumName: '',
      postingDate: '',
      albumCover: '',
      albumGenre: '',

      filetype: "png",
      selectedFile: null,
      selectedFileName: "",
    
      showing: false
    };
  }

   //handles submit when clicked button ADD ALBUM:
   handleSubmit = async event => {
    event.preventDefault();

    //reset state
    try
    {
      this.setState(
        {
          status: true,
          submitting: false,
          submittingMessage: '',
    
          albumName: '',
          postingDate: '',
          albumCover: '',
          albumGenre: '',

          filetype: "png",
          selectedFile: null,
          selectedFileName: "",
    
          showing: false
        }
      )
      this.handleUpload = this.handleUpload.bind(this);
    }
    catch(error)
    {
      console.log(error);
    }
  }

  //Handles changes when user input is coming:
  handleChange = event => 
  {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    
  };

  handleUpload = event =>
  {
      //save file
      this.setState({ selectedFile: event.target.files[0],
        loaded: 0,
        });
      //save filename
      this.setState({ selectedFileName: event.target.files[0].name,
        loaded: 0,
        });
  
      if(this.state.selectedFile != null)
      {
        this.setState({showing:true});
      }
      else
      {
        this.setState({showing:false});
      }
  }

  onClickHandler = async event => 
  {
    event.preventDefault();

    //bandId from props
    var bandId = this.props.location.state.detail;
    var bandName = this.props.location.state.bandName;

    const {postingDate, albumCover, albumGenre} = this.state;

    const albumName = this.state.albumName;

     //checkResult for file name and datatype:
     var checkResult = await checkUploadData(this.state.selectedFileName);

     //if 200:
     if (checkResult === "200")
     {
        //append testFile and uploadData:
        const data = new FormData();
        data.append('testFile', this.state.selectedFile);
        
        //Create folders for upload:
        //alert("createFolder");
        var createFoldersresult = await createFolders(bandName, albumName);

        //console.log(createFoldersresult);

        //createFolders.result:
        if (createFoldersresult === 200 && this.state.filetype === "png")
        {
          //Upload MP3-Data:
          var fileInfo = "png-album";
  
          if (fileInfo === "png-album")
          {
            await uploadData(data,bandName,albumName,fileInfo)
            .then(result =>
              {
                //console.log(result);
                if(result.status === 204)
                {
                  alert("Upload successful")
                }
                else
                {
                  alert("Upload failed");
                }
              });
          }
          
       }
       else
       {
          alert("Upload failed");
       }
     }
    else
    {
        alert("Filename cannot have any special characters!");
    }

    if (!albumName || !postingDate || !this.state.selectedFileName || !albumGenre) 
    {
        this.setState({status: false, submittingMessage: "Neccessary fields not filled!"});
        return;
    }
    else if(postingDate.match(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/) === null)
    {
        this.setState({status: false, submittingMessage: "Date format invalid!"});
        return;
    }
    else
    {
      //album registration procedure
      //submitting data
      this.setState({submitting: true});

      await createAlbum(bandId, albumName, postingDate, this.state.selectedFileName, albumGenre)
      .then(status =>
        {
          //album successfully created
          if(status !== undefined && status === 201)
          {
            //change submission status
            this.setState({submitting: false, status: true});
            //redirect to profile page to show the album
            this.props.history.push(
              {
                pathname: '/profile',
                
              }
            );
          }
          else
          {
            alert(status);
            this.setState({submitting: false, status: false, submittingMessage: 'Band does not exist!'});
          }
        })
    }
  }
 
  render() 
  {
    const { albumName, postingDate, albumCover, albumGenre} = this.state;
    return (
      <div className='container'>
          <div className='new-album'>
            <h2 className='title'>Add a new album</h2>
            <span className='subtitle'>Fill in information for an album from your band</span>
            <br></br><br></br>
            <form className='new-album-form' onSubmit={this.handleSubmit}>
              <div className='sides'>
                  <div className='left-side'>
                         
                      <label for="albumName">Album Name: {req}</label>
                      <FormInput
                        type='text'
                        name='albumName'
                        id='albumName'
                        value={albumName}
                        onChange={this.handleChange}
                        maxLength='30'
                        required
                        />
                      <label for="postingDate">Release Date (dd/mm/yyyy): {req}</label>
                      <FormInput
                        type='text'
                        name='postingDate'
                        id='postingDate'
                        value={postingDate}
                        onChange={this.handleChange}
                        maxLength='10'
                      />
                </div>

                <div className='right-side'>
                    <label for="albumCover">Album Cover: {req}</label>

                      <div className="Main">
                        <header className="btn btn-secondary btn-sm">
                          <div>
                            <form enctype="multipart/form-data">
                              <input type = "file"  name="file" id="file" accept = ".png" onChange = {this.handleUpload}></input>
                                  {this.state.selectedFile
                                      ? <input type = "button"  value = "Click to upload!" name = "button" onClick = {this.onClickHandler} className="btn btn-primary btn-sm"/>
                                      : null
                                  }

                            </form>
                          </div>
                        </header>
                      </div>

                    <label for="albumGenre">Genre: {req}</label>
                    <FormInput
                      type='text'
                      name='albumGenre'
                      id='albumGenre'
                      value={albumGenre}
                      onChange={this.handleChange}
                      maxLength='30'
                      required
                    />
                   
                    <div className='buttons'>
                      <Link to = "/profile" className='button'>
                        <CustomButton> Cancel </CustomButton>
                      </Link>
                      <SubmitButton type='submit' onClick = {this.onClickHandler} disable = {this.state.submitting}> Add Album </SubmitButton>
                      {this.state.submitting && <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />}
                    </div>
                    {!this.state.status && <h3>{this.state.submittingMessage}</h3>}
                  </div>
                </div>
            </form>
            
          </div>
        </div>
    );
  }
}

export default NewAlbum;