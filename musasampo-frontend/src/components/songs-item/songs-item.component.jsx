import React from 'react';

import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';

import './songs-item.styles.scss';

{/*filter the band from the data with the bandId from props*/ }
const AlbumsItem = ({ song, history }, props) => {
    const { albumId, songId,songName,MP3,MP4 } = song;

    return (
        <div className='band-item'>
            
            {/* Band information */}
            <div className='band-footer'>
                <span className='bandInformation'>{songName}</span>
            </div>
            <div className='band-footer'>
                <span className='name'></span>

                <audio controls>
                <source src={MP3} type="audio/mpeg"/>
                Your browser does not support the audio element.
                </audio>
                
            </div>
            {/*Button in the band cover, onClick opens path /bands/:bandId*/}
            
        </div>
    );
};

export default withRouter(AlbumsItem);