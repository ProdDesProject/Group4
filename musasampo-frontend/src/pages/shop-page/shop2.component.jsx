import React from 'react';
import { Route } from 'react-router-dom';
import ALBUMS from '../../data/albums';

import AlbumsOverview from '../../components/albums-overview/albums-overview.component';
import AlbumPage from '../albums/album.component';
import './shop-page.styles.scss';

// FOR TEST PURPOSES
// https://medium.com/better-programming/how-to-pass-multiple-route-parameters-in-a-react-url-path-4b919de0abbe#:~:text=Route%20params%20are%20parameters%20whose,data%20based%20on%20the%20parameter.

class ShopPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            albums: ALBUMS
        };
    }

    render() {
        const { albums } = this.state;
        return (
            <div className='shop-page'>
                <Route exact path={`${this.props.match.path}`} render={(props) => (
                    <AlbumsOverview {...props} albums={albums} />
                )} />
                <Route exact path={`${this.props.match.path}/:albumId`} render={(props) => (
                    <AlbumPage {...props} albums={albums} />
                )} />
                <Route exact path={`${this.props.match.path}/:albumId/:itemId`} render={(props) => (
                    <AlbumPage {...props} albums={albums} />
                )} />
            </div>
        );
    }
}

export default ShopPage;