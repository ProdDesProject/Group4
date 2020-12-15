import React from 'react';
import SearchBox from '../search-box/search-box.component';
import AlbumsItem from '../albums-item/albums-item.component';
import BandItem from '../band-item/band-item.component';

import getBandsBandId from '../../services/band/get-band-by-bandId-servise';

import './albums.styles.scss';
import getAlbumsBybandId from '../../services/album/album-get-albumid-from-bandid-service';

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

      //bandId from inherited props
      var bandId = this.props.location.state.detail;
      var bandName = this.props.location.state.bandName;

      //fetch Bands by bandId:
      const BANDS = await (await getBandsBandId(bandId)).json();

      //fetch Albums by bandId <= comes from click:
      const ALBUMS = await (await getAlbumsBybandId(bandId)).json();

      if(!ALBUMS.message)
      {
        for (var i in ALBUMS)
        {
           ///imagepath.png/album/:band/albums/:image
           var url = 'http://localhost:9000/upload/imagepath.png/'+ BANDS[0].bandName +'/albums/'+ALBUMS[i].albumName+'/'+ALBUMS[i].albumPicture;
           //Save url to array:
           ALBUMS[i].albumPicture = url;
        };

        //change albumName and bandName for page (%20 changes to spaces)
        for (var i = 0; i < ALBUMS.length; i++ )
        {
            ALBUMS[i].albumName = decodeURIComponent(ALBUMS[i].albumName);
        };
      }
      this.setState({ bands: BANDS });
      this.setState({ albums: ALBUMS });
}

    /* change search field state to search field input  */
    onSearchChange = event => {
        this.setState({ searchField: event.target.value });
    };

    //SEARCH_BAR:
    //<SearchBox onSearchChange={this.onSearchChange} />

    render() {
        const { albums, searchField } = this.state;

        if(albums.message)
        {
            alert("No albums for this band!");
            //push to the main page
            this.props.history.push({
                pathname: '/',
            });
            return null;
        }
        else
        {
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
}

export default Albums;