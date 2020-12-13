import React from 'react';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import SubmitButton from '../submit-button/submit-button.component';
import createAlbum from '../../services/album/create-albums-service'

import { Link } from 'react-router-dom';

import './profile-new-album.styles.scss';

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

      bandName : '',
      albumName: '',
      postingDate: '',
      albumCover: '',
      albumGenre: '',
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
    
          bandName : '',
          albumName: '',
          postingDate: '',
          albumCover: '',
          albumGenre: '',
        }
      )
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

  onClickHandler = async event => 
  {
    event.preventDefault();

    //bandId:
    var bandId = this.props.location.state.detail;


    const { bandName, albumName, postingDate, albumCover, albumGenre} = this.state;

    if (!bandName || !albumName || !postingDate || !albumCover || !albumGenre) 
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

      await createAlbum(bandName, albumName, postingDate, albumCover, albumGenre)
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
                pathname: '/profile'
              }
            );
          }
          else
          {
            this.setState({submitting: false, status: false, submittingMessage: 'Band does not exist!'});
          }
        })
    }
  }

  componentDidMount()
  {
      //bandId:
      var bandId = this.props.location.state.detail;
      alert(bandId);
  }

  render() 
  {
    const { bandName, albumName, postingDate, albumCover, albumGenre} = this.state;
    return (
      <div className='container'>
          <div className='new-album'>
            <h2 className='title'>Add a new album</h2>
            <span className='subtitle'>Fill in information for an album from your band</span>
            <br></br><br></br>
            <form className='new-album-form' onSubmit={this.handleSubmit}>
              <div className='sides'>
                  <div className='left-side'>
                      <label for="bandName">Band Name: {req}</label>
                          <FormInput
                            type='text'
                            name='bandName'
                            id='bandName'
                            value={bandName}
                            onChange={this.handleChange}
                            maxLength='30'
                            required
                            />
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
                      <FormInput
                        type='text'
                        name='albumCover'
                        id='albumCover'
                        value={albumCover}
                        onChange={this.handleChange}
                        required
                      />
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