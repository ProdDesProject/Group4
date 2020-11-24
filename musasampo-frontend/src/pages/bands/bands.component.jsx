/*import React from 'react';

import SHOP_DATA from '../shop/shop.data.js';
import BandItem from '../../components/band/band.component';
import './bands.styles.scss';

// This is the page that opens when clicking a genre on the shop page

class AlbumPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bands: SHOP_DATA,
    };
  }

  render() {
    const { bands } = this.state;
    const genreName = this.props.match.params.genre;
    const band = bands
      .filter(genre => (
        genre.routeName.includes(String(genreName))),
      );
    return (
      <div className='band-page'>
        <h2 className='title'>{band[0].title}</h2>
        <div className='items'>

          {album[0].items.map((item) => (
            <AlbumItem key={item.id} item={item} routeName={genreName} />
          ))}

        </div>
      </div>
    );
  }
}

export default BandPage;*/