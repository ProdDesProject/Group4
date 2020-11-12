import React from 'react';

import SHOP_DATA from './shop.data.js';

import AlbumPreview from '../../components/album-preview/album-preview.component';
import './shop.styles.scss';

class ShopPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      albums: SHOP_DATA
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