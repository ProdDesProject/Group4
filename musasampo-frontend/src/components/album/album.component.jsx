import React, { Component } from 'react';

import './album.styles.scss';

import fetchAlbumsByalbumId from '../../services/album/albums-by-albumid-service';
import getBandsBandId from "../../services/band/get-band-by-bandId-servise"

export default class SimpleTabs extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      album: {},
      logoPath:""
  };

  }

  async componentDidMount()
  {
    //album = await fetchAlbumsByalbumId()
    var albumId = this.props.match.params.albumId;
    console.log(albumId);

    var album = await(await fetchAlbumsByalbumId(albumId)).json();
    
    console.log(album);
    console.log(album[0].bandId);

    var band = await(await getBandsBandId(album[0].bandId)).json();

    console.log(band);
    console.log(band[0].bandName);

    this.setState({album:album[0]});

    this.setState({logoPath: "http://localhost:9000/upload/imagepath.png/" + band[0].bandName + "/" + band[0].bandLogo})
    
    console.log(this.state.album.albumGenre);
  }
  
  render()
  {
    return (
      <div>
  
          <div className='titles'>
  
            <div className='title'>
              {decodeURIComponent( this.state.album.albumName)}
            </div>
  
            <div className='subtitle'>
              
            </div>
  
          </div>
  
          <div className='description'>
  
            <div className='descriptor'>
              <dt>Genre:</dt>
              <dt>Release date:</dt>
            </div>
  
            <div className='infotext'>
              <dt> {decodeURIComponent( this.state.album.albumGenre)}</dt>
              <dt> {this.state.album.albumLaunchDate}</dt>
            </div>
  
            <div className='albumImage' style={{
                    backgroundImage: `url(${this.state.logoPath})`
                }}>
              
            </div>
  
          </div>
      </div>
    );
  };
}