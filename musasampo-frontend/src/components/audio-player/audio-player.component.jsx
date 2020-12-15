  
import React, { useState, useEffect } from "react";

import './audio-player.styles.scss'

// Parts of the following code snippet are from this stackoverflow thread:
// https://stackoverflow.com/questions/47686345/playing-sound-in-reactjs
// Last access 13.11.2020


{/* make audio object from of every url we are receiving from props */ }
const useMultiAudio = urls => {
    const [sources, setSource] = useState(

        urls.map(soundUrl => {
            return {
                soundUrl,
                audio: new Audio(soundUrl)
            };
        })
    );

    const setSourceUrl = (e) => setSource(urls.map(soundUrl => {
        return {
            soundUrl,
            audio: new Audio(soundUrl)
        };
    }));

    {/* handle state of every audio player in players array */ }
    const [players, setPlayers] = useState(
        urls.map(soundUrl => {
            return {
                soundUrl,
                playing: false
            };
        })
    );

    {/* updates state of every audio player in players array*/ }
    const toggle = targetIndex => () => {
        setSourceUrl();
        const newPlayers = [...players];
        const currentIndex = players.findIndex(p => p.playing === true);
        {/* other player is playing, so set this one to false and the targeted player to true */ }
        if (currentIndex !== -1 && currentIndex !== targetIndex) {
            newPlayers[currentIndex].playing = false;
            newPlayers[targetIndex].playing = true;
            {/* targeted player is current active player so set state to false */ }
        } else if (currentIndex !== -1) {
            newPlayers[targetIndex].playing = false;
            {/* no active player currently */ }
        } else {
            newPlayers[targetIndex].playing = true;
        }
        setPlayers(newPlayers);
    };

    {/* start and stop the actual audio */ }
    useEffect(() => {
        sources.forEach((source, i) => {
            //check if the audio is starting to play - if you press play, it will always start the note from the beginning, even after pausing it
            if (players[i].playing) {
                source.audio.load();
                source.audio.play();
                source.audio.currentTime = 0;
            } else {
                source.audio.pause();
            }

            //players[i].addEventListener("ended", () => {
            //    players[i].playing = false;
            // });
            // source.audio.loop = true;

        });
    }, [sources, players]);

    {/* set state to false when audio has ended */ }
    useEffect(() => {
        sources.forEach((source, i) => {
            source.audio.addEventListener("ended", () => {
                const newPlayers = [...players];
                newPlayers[i].playing = false;
                setPlayers(newPlayers);

            });
        });
        return () => {
            sources.forEach((source, i) => {
                source.audio.removeEventListener("ended", () => {
                    const newPlayers = [...players];
                    newPlayers[i].playing = false;
                    setPlayers(newPlayers);
                });
            });
        };
    });
    return [players, toggle];
};



const MultiPlayer = (props) => {


    const soundUrls = [];

    // map soundUrls from props and push them to soundUrls array
    props.strings.map((item) => soundUrls.push(item.soundUrl));

    const [players, toggle] = useMultiAudio(soundUrls);

    return (

        <div className="player">

            <div className="player-item">
                <ul className="list">
                    {/* map all audio players */}
                    {players.map((player, i) => (
                        <li> <Player key={i} player={player} toggle={toggle(i)} /> </li>
                    ))}
                </ul>
            </div>
            {/* map all guitar sound names */}
            <div className="string-name">
                <ul className="list">
                    {props.strings.map((item, index) =>
                        <li className="list-item">{item.title}</li>
                    )}
                </ul>

            </div>


        </div>
    );
};

{/* pause button shape */ }
const Pause = (props) => {
    return (
        <div>
            <svg fill={props.fill} className="pause-component" viewBox="0 0 60 60">
                <polygon points="0,0 15,0 15,60 0,60" />
                <polygon points="25,0 40,0 40,60 25,60" />
            </svg>
        </div>
    );
};

{/* play button shape */ }
const Play = (props) => {
    return (
        <div>
            <svg fill={props.fill} className="play-component" viewBox="0 0 60 60">
                <polygon points="0,0 50,30 0,60" />
            </svg>
        </div>
    );
};

{/* one single player button, that switches between "playing" and "pause" */ }
const Player = ({ player, toggle }) => (

    <div>
        <div onClick={toggle} className={player.playing ? 'pause' : 'play'} >{player.playing ? <Pause className="pause-component" fill="black" /> : <Play fill="white" className="play-component" />} </div>
    </div>
);



export default MultiPlayer;