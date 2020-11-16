import React, { useState, useEffect } from "react";

import './audio-player.styles.scss'

// Parts of the following code snippet are from this stackoverflow thread:
// https://stackoverflow.com/questions/47686345/playing-sound-in-reactjs
// Last access 13.11.2020

const useMultiAudio = urls => {
    const [sources] = useState(

        urls.map(soundUrl => {
            return {
                soundUrl,
                audio: new Audio(soundUrl)
            };
        })
    );

    const [players, setPlayers] = useState(
        urls.map(soundUrl => {
            return {
                soundUrl,
                playing: false
            };
        })
    );

    const toggle = targetIndex => () => {
        const newPlayers = [...players];
        const currentIndex = players.findIndex(p => p.playing === true);
        if (currentIndex !== -1 && currentIndex !== targetIndex) {
            newPlayers[currentIndex].playing = false;
            newPlayers[targetIndex].playing = true;
        } else if (currentIndex !== -1) {
            newPlayers[targetIndex].playing = false;
        } else {
            newPlayers[targetIndex].playing = true;
        }
        setPlayers(newPlayers);
    };

    useEffect(() => {
        sources.forEach((source, i) => {
            players[i].playing ? source.audio.play() : source.audio.pause();
            source.audio.loop = true;

        });
    }, [sources, players]);

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

    props.strings.map((item) => soundUrls.push(item.soundUrl));

    const [players, toggle] = useMultiAudio(soundUrls);

    return (

        <div className="player">

            <div className="player-item">
                <ul className="list">
                    {players.map((player, i) => (
                        <li> <Player key={i} player={player} toggle={toggle(i)} /> </li>
                    ))}
                </ul>
            </div>

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

const Play = (props) => {
    return (
        <div>
            <svg fill={props.fill} className="play-component" viewBox="0 0 60 60">
                <polygon points="0,0 50,30 0,60" />
            </svg>
        </div>
    );
};

const Player = ({ player, toggle }) => (

    <div>
        <div onClick={toggle} className={player.playing ? 'pause' : 'play'} >{player.playing ? <Pause className="pause-component" fill="black" /> : <Play fill="white" className="play-component" />} </div>
    </div>
);



export default MultiPlayer;