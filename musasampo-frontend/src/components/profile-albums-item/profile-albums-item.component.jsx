import React from 'react';

import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';

import './profile-albums-item.styles.scss';

{/*filter the band from the data with the bandId from props*/ }
const AlbumsItem = ({ album, history }, props) => {
    const { bandId, albumId, albumName, albumLaunchDate, albumPicture, albumGenre } = album;
    //console.log(albumPicture);

    const style2 = {
        margin:50,
        width: 50,
        height: 50,
       };

    const style3 = {
        margin:100,
        width: 50,
        height: 50,
       };

    return (
        <div className='band-item'>
            <div
                className='image'
                style={{
                    backgroundImage: `url(${albumPicture})`
                }}
            />
            {/* Band information */}
            <div className='band-footer'>
                <span className='bandInformation'>{decodeURIComponent(albumName)}</span>
            </div>
            <div className='band-footer'>
                <span className='name'></span>
                
            </div>
            {/*Button in the band cover, onClick opens path /bands/:bandId*/}
            
            <CustomButton onClick={() => {
                history.push({pathname: `/albums/${albumId}`, state: {albumId: albumId, albumName: albumName, albumLaunchDate: albumLaunchDate, albumPicture: albumPicture, albumGenre: albumGenre}})
            }} inverted>
                ALBUM INFORMATION
            </CustomButton>

            <CustomButton style={style2} onClick={() => {
                history.push({pathname: `/mp3-upload`, state: {bandId: bandId, albumId: albumId, albumName: albumName}})
              }} inverted>
                  ADD SONGS
            </CustomButton>

        
            <CustomButton style={style3} onClick={() => {
                history.push({pathname: `/songs/`, search: '?query=abc', state: { bandId:bandId, albumId: albumId, albumName: albumName}})
              }} inverted>
                  SONGS
            </CustomButton>

            

        </div>
    );
};

export default withRouter(AlbumsItem);