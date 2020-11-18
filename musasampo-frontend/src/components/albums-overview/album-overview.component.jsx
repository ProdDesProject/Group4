import React from 'react';

import ALBUMS from '../../data/albums';

import AlbumPreview from '../album-preview/album-preview.component';

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
        {albums.map(({ id, ...otherAlbumProps }) => (
          <AlbumPreview key={id} {...otherAlbumProps} />
        ))}
      </div>
    );
  }
}

export default ShopPage;