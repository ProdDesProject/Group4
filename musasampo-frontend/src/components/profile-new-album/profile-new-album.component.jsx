import React from 'react';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import SubmitButton from '../submit-button/submit-button.component';

import { Link } from 'react-router-dom';

import './profile-new-album.styles.scss';

var req = <p className="req">*</p>;

class NewAlbum extends React.Component {
  constructor(props) 
  {
    super(props);

    this.state = {
      albumName: '',
      postingDate: '',
      albumCover: '',
      albumGenre: '',
      songs: ''
    };
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() 
  {
    //songs should not be there
    const { albumName, postingDate, albumCover, albumGenre, songs } = this.state;
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
                      <label for="postingDate">Release Date(dd/mm/yyyy): {req}</label>
                      <FormInput
                        type='text'
                        name='postingDate'
                        id='postingDate'
                        value={postingDate}
                        onChange={this.handleChange}
                        maxLength='10'
                      />
                      <label for="albumCover">Album Cover: {req}</label>
                      <FormInput
                        type='text'
                        name='albumCover'
                        id='albumCover'
                        value={albumCover}
                        onChange={this.handleChange}
                        placeholder='Upload a picture for the album cover'
                        required
                      />
                </div>

                <div className='right-side'>
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
                    <form> {/*later to implement the mp3 upload here*/}
                      <label for="songs">Songs: {req}</label>
                        <FormInput
                          type='text'
                          name='songs'
                          value={songs}
                          onChange={this.handleChange}
                          id='songs'
                          placeholder = 'Upload songs for the album'
                          maxLength='30'
                          required
                        />
                    </form>
                    <div className='buttons'>
                      <Link to = "/profile" className='button'>
                        <CustomButton> Cancel </CustomButton>
                      </Link>
                      <SubmitButton type='submit' onClick = {this.onClickHandler}> Add Album </SubmitButton>
                    </div>
                  </div>
                </div>
            </form>
            
          </div>
        </div>
    );
  }
}

export default NewAlbum;