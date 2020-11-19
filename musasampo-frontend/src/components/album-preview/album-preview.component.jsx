import React from 'react';
import { withRouter } from 'react-router-dom';

import AlbumItem from '../album-item/album-item.component';

import './album-preview.styles.scss';

export const AlbumPreview = ({
  title,
  albums,
  history,
  match,
}) => (
    <div className="album-preview">
      <h1 className='title' onClick={() => history.push(`${match.path}/albums/genre/${title.toLowerCase()}`)}>
        {title.toUpperCase()}
      </h1>
      <div className='preview'>
        {albums
          .filter((album, idx) => idx < 4)
          .map(album => (
            <AlbumItem key={album.albumId} album={album} routeName={title.toLowerCase()} />
          ))}
      </div>
    </div>
  );

export default withRouter(AlbumPreview);
