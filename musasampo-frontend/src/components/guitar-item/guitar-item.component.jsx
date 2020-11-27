import React from 'react';

import { withRouter } from 'react-router-dom';
import CustomButton from '../custom-button/custom-button.component';

import './guitar-item.styles.scss';

const GuitarItem = ({ guitar, history, match }) => {
    const { guitarId, title, imageUrl } = guitar;
    return (
        <div className='guitar-item'>
            <div
                className='image'
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />
            <CustomButton onClick={() => history.push(`${match.path}/${guitarId}`)} inverted>
                TUNE NOW
            </CustomButton>
            <div className='guitar-footer'>
                <span className='guitarInformation'>{title}</span>
            </div>

        </div>
    );
};

export default withRouter(GuitarItem);
