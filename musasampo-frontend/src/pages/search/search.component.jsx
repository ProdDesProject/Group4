
import React from 'react';

import ALBUMS from '../../data/albums';

import SearchBox from '../../components/search-box/search-box.component';
import AlbumItem from '../../components/album-item/album-item.component';

import './search.styles.scss';

class Search extends React.Component {
    constructor() {
        super();

        this.state = {
            albums: [],
            searchField: ''
        };
    }

    componentDidMount() {
        this.setState({ albums: ALBUMS });
    }

    onSearchChange = event => {
        this.setState({ searchField: event.target.value });
    };

    render() {
        const { albums, searchField } = this.state;
        const filteredAlbums = albums.filter(album =>
            album.albumName.toLowerCase().includes(searchField.toLowerCase())
        );

        return (
            <div className='search-page'>
                <SearchBox onSearchChange={this.onSearchChange} />

                <div className='preview'>
                    {filteredAlbums
                        .map(album => (
                            <AlbumItem key={album.albumId} album={album} routeName={album.albumGenre.toLowerCase()} />
                        ))}
                </div>

            </div>
        );
    }
}

export default Search;
