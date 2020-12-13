import React , { Component} from 'react';
import './music-player.styles.scss';


class Music_player extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
      <div className="btn btn-secondary btn-sm">
      <header className="">
        < div >
        <audio controls>
        <source src={'http://localhost:9000/upload/mp3path.mp3/Hiipparit/Hiirialbum/Hurt.mp3'} type="audio/mpeg"/>
        Your browser does not support the audio element.
        </audio>
        </div>

      </header>
      </div>
    );
  }
}

export default Music_player;


