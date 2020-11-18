import React from 'react';

import { withRouter, Link } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';

import './album-item.styles.scss';

// This is for each individual album on the shop page

const AlbumItem = ({ item, history, match, routeName }) => {
  const { id, bandName, albumName, imageUrl } = item;
  const route = routeName;
  return (
    <div className='album-item'>
      <div
        className='image'
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className='album-footer'>
        <span className='albumInformation'>{bandName}</span>
      </div>
      <div className='album-footer'>
        <span className='name'>{albumName}</span>
      </div>
      <CustomButton onClick={() => history.push(`${match.path}/${routeName}/${id}`)} inverted>
        ALBUM INFORMATION
      </CustomButton>

    </div>
  );
};

export default withRouter(AlbumItem);