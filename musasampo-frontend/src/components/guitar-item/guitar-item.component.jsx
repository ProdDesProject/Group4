import React from 'react';

import { withRouter } from 'react-router-dom';
import CustomButton from '../custom-button/custom-button.component';

import './guitar-item.styles.scss';

{/* props from  guitartuner-page.component.jsx*/ }
const GuitarItem = ({ guitar, history, match }) => {
    const { guitarType, title, imageUrl } = guitar;
    return (
        <div className='guitar-item'>
            {/*</div><div className='album-item'>
            {/* Guitar picture */}
            <div
                className='image'
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />
            {/* Guitar information */}
            <div className='guitar-footer'>
                <span className='guitarInformation'>{title}</span>
            </div>
            {/*Button in the guitar cover, onClick opens path /guitartuner/:guitarType*/}
            <CustomButton onClick={() => history.push(`${match.path}/${guitarType}`)} inverted>
                TUNE NOW
      </CustomButton>

        </div>
    );
};

export default withRouter(GuitarItem);
