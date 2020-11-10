import React from 'react';

import './guitar-tuner.styles.scss';

class GuitarTuner extends React.Component {
    constructor() {
        super();

        this.state = {
            play: false,
            sounds: [
                {
                    id: 1,
                    string: 'D',
                    soundUrl: 'https://tuner-online.com/audio/e4.mp3',
                },
                {
                    id: 2,
                    title: 'A',
                    soundUrl: 'https://tuner-online.com/audio/e4.mp3',
                },
                {
                    id: 3,
                    title: 'E',
                    soundUrl: 'https://tuner-online.com/audio/e4.mp3',
                },
                {
                    id: 4,
                    title: 'G',
                    soundUrl: 'https://tuner-online.com/audio/e4.mp3',
                },
                {
                    id: 5,
                    title: 'B',
                    soundUrl: 'https://tuner-online.com/audio/e4.mp3',
                },
                {
                    id: 6,
                    title: 'E',
                    soundUrl: 'https://tuner-online.com/audio/e4.mp3',
                }
            ]
        };
    }

    audio = new Audio("https://tuner-online.com/audio/e4.mp3");


    componentDidMount() {
        this.audio.addEventListener('ended', () => this.setState({ play: false }));
    }

    componentWillUnmount() {
        this.audio.removeEventListener('ended', () => this.setState({ play: false }));
    }

    togglePlay = () => {
        this.setState({ play: !this.state.play }, () => {
            this.state.play ? this.audio.play() : this.audio.pause();
        });
    }

    // {this.state.sounds.map(({ id, title, soundUrl }) => (
    //    <CustomButton key={id} onClick={play} >
    //    {title}
    // </CustomButton>


    render() {

        const Pause = () => {
            return (
                <svg className="button" viewBox="0 0 60 60">
                    <polygon points="0,0 15,0 15,60 0,60" />
                    <polygon points="25,0 40,0 40,60 25,60" />
                </svg>
            );
        };

        const Play = () => {
            return (
                <svg className="button" viewBox="0 0 60 60">
                    <polygon points="0,0 50,30 0,60" />
                </svg>
            );
        };

        return (
            <div className="custom-div">
                <div className={`play ${this.state.play ? "pause" : "play"}`} onClick={this.togglePlay}><div> {this.state.play ? <Pause /> : <Play />}</div></div>
            </div>

        );
    }
}

export default GuitarTuner;