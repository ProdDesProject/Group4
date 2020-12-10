import React, { Fragment, useState } from 'react';

import { Link, withRouter } from 'react-router-dom';
import '../custom-button/custom-button.component';

import './home-chat.styles.scss';

var base64 = require('base-64');

class HomeChat extends React.Component {
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
      <Link to="/chat" className='container-20'>
        <div className='contents'>
        <div className='text'>
          Chat with other users
          </div>
          <div className='chatIcon'>
          </div>
        </div>
      </Link>
    );
  }
}

export default withRouter(HomeChat);