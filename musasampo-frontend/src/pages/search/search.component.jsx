
import React from 'react';

import SHOP_DATA from '../shop/shop.data.js';

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
        this.setState({ albums: SHOP_DATA });
    }

    onSearchChange = event => {
        this.setState({ searchField: event.target.value });
        console.log(JSON.stringify(this.state.albums))
    };

    render() {
        const { albums, searchField } = this.state;
        const filteredAlbums = albums.filter(album =>
            album.items.albumName.toLowerCase().includes(searchField.toLowerCase())
        );

        return (
            <div className='search-page'>
                <SearchBox onSearchChange={this.onSearchChange} />

                <div className='preview'>
                    {filteredAlbums
                        .map(item => (
                            <AlbumItem key={item.id} item={item} />
                        ))}
                </div>

            </div>
        );
    }
}

export default Search;
