import React from 'react';

import { Link,withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';


import './band-profile-item.styles.scss';

{/*filter the band from the data with the bandId from props*/ }
const BandItem = ({ band, history }, props) => {
    const { bandId, nsfw, bandName, bandLogo } = band;

    const style1 = {
        width: 50,
        height: 50,
      };

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
                    backgroundImage: `url(${bandLogo})`
                }}

                
            />

            {/* Band information */}
            <div className='band-footer'>
                <span className='bandInformation'>{bandName}</span>
                
            </div>
            <div className='band-footer'>
                <span className='name'></span>
                
            </div>

            {/*Button in the band cover, onClick opens path /bands/:bandId*/}

            <CustomButton style = {style1} onClick={() => {
                history.push(`/bands/${bandId}`)
            }} inverted>
                INFO
            </CustomButton>

            <CustomButton style={style2} onClick={() => {
                history.push({pathname:`/profile/newalbum`, state:{detail: bandId, bandName: bandName}})
            }} inverted>
                Add an Album
            </CustomButton>

            <CustomButton style={style3} onClick={() => {
                history.push({ pathname: `/profile-albums/`, search: '?query=abc', state: { detail: bandId, bandName: bandName }})
                }} inverted>
                    ALBUMS
            </CustomButton>
            

        </div>
    );
};

export default withRouter(BandItem);