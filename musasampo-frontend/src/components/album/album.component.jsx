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
      album: {}
  };

  }

  async componentDidMount()
  {
    var album = this.props.location.state;
    console.log(album);
    this.setState({album: album});
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
                    backgroundImage: `url(${this.state.album.albumPicture})`
                }}>
              
            </div>
  
          </div>
      </div>
    );
  };
}