import React from 'react';

import { withRouter } from 'react-router-dom';
import CustomButton from '../custom-button/custom-button.component';

import './guitar-item.styles.scss';

const GuitarItem = ({ guitar, history, match }) => {
    const { guitarId, title, imageUrl, routeName, strings } = guitar;
    return (
        <div className='album-item'>
            <div
                className='image'
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />
            <div className='guitar-footer'>
                <span className='guitarInformation'>{title}</span>
            </div>
            <CustomButton onClick={() => history.push(`${match.path}/${guitarId}`)} inverted>
                TUNE NOW
      </CustomButton>

        </div>
    );
};

export default withRouter(GuitarItem);
