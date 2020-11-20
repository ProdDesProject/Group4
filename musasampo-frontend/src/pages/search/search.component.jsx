
import React from 'react';

import ALBUMS from '../../data/albums';
import BANDS from '../../data/bands';

import SearchBox from '../../components/search-box/search-box.component';
import AlbumItem from '../../components/album-item/album-item.component';
import BandItem from '../../components/band-item/band-item.component';

import './search.styles.scss';

class Search extends React.Component {
    constructor() {
        super();

        this.state = {
            albums: [],
            bands: [],
            searchField: ''
        };
    }

    componentDidMount() {
        this.setState({ albums: ALBUMS });
        this.setState({ bands: BANDS })
    }

    onSearchChange = event => {
        this.setState({ searchField: event.target.value });
    };

    render() {
        const { albums, bands, searchField } = this.state;
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

                    <div className='items'>
                        {filteredAlbums
                            .filter((album, idx) => idx < 4)
                            .map(album => (
                                <AlbumItem className="items" key={album.albumId} album={album} routeName={album.albumGenre.toLowerCase()} />
                            ))}
                    </div>
                </div>

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
