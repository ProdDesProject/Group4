import React from 'react';

import SongsItem from '../songs-item/songs-item.component';

import getBandsBandId from '../../services/band/get-band-by-bandId-servise';

import './songs.styles.scss';

import getSongsByalbumId from '../../services/songs/get-songs-by-albumid-service'

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

      //bandId:
      var bandId = this.props.location.state.bandId;
      var albumId = this.props.location.state.albumId;

      //get songs from an album by albumId
      var SONGS = await (await getSongsByalbumId(albumId)).json();
      
      if(!SONGS.message)
      {
        //get album name from props
        var albumName= this.props.location.state.albumName;

        //get bandname from database
        var bandInfo = await (await getBandsBandId(bandId)).json();
        var bandName = bandInfo[0].bandName;

        //ALBUMS.albums[0].albumPicture = url;

        for (var i in SONGS)
            {
                ///imagepath.png/album/:band/albums/:image
                var url = 'http://localhost:9000/upload/mp3path.mp3/'+bandName+'/'+albumName+'/'+ SONGS[i].MP3;
                //Save url to array:
                SONGS[i].MP3 = url;
            };
        

        //change albumName and bandName for page (%20 changes to spaces)
        for (var i=0;i<SONGS.length;i++)
        {
            SONGS[i].songName = decodeURIComponent(SONGS[i].songName);
        };
      }
      this.setState({ songs: SONGS });
    }

    /* change search field state to search field input  */
    onSearchChange = event => {
        this.setState({ searchField: event.target.value });
    };

    //SEARCH_BAR:
    //<SearchBox onSearchChange={this.onSearchChange} />

    render() {
        const { songs, searchField } = this.state;

        if(songs === undefined || songs.message)
        {
            alert("No songs for this album!");
            //push to the main page
            this.props.history.push({
                pathname: '/',
            });
            return null;
        }
        else
        {
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
}

export default SongsPage;