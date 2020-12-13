import React from 'react';

//import ALBUMS from '../../data/albums';
//import BANDS from '../../data/bands';

import SearchBox from '../../components/search-box/search-box.component';
import AlbumItem from '../../components/album-item/album-item.component';
import BandItem from '../../components/band-item/band-item.component';

import getAlbums from '../../services/album/albums-in-service.js';
import getBands from '../../services/band/get-band-service.js';

import './shop-page.styles.scss';

{/* Search page */ }

class ShopPage extends React.Component {
    constructor() {
        super();
        {/* Empty array for filtered albums and bands + shopPagefield input  */ }
        this.state = {
            albums: [],
            bands: [],
            pictures: [],
            searchField: ''
        };
    }

    /* add all albums from data to array  */
    async componentDidMount() {

        let ALBUMS = await getAlbums();
        ALBUMS = await ALBUMS.json();

        let BANDS = await getBands();
        BANDS = await BANDS.json();

        this.setState({ albums: ALBUMS.albums });
        this.setState({ bands: BANDS.bands });
        
        var BandsAndPictures = [];
        BandsAndPictures = BANDS.bands;

        var AlbumsAndPictures = [];
        AlbumsAndPictures = ALBUMS.albums;

        //Get url for getting picture for bands
        for (var i=0;i<BANDS.bands.length;i++)
        {
            var url = 'http://localhost:9000/upload/imagepath.png/'+BANDS.bands[i].bandName+'/'+ BANDS.bands[i].bandLogo;
            //Save url to array:
            BandsAndPictures[i].bandLogo = url;
        };

         //Get url for getting picture for albums
        for (var i=0;i<ALBUMS.albums.length;i++)
        {
            ///imagepath.png/album/:band/albums/:image
            var url = 'http://localhost:9000/upload/imagepath.png/'+ BANDS.bands[i].bandName+'/albums/'+ALBUMS.albums[i].albumPicture;
            //Save url to array:
            AlbumsAndPictures[i].albumPicture = url;
        };

        //change albumName and bandName for page (%20 changes to spaces)
        for (var i=0;i<ALBUMS.albums.length;i++)
        {
            AlbumsAndPictures[i].albumName = decodeURIComponent(AlbumsAndPictures[i].albumName);
            BandsAndPictures[i].bandName = decodeURIComponent(BandsAndPictures[i].bandName);
        };

        this.setState({ bands: BandsAndPictures });
        this.setState({ albums: AlbumsAndPictures });
    }

    /* change search field state to search field input  */
    onSearchChange = event => {
        this.setState({ searchField: event.target.value });
    };

    render() {
        const { albums, bands, searchField } = this.state;

        {/* filter albums and bands with search field value  */ }
        const filteredAlbums = albums.filter(album =>
            album.albumName.toLowerCase().includes(searchField.toLowerCase())
        );
        const filteredBands = bands.filter(band =>
            band.bandName.toLowerCase().includes(searchField.toLowerCase())
        );

        return (
            <div className="search-page">
                <SearchBox onSearchChange={this.onSearchChange} />
                <div className="search-preview">
                    <h2 className='title'>
                        ALBUMS
                    </h2>

                    {/* Display filtered albums  */}
                    <div className='items'>
                        {filteredAlbums
                            .filter((album, idx) => idx < 5)
                            .map(album => (
                                <AlbumItem className="items" key={album.albumId} album={album} routeName={album.albumGenre.toLowerCase()} />
                            ))}
                    </div>
                </div>

                {/* display filtered bands  */}
                <div className="search-preview">
                    <h2 className='title'>
                        BANDS
                    </h2>
                    <div className='items'>
                        {filteredBands
                            .filter((band, idx) => idx < 5)
                            .map(band => (
                                <BandItem key={band.bandId} band={band} />
                            ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default ShopPage;












/*
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
*/
/*const ShopPage = (props) => (
  <div className='shop-page'>
    {sortedAlbums.map(({ albumId, ...otherAlbumProps }) => (
      <AlbumPreview key={albumId} {...otherAlbumProps} />
    ))}
  </div>
)*/



















//{/* Really stupid code to put the data I receive in the needed format for the AlbumPreview component  */ }


/*
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


export default ShopPage;
*/





