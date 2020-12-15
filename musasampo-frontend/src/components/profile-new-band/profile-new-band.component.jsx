import React, { useState } from 'react';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import SubmitButton from '../../components/submit-button/submit-button.component';
import { Link } from 'react-router-dom';

import './profile-new-band.styles.scss';
import createBand from '../../services/band/create-band-service'
import Switch from '../switch/switch.component';

import checkUploadData from '../../services/check-upload-data-service';
import uploadData from '../../services/upload-mp3-service'
import createFolders from '../../services/create-folders-for-upload-servise'

var req = <p className="req">*</p>;

class NewBand extends React.Component {
  constructor() {
    super();

    //local state variables
    this.state =
    {
      status: true,
      submitting: false,
      submittingMessage: '',

      bandName: '',
      country: '',
      nsfw: false,

      filetype: "png",
      selectedFile: null,
      selectedFileName: "",

      showing: false
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  //handles submit when clicked button ADD BAND:
  handleSubmit = async event => {
    event.preventDefault();


    //reset state
    try {
      this.setState(
        {
          bandName: '',
          country: '',
          nsfw: false
        }
      )
    }
    catch (error) {
      console.log(error);
    }

  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  //switch toggle
  handleToggle(checked) {
    this.setState({ nsfw: checked });
  }

  handleUpload = event => {
    //save file
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
    //save filename
    this.setState({
      selectedFileName: event.target.files[0].name,
      loaded: 0,
    });

    if (this.state.selectedFile != null) {
      this.setState({ showing: true });
    }
    else {
      this.setState({ showing: false });
    }
  }

  onClickHandler = async event => {
    event.preventDefault();

    const { bandName, country, nsfw } = this.state;
    //checkResult for file name and datatype:
    var checkResult = await checkUploadData(this.state.selectedFileName);

    //if 200:
    if (checkResult == "200") {
      //append testFile and uploadData:
      const data = new FormData();
      data.append('testFile', this.state.selectedFile);

      //Create folders for upload:
      //alert("createFolder");
      var createFoldersresult = await createFolders(bandName, this.state.albumName);

      //createFolders.result:
      if (createFoldersresult == "200" && this.state.filetype == "png") {
        //Upload MP3-Data:
        var fileInfo = "png-band";

        if (fileInfo === "png-band") {
          await uploadData(data, this.state.bandName, "", fileInfo)
            .then(result => {
              if (result.status === 204) {
                alert("Upload successful")
              }
              else {
                alert("Upload failed");
              }
            });
        }
      } else {
        alert("Upload failed");
      }
    }
    else {
      alert("CheckResults went wrong, try again!");
    }

    //create band
    if (!bandName || !country || !this.state.selectedFileName || nsfw === null) {
      //alert("Neccessary fields not filled!");
      this.setState({ status: false, submittingMessage: "Neccessary fields not filled!" });
      return;
    }
    else {
      //band registration procedure
      //submitting data
      this.setState({ submitting: true });

      await createBand(bandName, country, this.state.selectedFileName, nsfw)
        .then(status => {
          //band successfully created
          if (status !== undefined && status === 201) {
            //change submission status
            this.setState({ submitting: false, status: true });
            //redirect to profile page to show the band
            this.props.history.push(
              {
                pathname: '/profile'
              }
            );
          }
          else {
            this.setState({ submitting: false, status: false });
          }
        })
    }
  }

  //Render:
  render() {
    var value = false
    const { bandName, country, nsfw } = this.state;
    return (
      <div className='container'>
        <div className='new-band'>
          <h2 className='title16'>Add a new band</h2>
          <span className='subtitle16'>Fill in information for your band</span>
          <br></br><br></br>
          <form className='sign-up-form' onSubmit={this.handleSubmit}>
            <div className='sides'>

              <div className='left-side'>
                <label for="bandName">Band Name: {req}</label>
                <FormInput
                  type='text'
                  name='bandName'
                  id='bandName'
                  value={bandName}
                  onChange={this.handleChange}
                  placeholder=""
                  maxLength='30'
                  required
                />
                <label for="country">Country of Origin: {req}</label>
                <FormInput
                  type='text'
                  name='country'
                  id='country'
                  value={country}
                  onChange={this.handleChange}
                  placeholder=""
                  maxLength='30'
                  required
                />
              </div>

              <div className='right-side'>

                <div className="Main36">
                  <header className="btn btn-secondary btn-sm">
                    <div>
                      <form enctype="multipart/form-data">
                        <input type="file" name="file" id="file" accept=".png" onChange={this.handleUpload}></input>
                        {this.state.selectedFile
                          ? <input type="button" value="Click to upload!" name="button" onClick={this.onClickHandler} className="btn btn-primary btn-sm" />
                          : null
                        }
                      </form>
                    </div>
                  </header>
                </div>

                <form>
                  <p className="switch-title">NSFW: {req}</p>
                  <Switch
                    value="None"
                    id="switch"
                    name="check"
                    checked={this.state.nsfw}
                    onChange={this.handleToggle}
                  />

                </form>
                <div className='buttons16'>
                  <Link to="/profile" className='button'>
                    <CustomButton> Cancel </CustomButton>
                  </Link>
                  <SubmitButton type='submit' onClick={this.onClickHandler} disabled={this.state.submitting}> Add Band </SubmitButton>
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

export default NewBand;