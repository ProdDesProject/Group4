import React from 'react';

import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';

import './album-item.styles.scss';

// This is for each individual album on the shop page

const AlbumItem = ({ item, history, match, routeName }, props) => {
  const { id, bandName, albumName, imageUrl } = item;
  const genre = match.params.genre;
  const band = match.params.bandName;
  return (
    <div className='album-item'>
      <div
        className='image'
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className='album-footer' onClick={() => { 
        if (band) {
          history.push(`${routeName}/${bandName}`)
        } else {
          history.push(`${match.path}/${routeName}/${bandName}`)
        }}}>{bandName}
        </div>
      <div className='album-footer'>
        <span className='name'>{albumName}</span>
      </div>
      <CustomButton onClick={() => {
        if (genre) {
          history.push(`${routeName}/${id}`)
        } else {
          history.push(`${match.path}/${routeName}/${id}`)
        }
      }} inverted>
        ALBUM INFORMATION
      </CustomButton>
    </div>
  );
};

export default withRouter(AlbumItem);