import React from 'react';

import { withRouter } from 'react-router-dom';
import CustomButton from '../custom-button/custom-button.component';

//import BANDS from '../../data/bands';

import './album-item.styles.scss';



const AlbumItem = ({ album, history, match }) => {
  const { bandId, albumId, albumName, bandName, albumPicture, albumGenre, albumInfo, lineup, trackList } = album;

  {/*filter the band from the data with the bandId from props*/ }
  //const band = BANDS.filter(band => band.bandId == bandId);

  return (
    <div className='album-item'>
      <div
        className='image'
        style={{
          backgroundImage: `url(${albumPicture})`
        }}
      />

      {/*Album information*/}
      <div className='album-footer'>
        <span className='albumInformation'></span>
      </div>

      <div className='album-footer'>
        <span className='name'>{albumName}</span>
      </div>

      {/*Button in the album cover, onClick opens path /shop/albums/:albumId*/}
      <CustomButton onClick={() => {
        history.push(`/shop/albums/${albumId}`)
      }} inverted>
        ALBUM INFORMATION
      </CustomButton>
    </div>
  );
};

export default withRouter(AlbumItem);