import React, { Fragment, useState } from 'react';

import { Link, withRouter } from 'react-router-dom';
import '../custom-button/custom-button.component';

import './home-guitar-tuner.styles.scss';

var base64 = require('base-64');

class HomeGuitarTuner extends React.Component {
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
      <Link to="/guitartuner" className='container-27'>
        <div className='contents'>
        <div className='text'>
          Tune your string instruments
          </div>
          <div className='tunerIcon'>
          </div>
        </div>
      </Link>
    );
  }
}

export default withRouter(HomeGuitarTuner);