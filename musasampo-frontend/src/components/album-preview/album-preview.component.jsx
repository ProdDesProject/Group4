import React from 'react';
import { withRouter } from 'react-router-dom';

import AlbumItem from '../album-item/album-item.component';

import './album-preview.styles.scss';

{/* This is for each row on the shop page, such as Finnish, Classic, etc. */ }

export const AlbumPreview = ({
  title,
  albums,
  history,
  match,
}) => (
    <div className="album-preview">
      {/* onClick at genre title opens overview of all albums inside that genre */}
      <h1 className='title' onClick={() => history.push(`${match.path}/albums/genre/${title.toLowerCase()}`)}>
        {title.toUpperCase()}
      </h1>
      <div className='items'>
        {/* only show a maximum of four albums for every genre */}
        {albums
          .filter((album, idx) => idx < 4)
          .map(album => (
            <AlbumItem key={album.albumId} album={album} routeName={title.toLowerCase()} />
          ))}
      </div>
    </div>
  );

export default withRouter(AlbumPreview);
