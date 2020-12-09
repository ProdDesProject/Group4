import React from 'react';

import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';


import './albums-item.styles.scss';

{/*filter the band from the data with the bandId from props*/ }
const AlbumsItem = ({ album, history }, props) => {
    const { bandId, albumId, albumName, albumLaunchDate, albumPicture, albumGenre } = album;

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
                <span className='name'> Artist</span>
                
            </div>
            {/*Button in the band cover, onClick opens path /bands/:bandId*/}
            
            <CustomButton onClick={() => {
                history.push(`/bands/${bandId}`)
            }} inverted>
                BAND INFORMATION
            </CustomButton>

        <button onClick={() => {
                history.push(`/albums/${bandId}`)
            }} inverted>
                GET ALBUMS</button>

            

        </div>
    );
};

export default withRouter(AlbumsItem);