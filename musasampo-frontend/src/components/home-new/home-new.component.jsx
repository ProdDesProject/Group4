import React from 'react';
import { withRouter } from 'react-router-dom';
import '../custom-button/custom-button.component';

import './home-new.styles.scss';

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