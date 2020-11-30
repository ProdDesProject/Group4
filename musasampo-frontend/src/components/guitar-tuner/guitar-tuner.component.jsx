import React from "react";

import MultiPlayer from "../audio-player/audio-player.component";

import './guitar-tuner.styles.scss';

import GUITAR_DATA from '../../pages/guitartuner-page/guitar.data';

function GuitarTuner(props) {

    {/* get guitarId of current guitar and get guitar data of the specific guitar */ }
    const guitarId = props.match.params.guitarId;
    const guitar = GUITAR_DATA
        .filter(guitar => (
            guitar.guitarId === Number(guitarId)),
        );

    const strings = guitar[0].strings;


    return (
        <div className="">
            <h2 className='page-title'>{guitar[0].title}</h2>
            <div className="flex-container">

                <div className="left">
                    {/* picture of our guitar */}
                    <img src={guitar[0].imageUrl} alt="headstock" className="headstock" />
                    <span className="caption">
                        Tune your guitar by pressing the play button of a note and compare the sound to a string of your own guitar
                    </span>
                </div>
                {/* Add all the sound buttons */}
                <div className="right"><MultiPlayer key={guitarId} strings={strings} /></div>
            </div>
        </div>
    );
}

export default GuitarTuner;