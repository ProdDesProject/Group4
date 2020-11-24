import React from 'react';

import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';


import './band-item.styles.scss';

const BandItem = ({ band, history }, props) => {
    const { bandId, nsfw, bandName, bandLogo, bandImage } = band;

    return (
        <div className='band-item'>
            <div
                className='image'
                style={{
                    backgroundImage: `url(${bandLogo})`
                }}
            />
            <div className='band-footer'>
                <span className='bandInformation'>{bandName}</span>
            </div>
            <div className='band-footer'>
                <span className='name'> Artist</span>
            </div>
            <CustomButton onClick={() => {
                history.push(`/shop/bands/${bandId}`)
            }} inverted>
                BAND INFORMATION
      </CustomButton>

        </div>
    );
};

export default withRouter(BandItem);