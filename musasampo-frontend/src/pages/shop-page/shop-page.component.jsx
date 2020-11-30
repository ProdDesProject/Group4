import React from 'react';

import ALBUMS from '../../data/albums';

import AlbumPreview from '../../components/album-preview/album-preview.component';
import './shop-page.styles.scss';


class ShopPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  //when clicket sign in button: post-login and returns token if succeeded.
  handleSubmit = async event => 
  {
    event.preventDefault();
   
  };

  
  //render render stuff
  render() {
    return (
     
    );
  }
}

export default ShopPage;








/*
const ShopPage = (props) => (
  <div className='shop-page'>
    {sortedAlbums.map(({ albumId, ...otherAlbumProps }) => (
      <AlbumPreview key={albumId} {...otherAlbumProps} />
    ))}
  </div>
)

const albums = ALBUMS;

albums.sort((a, b) => a.albumGenre.localeCompare(b.albumGenre));
const sortedAlbums = [];

if (albums[0]) {

  const oneGenre = { title: 'genreName', albums: [] };
  oneGenre.title = albums[0].albumGenre;
  oneGenre.albums.push(albums[0])

  for (var i = 1; i < albums.length; i++) {

    if (albums[i].albumGenre === albums[i - 1].albumGenre) {
      oneGenre.albums.push(albums[i])

    } else {
      const oneGenreCopy = { ...oneGenre };
      sortedAlbums.push(JSON.parse(JSON.stringify(oneGenreCopy)));
      oneGenre.title = albums[i].albumGenre;
      oneGenre.albums.length = 0;
      oneGenre.albums.push(albums[i]);
    }
  }
  const oneGenreCopy = { ...oneGenre };
  sortedAlbums.push(JSON.parse(JSON.stringify(oneGenreCopy)));
  console.log(JSON.stringify(sortedAlbums));
}









export default ShopPage;*/