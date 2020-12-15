import React, { useState, useEffect } from 'react';

import MultiPlayer from "../audio-player/audio-player.component";

import './guitar-tuner.styles.scss';

import GUITAR_DATA from '../../pages/guitartuner-page/guitar.data';

function GuitarTuner(props) {

    {/* get guitarId of current guitar and get guitar data of the specific guitar */ }
    const guitarType = props.match.params.guitarType;
    const guitar = GUITAR_DATA
        .filter(guitar => (
            guitar.guitarType === Number(guitarType)),
        );

    const [strings, setTuneType] = useState(guitar[0].strings);

    const handleTuneChange = (e) => setTuneType(guitar[0].strings);
    const handleTuneChange1 = (e) => setTuneType(guitar[1].strings);
    const handleTuneChange2 = (e) => setTuneType(guitar[2].strings);
    const handleTuneChange3 = (e) => setTuneType(guitar[3].strings);
    const handleTuneChange4 = (e) => setTuneType(guitar[4].strings);

    console.log((guitarType));

    return (

        <div className='container-63'>
            <h2 className='page-title'>{guitar[0].title}</h2>
            <div className="flex-container">

                <div className="left">
                    {/* picture of our instrument type */}
                    <img src={guitar[0].imageUrl} alt="headstock" className="headstock" />
                </div>
                {/* Add all the sound buttons */}
                <div className="container-64">
                    <div className="buttons"><MultiPlayer key={guitarType} strings={strings} />
                        <div className="right">

                            <span className="caption">
                                Tune your instrument by pressing the play button of a note and compare the sound to a string of your own instrument
                            </span>

                            {guitarType == 1 &&

                                <div className="radioGroup">
                                    <p>Select tune type:</p>

                                    <input type="radio" id="Standard" name="tune" value={strings} onChange={handleTuneChange} defaultChecked />
                                    <label>Standard</label><br></br>

                                    <input type="radio" id="DropD" name="tune" value={strings} onChange={handleTuneChange1} />
                                    <label>Drop D</label><br></br>

                                    <input type="radio" id="DropC" name="tune" value={strings} onChange={handleTuneChange2} />
                                    <label>Drop C</label><br></br>

                                    <input type="radio" id="DStandard" name="tune" value={strings} onChange={handleTuneChange3} />
                                    <label>D Standard</label><br></br>

                                    <input type="radio" id="CStandard" name="tune" value={strings} onChange={handleTuneChange4} />
                                    <label>C Standard</label><br></br>

                                </div>
                            }
                        
                            {guitarType == 2 &&

                                <div className="radioGroup">
                                    <p>Select tune type:</p>

                                    <input type="radio" id="Standard" name="tune" value={strings} onChange={handleTuneChange} defaultChecked />
                                    <label>Standard</label><br></br>

                                    <input type="radio" id="DropA" name="tune" value={strings} onChange={handleTuneChange1} />
                                    <label>Drop A</label><br></br>

                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GuitarTuner;






















/*import React, { useState, useEffect } from 'react';

import MultiPlayer from "../audio-player/audio-player.component";
import setSourceUrl from "../audio-player/audio-player.component";

import './guitar-tuner.styles.scss';

import GUITAR2_DATA from '../../pages/guitartuner-page/guitar2.data';

function GuitarTuner(props) {

    // get guitarId of current guitar and get guitar data of the specific guitar
    const guitarType = props.match.params.guitarType;
    var guitar = GUITAR2_DATA
        .filter(guitar => (
            guitar.guitarType === Number(guitarType)),
        );

    //const strings = guitar[0].strings;

    //const [strings, setTuneType] = useState(guitar[0].items[0].strings);

    useEffect(() => {
        function handleTuneTypeChange(status) {
            setTuneType(status.tuneType);
          }
        });


    function handleTuneChange() {
        setTuneType(guitar[0].items[0].strings);
        }

        function handleTuneChange() {
            setTuneType(guitar[0].items[0].strings);
            }
            function handleTuneChange1() {
                setTuneType(guitar[0].items[1].strings);
                }
            function handleTuneChange2() {
                    setTuneType(guitar[0].items[2].strings);
                    }
            function handleTuneChange3() {
                        setTuneType(guitar[0].items[3].strings);
                        }
            function handleTuneChange4() {
                            setTuneType(guitar[0].items[4].strings);
                            }



                            const [strings, setTuneType] = useState(guitar[0].items[0].strings);

                            const handleTuneChange = (e) => setTuneType(guitar[0].items[0].strings);
                            const handleTuneChange1 = (e) => setTuneType(guitar[0].items[1].strings);
                            const handleTuneChange2 = (e) => setTuneType(guitar[0].items[2].strings);
                            const handleTuneChange3 = (e) => setTuneType(guitar[0].items[3].strings);
                            const handleTuneChange4 = (e) => setTuneType(guitar[0].items[4].strings);


            function sixStringFunction() {
            //const [strings, setTuneType] = useState(guitar[0].items[0].strings);


            const handleTuneChange = (e) => setTuneType(guitar[0].items[0].strings);
            const handleTuneChange1 = (e) => setTuneType(guitar[0].items[1].strings);
            const handleTuneChange2 = (e) => setTuneType(guitar[0].items[2].strings);
            const handleTuneChange3 = (e) => setTuneType(guitar[0].items[3].strings);
            const handleTuneChange4 = (e) => setTuneType(guitar[0].items[4].strings);
                }

        if (guitarType == 1) {
            sixStringFunction();


            handleTuneChange();
            handleTuneChange1();
            handleTuneChange2();
            handleTuneChange3();
            handleTuneChange4();
    const handleTuneChange = (e) => setTuneType(guitar[0].items[0].strings);
    const handleTuneChange1 = (e) => setTuneType(guitar[0].items[1].strings);
    const handleTuneChange2 = (e) => setTuneType(guitar[0].items[2].strings);
    const handleTuneChange3 = (e) => setTuneType(guitar[0].items[3].strings);
    const handleTuneChange4 = (e) => setTuneType(guitar[0].items[4].strings);
        }




    console.log((handleTuneChange));
    console.log((handleTuneChange4));
    console.log((setSourceUrl));

    return (

        <div className='container-63'>
            <h2 className='page-title'>{guitar[0].title}</h2>
            <div className="flex-container">

                <div className="left">
                    // picture of our instrument type
                    <img src={guitar[0].imageUrl} alt="headstock" className="headstock" />
                </div>
                // Add all the sound buttons
                <div className="container-64">
                    <div className="buttons"><MultiPlayer key={guitarType} strings={strings}/>
                        <div className="right">

                            <span className="caption">
                                Tune your instrument by pressing the play button of a note and compare the sound to a string of your own instrument
                            </span>

                            <div className="radioGroup">
                                <p>Select tune type:</p>

                                <input type="radio" id="Standard" name="tune" value={strings} onChange={handleTuneChange} defaultChecked />
                                <label>Standard</label><br></br>

                                <input type="radio" id="DropD" name="tune" value={strings} onChange={handleTuneChange1} />
                                <label>Drop D</label><br></br>

                                <input type="radio" id="DropC" name="tune" value={strings} onChange={handleTuneChange2} />
                                <label>Drop C</label><br></br>

                                <input type="radio" id="DStandard" name="tune" value={strings} onChange={handleTuneChange3} />
                                <label>D Standard</label><br></br>

                                <input type="radio" id="CStandard" name="tune" value={strings} onChange={handleTuneChange4} />
                                <label>C Standard</label><br></br>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GuitarTuner;*/