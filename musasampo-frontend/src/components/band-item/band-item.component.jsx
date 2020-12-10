import React from 'react';

import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';


import './band-item.styles.scss';

{/*filter the band from the data with the bandId from props*/ }
const BandItem = ({ band, history }, props) => {
    const { bandId, nsfw, bandName, bandLogo } = band;

    return (
        <div className='band-item'>
            <div
                className='image'
                style={{
                    backgroundImage: `url(${bandLogo})`
                }}
            />
            {/* Band information */}
            <div className='band-footer'>
                <span className='bandInformation'>{bandName}</span>
            </div>
            <div className='band-footer'>
                <span className='name'> Artist</span>
            </div>
            {/*Button in the band cover, onClick opens path /shop/bands/:bandId*/}
            <CustomButton onClick={() => {
                history.push(`/shop/bands/${bandId}`)
            }} inverted>
                BAND INFORMATION
      </CustomButton>

        </div>
    );
};

export default withRouter(BandItem);