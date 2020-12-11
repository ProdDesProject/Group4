
import React from 'react';

import ALBUMS from '../../data/albums';
import BANDS from '../../data/bands';

import SearchBox from '../../components/search-box/search-box.component';
import AlbumItem from '../../components/album-item/album-item.component';
import BandItem from '../../components/band-item/band-item.component';

import getAlbums from '../../services/album/albums-in-service.js';
import getBands from '../../services/band/get-band-service.js';

import getBandsBandId from '../../services/band/get-band-by-bandId-servise';


import './search.styles.scss';

{/* Search page */ }

class Search extends React.Component {
    constructor() {
        super();
        {/* Empty array for filtered albums and bands + searchfield input  */ }
        this.state = {
            albums: [],
            bands: [],
            searchField: ''
        };
    }

    /* add all albums from data to array  */
    async componentDidMount() {

        let ALBUMS = await getAlbums();
        ALBUMS = await ALBUMS.json();

        let BANDS = await getBands();
        BANDS = await BANDS.json();

        console.log(BANDS);

        this.setState({ albums: ALBUMS.albums });
        this.setState({ bands: BANDS.bands });
        
        var BandsAndPictures = [];
        BandsAndPictures = BANDS.bands;

        var AlbumsAndPictures = [];
        AlbumsAndPictures = ALBUMS.albums;

        //Get url for getting picture for bands
        for (var i=0;i<BANDS.bands.length;i++)
        {
            var url = 'http://localhost:9000/upload/imagepath.png/'+BANDS.bands[i].bandName+'/'+ BANDS.bands[i].bandLogo;
            //Save url to array:
            BandsAndPictures[i].bandLogo = url;
        };

        //console.log(ALBUMS.albums.length);
         //Get url for getting picture for albums

         //var i=0;i<ALBUMS.albums.length;i++

        for (var i in ALBUMS.albums)
        {
            var result = await getBandsBandId(ALBUMS.albums[i].bandId);
            result = result[0].bandName
            ///imagepath.png/album/:band/albums/:image
            var url = 'http://localhost:9000/upload/imagepath.png/'+ result +'/albums/'+ ALBUMS.albums[i].albumName+ '/' +ALBUMS.albums[i].albumPicture;
            //Save url to array:
            AlbumsAndPictures[i].albumPicture = url;
            //console.log(i);

            //console.log(ALBUMS.albums);
        };

        //change albumName and bandName for page (%20 changes to spaces)
        for (var i=0;i<ALBUMS.albums.length;i++)
        {
            AlbumsAndPictures[i].albumName = decodeURIComponent(AlbumsAndPictures[i].albumName);
        };

        for (var i=0;i<BANDS.bands.length;i++)
        {
            BandsAndPictures[i].bandName = decodeURIComponent(BandsAndPictures[i].bandName);
        };

        this.setState({ bands: BandsAndPictures });
        this.setState({ albums: AlbumsAndPictures });

        console.log(this.state.albums);
    }

    /* change search field state to search field input  */
    onSearchChange = event => {
        this.setState({ searchField: event.target.value });
    };

    render() {
        const { albums, bands, searchField } = this.state;

        {/* filter albums and bands with search field value  */ }
        const filteredAlbums = albums.filter(album =>
            album.albumName.toLowerCase().includes(searchField.toLowerCase())
        );
        const filteredBands = bands.filter(band =>
            band.bandName.toLowerCase().includes(searchField.toLowerCase())
        );

        return (
            <div className="search-page">
               
               <SearchBox onSearchChange={this.onSearchChange} />

                {/* display filtered bands  */}
                <div className="search-preview">
                    <h2 className='title'>
                        BANDS
                    </h2>
                    <div className='items'>
                        {filteredBands
                            .filter((band, idx) => idx < bands.length)
                            .map(band => (
                                <BandItem key={band.bandId} band={band} />
                            ))}
                    </div>
                </div>

               
                <div className="search-preview">
                    <h2 className='title'>
                        ALBUMS
                    </h2>

                    {/* Display filtered albums  */}
                    <div className='items'>
                        {filteredAlbums
                            .filter((album, idx) => idx < albums.length)
                            .map(album => (
                                <AlbumItem className="items" key={album.albumId} album={album} routeName={album.albumGenre.toLowerCase()} />
                            ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;
