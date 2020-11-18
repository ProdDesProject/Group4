import React from 'react';
import { withRouter } from 'react-router-dom';

import AlbumItem from '../album-item/album-item.component';

import './album-preview.styles.scss';

// This is for each row on the shop page, such as Finnish, Classic, etc.

export const AlbumPreview = ({
  title,
  items,
  history,
  match,
  routeName
}) => (
    <div className="album-preview">
      <h1 className='title' onClick={() => history.push(`${match.path}/${routeName}`)}>
        {title.toUpperCase()}
      </h1>
      <div className='preview'>
        {items
          .filter((item, idx) => idx < 4)
          .map(item => (
            <AlbumItem key={item.id} item={item} routeName={routeName} />
          ))}
      </div>
    </div>
  );

export default withRouter(AlbumPreview);
