import React, { Fragment, useState } from 'react';

import CustomButton from '../custom-button/custom-button.component';
import SignInButton from '../custom-button/custom-button.component';
import { Link, withRouter } from 'react-router-dom';
import '../custom-button/custom-button.component';
import AlbumItem from '../album-item/album-item.component';

import './home-new.styles.scss';

var base64 = require('base-64');

class HomeNew extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null

    };
  }

  /**
   * RENDER
   */

  render() {
    return (
      <div className='container-24'>
        <div className='contents'>
        <div className='text'>
          Newest Albums
          </div>
          <div className='tunerIcon'>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(HomeNew);