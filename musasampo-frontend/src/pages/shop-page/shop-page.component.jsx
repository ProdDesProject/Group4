import React from 'react';

//import ALBUMS from '../../data/albums';
//import AlbumPreview from '../../components/album-preview/album-preview.component';

import './shop-page.styles.scss';
import band from '../../components/data/band';
import album from '../../components/data/album';
import { stringify } from 'querystring';
import fetchAlbums from '../../services/albums-in-service'

class ShopPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bandName: "",
      bandLogo: "",
      country: ""
    };

  }

  async getBands()
  {
    var bands = await band.getAllBands();
    console.log(bands);
    let counter = 0;
    //for loop to get all object in bands
    for (let i = 0; i < bands.bands.length; i++) 
    {
      var bandId = bands.bands[i].bandId;
      var userId =  bands.bands[i].userId;
      var nsfw =  bands.bands[i].nsfw;
      var bandName = bands.bands[i].bandName;
      var bandLogo =  bands.bands[i].bandLogo;
      var country =  bands.bands[i].country;

      counter++;
    }

    //set right picture path
    var result = "http://localhost:9000/upload/imagepath.png/"+bandLogo;

    //state is changed so it starts rerender()
    this.setState({ bandName: bandName,bandLogo: result,country:country});
  }

  makeComponent(bandName,bandLogo,country)
  {
    return <div>
      <div className='bandLogo'>
      <h4>{bandName}</h4>
      <h4>{bandLogo}</h4>
      <h4>{country}</h4>
      <img className='img' src={this.state.bandLogo} />
      </div>
      </div>
  }

  async componentDidMount()
  {
    this.getBands()
    //this.makeComponent()
  }

  //render render stuff
  render() {
    const {bandName,bandLogo,country} = this.state;

    return (
      this.makeComponent(bandName,bandLogo,country)
    );
  }
}

export default ShopPage;
/*const ShopPage = (props) => (
  <div className='shop-page'>
    {sortedAlbums.map(({ albumId, ...otherAlbumProps }) => (
      <AlbumPreview key={albumId} {...otherAlbumProps} />
    ))}
  </div>
)*/

//{/* Really stupid code to put the data I receive in the needed format for the AlbumPreview component  */ }


/*
const albums = await fetchAlbums.fetchAlbums();

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


export default ShopPage;
*/





