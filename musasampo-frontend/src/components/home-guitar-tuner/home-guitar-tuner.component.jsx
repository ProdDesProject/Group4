import React from 'react';

import { Link, withRouter } from 'react-router-dom';
import '../custom-button/custom-button.component';

import './home-guitar-tuner.styles.scss';

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
          Tune your string istuments
          </div>
          <div className='tunerIcon'>
          </div>
        </div>
      </Link>
    );
  }
}

export default withRouter(HomeGuitarTuner);