
import React from 'react';

import ALBUMS from '../../data/albums';
import BANDS from '../../data/bands';

import SearchBox from '../../components/search-box/search-box.component';
import AlbumItem from '../../components/album-item/album-item.component';
import BandItem from '../../components/band-item/band-item.component';

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
    componentDidMount() {
        this.setState({ albums: ALBUMS });
        this.setState({ bands: BANDS })
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
                <div className="search-preview">
                    <h2 className='title'>
                        ALBUMS
                    </h2>

                    {/* Display filtered albums  */}
                    <div className='items'>
                        {filteredAlbums
                            .filter((album, idx) => idx < 4)
                            .map(album => (
                                <AlbumItem className="items" key={album.albumId} album={album} routeName={album.albumGenre.toLowerCase()} />
                            ))}
                    </div>
                </div>

                {/* display filtered bands  */}
                <div className="search-preview">
                    <h2 className='title'>
                        BANDS
                    </h2>
                    <div className='items'>
                        {filteredBands
                            .filter((band, idx) => idx < 4)
                            .map(band => (
                                <BandItem key={band.bandId} band={band} />
                            ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;
