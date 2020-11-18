
import React from 'react';

import ALBUMS from '../../data/albums';

import AlbumItem from '../../components/album-item/album-item.component';

import './genre-page.styles.scss';

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
    const album = albums
      .filter(genre => (
        genre.routeName.includes(String(genreName))),
      );
    return (
      <div className='album-page'>
        <h2 className='title'>{album[0].title}</h2>
        <div className='items'>

          {album[0].items.map((item) => (
            <AlbumItem key={item.id} item={item} routeName={genreName} />
          ))}

        </div>
      </div>
    );
  }
}

export default AlbumPage;
