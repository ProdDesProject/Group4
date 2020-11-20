import React from 'react';

import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import './search-box.styles.scss';

const SearchBox = props => (
    //    <input
    // className='search-box'
    //type='search'
    //placeholder='search musasampo'
    //onChange={props.onSearchChange}
    ///>

    <div>
        <div className="root">
            <InputBase
                className="input"
                placeholder="Search Musasampo"
                inputProps={{ 'aria-label': 'search musasamp' }}
                onChange={props.onSearchChange}
            />
            <IconButton type="submit" className="icon-button" aria-label="search">
                <SearchIcon />
            </IconButton>
        </div>
    </div>
);

export default SearchBox;

