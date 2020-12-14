import React from 'react';

import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';

import './albums-item.styles.scss';

{/*filter the band from the data with the bandId from props*/ }
const AlbumsItem = ({ album,bandName, history }, props) => {
    const { bandId, albumId, albumName, albumLaunchDate, albumPicture, albumGenre } = album;

    //alert(albumPicture);

    const style2 = {
        margin:50,
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
                <span className='bandInformation'>{albumName}</span>
            </div>
            <div className='band-footer'>
                <span className='name'></span>
                
            </div>
            {/*Button in the band cover, onClick opens path /bands/:bandId*/}
            
            <CustomButton onClick={() => {
                history.push(`/albums/${bandId}`)
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

export default withRouter(AlbumsItem);