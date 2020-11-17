
import React from 'react';

import SHOP_DATA from '../shop/shop.data.js';

import SearchBox from '../../components/search-box/search-box.component';

import './search.styles.scss';

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            albums: SHOP_DATA,
        };
    }

    render() {
        const { albums } = this.state;

        return (
            <div className='search-page'>
                <SearchBox />
            </div>
        );
    }
}

export default Search;
