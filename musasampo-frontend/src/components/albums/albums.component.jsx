import React from 'react';

//import ALBUMS from '../../data/albums';
//import BANDS from '../../data/bands';

import SearchBox from '../search-box/search-box.component';
import AlbumsItem from '../albums-item/albums-item.component';
import BandItem from '../band-item/band-item.component';

import getBandsBandId from '../../services/band/get-band-by-bandId-servise';

import fetchAlbumsByBandName from '../../services/album/albums-by-albumid-service';
import getUserID from '../../services/user/get-userid-by-username.service';
import { stringify } from 'querystring';

import './albums.styles.scss';
import fetchAlbumsBybandId from '../../services/album/album-get-albumid-from-bandid-service';
import fetchAlbumId from '../../services/album/album-get-albumid-from-bandid-service';

{/* Albums.component*/ }

class Albums extends React.Component {
    constructor() {
        super();
        {/* Empty array for filtered albums and bands + searchfield input  */ }
        this.state = {
            bands:[],
            albums: [],
            pictures: [],
            searchField: ''
        };
    }

    async componentDidMount() 
    {

      //Token from localStorage:
      var loggedInUser = [];
      var loggedInUser2;
      loggedInUser = JSON.parse(localStorage.getItem("currentToken"));
      loggedInUser2 = JSON.parse(localStorage.getItem("currentUser"));

      //console.log(loggedInUser2);
      //userId:
      var userId = loggedInUser2.results[0].userId;

      //bandId:
      var bandId = this.props.location.state.detail;

      //AlbumId fetch by:
      var AlbumId = await fetchAlbumId(bandId);
      //AlbumId = AlbumId.albums.albumId;

      //fetch Bands by bandId:
      let BANDS = await getBandsBandId(bandId);

      //fetch Albums by bandId <= comes from click:
      let ALBUMS = await fetchAlbumsBybandId(bandId);

      var Bandsnames = [];
      Bandsnames = BANDS.bands;
  
      var BandsAndPictures = [];
      BandsAndPictures = ALBUMS.albums;
      
      //ALBUMS.albums[0].albumPicture = url;

      for (var i in ALBUMS.albums)
        {
            ///imagepath.png/album/:band/albums/:image
            var url = 'http://localhost:9000/upload/imagepath.png/'+ BANDS[0].bandName +'/albums/'+ALBUMS.albums[i].albumName+'/'+ALBUMS.albums[i].albumPicture;
            //Save url to array:
            BandsAndPictures[i].albumPicture = url;
           
        };

      this.setState({ bands: BANDS.bands });
      this.setState({ albums: ALBUMS.albums });
        
   

    //change albumName and bandName for page (%20 changes to spaces)
    for (var i=0;i<ALBUMS.albums.length;i++)
    {
        BandsAndPictures[i].albumName = decodeURIComponent(BandsAndPictures[i].albumName);
    };

      this.setState({ albums: BandsAndPictures });
    }

    /* change search field state to search field input  */
    onSearchChange = event => {
        this.setState({ searchField: event.target.value });
    };

    //SEARCH_BAR:
    //<SearchBox onSearchChange={this.onSearchChange} />

    render() {
        const { albums, searchField } = this.state;

        {/* filter bands with search field value  */ }
        const filteredAlbums = albums.filter(album =>
            album.albumName.toLowerCase().includes(searchField.toLowerCase())
        );


        return (
            <div className="search-page">
                <div className="search-preview">
                   
                </div>

                {/* display filtered bands  */}
                <div className="search-preview">
                    <h2 className='title'>
                        ALBUMS
                    </h2>
                    <div className='items'>
                        {filteredAlbums
                            .map(album => (
                                <AlbumsItem key={album.albumId} album={album} />
                            ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Albums;