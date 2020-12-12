import React from 'react';

//import ALBUMS from '../../data/albums';
//import BANDS from '../../data/bands';

import SearchBox from '../search-box/search-box.component';
import SongsItem from '../songs-item/songs-item.component';
import BandItem from '../band-item/band-item.component';

import getBandsBandId from '../../services/band/get-band-by-bandId-servise';


import fetchAlbumsByBandName from '../../services/album/albums-by-albumid-service';
import getUserID from '../../services/user/get-userid-by-username.service';
import { stringify } from 'querystring';

import './songs.styles.scss';
import fetchAlbumsBybandId from '../../services/album/album-get-albumid-from-bandid-service';
import fetchAlbumId from '../../services/album/album-get-albumid-from-bandid-service';

import getSongsAlbumId from '../../services/songs/get-songs-by-albumid-service'

{/* Albums.component*/ }

class SongsPage extends React.Component {
    constructor() {
        super();
        {/* Empty array for filtered albums and bands + searchfield input  */ }
        this.state = {
            bands:[],
            albums: [],
            pictures: [],
            searchField: '',
            songs:[]
        };
    }

    async componentDidMount() 
    {

      //Token from localStorage:
      var loggedInUser = [];
      var loggedInUser2;
      loggedInUser = JSON.parse(localStorage.getItem("currentToken"));
      loggedInUser2 = JSON.parse(localStorage.getItem("currentUser"));

      //userId:
      var userId = loggedInUser2.results[0].userId;
      //bandId:
      var bandId = this.props.location.state.bandId;
      var AlbumId = this.props.location.state.albumId;
    
      //alert(albumName);
      let SONGS = await getSongsAlbumId(AlbumId);
    
      var Songs = [];
      Songs = SONGS.songs;
      
      
      var albumName= this.props.location.state.albumName;

      //alert(bandId);

      var bandInfo = await getBandsBandId(bandId);
      var bandName = bandInfo[0].bandName;
      


      //alert(albumName);
      //alert(SONGS.songs[0].MP3);

      var mp3 = SONGS.songs[0].MP3;

      //ALBUMS.albums[0].albumPicture = url;

      for (var i in SONGS.songs)
        {
            ///imagepath.png/album/:band/albums/:image
            var url = 'http://localhost:9000/upload/mp3path.mp3/'+bandName+'/'+albumName+'/'+mp3;
            //Save url to array:
            Songs[i].MP3 = url;
            console.log(url);
           
        };

      this.setState({ songs: SONGS.songs });

      console.log("1"+this.state.songs);
      
        
   

    //change albumName and bandName for page (%20 changes to spaces)
    for (var i=0;i<SONGS.songs.length;i++)
    {
        Songs[i].songName = decodeURIComponent(Songs[i].songName);
    };

      this.setState({ songs: Songs });
      //alert(this.state.songs);
    }

    /* change search field state to search field input  */
    onSearchChange = event => {
        this.setState({ searchField: event.target.value });
    };

    //SEARCH_BAR:
    //<SearchBox onSearchChange={this.onSearchChange} />

    render() {
        const { songs, searchField } = this.state;

        {/* filter bands with search field value  */ }
        const filteredSongs = songs.filter(song =>
            song.songName.toLowerCase().includes(searchField.toLowerCase())
        );


        return (
            <div className="search-page">
                <div className="search-preview">
                   
                </div>

                {/* display filtered bands  */}
                <div className="search-preview">
                    <h2 className='title'>
                        SONGS
                    </h2>
                    <div className='items'>
                        {filteredSongs
                            .map(song => (
                                <SongsItem key={song.songId} song={song} />
                            ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default SongsPage;