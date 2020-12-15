import React from 'react';

import { withRouter } from 'react-router-dom';
import CustomButton from '../custom-button/custom-button.component';

//import BANDS from '../../data/bands';

import './album-item.styles.scss';



const AlbumItem = ({ album, history, match }) => {
  console.log(album);
  const { bandId, albumId, albumName, bandName, albumPicture, albumGenre, albumInfo, lineup, trackList } = album;

  {/*filter the band from the data with the bandId from props*/ }
  //const band = BANDS.filter(band => band.bandId == bandId);

  const style1 = {
    width: 50,
    height: 50,
  };

  const style2 = {
    margin:50,
    width: 50,
    height: 50,
   };

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
        history.push(`/albums/${albumId}`)
      }} inverted>
        ALBUM INFORMATION
      </CustomButton>

      <CustomButton style={style2} onClick={() => {
                history.push({pathname: `/songs/`, search: '?query=abc', state: { bandId:bandId, albumId: albumId, albumName: albumName}})
              }} inverted>
                  SONGS
      </CustomButton>

    </div>
  );
};

export default withRouter(AlbumItem);