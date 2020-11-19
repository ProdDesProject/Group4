import React from 'react';

<<<<<<< HEAD:musasampo-frontend/src/pages/albums/albums.component.jsx
import SHOP_DATA from '../shop/shop.data.js';
import AlbumItem from '../../components/album-item/album-item.component';
import './albums.styles.scss';
=======
import ALBUMS from '../../data/albums';

import AlbumItem from '../../components/album-item/album-item.component';

import './genre-page.styles.scss';
>>>>>>> main:musasampo-frontend/src/pages/genre-page/genre-page.component.jsx

// This is the page that opens when clicking a genre on the shop page

class AlbumPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      albums: ALBUMS,
    };
  }

  render() {
    const { albums } = this.state;
    const genreName = this.props.match.params.genre;

    return (
      <div className='album-page'>
        <h2 className='title'>{genreName.toUpperCase()}</h2>
        <div className='items'>
          {albums
            .filter(album => album.albumGenre.toLowerCase() === genreName.toLowerCase())
            .map((album) => (
              <AlbumItem key={album.albumId} album={album} routeName={genreName} />
            ))}

        </div>
      </div>
    );
  }
}

export default AlbumPage;