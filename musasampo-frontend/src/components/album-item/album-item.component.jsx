import React from 'react';

import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';

import BANDS from '../../data/bands';

import './album-item.styles.scss';

const AlbumItem = ({ album, history, match }) => {
  const { bandId, albumId, albumName, albumLaunchDate, albumPicture, albumGenre } = album;

  const band = BANDS.filter(band => band.bandId == bandId);

  return (
    <div className='album-item'>
      <div
        className='image'
        style={{
          backgroundImage: `url(${albumPicture})`
        }}
      />
      <div className='album-footer'>
        <span className='albumInformation'>{band[0].bandName}</span>
      </div>
      <div className='album-footer'>
        <span className='name'>{albumName}</span>
      </div>
      <CustomButton onClick={() => {
        history.push(`/shop/albums/${albumId}`)
      }} inverted>
        ALBUM INFORMATION
      </CustomButton>
    </div>
  );
};

export default withRouter(AlbumItem);