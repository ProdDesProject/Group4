import React from 'react';

import AccountDetails from '../../components/profile-account-details/account-details.component';
import GetBandsByUserId from '../../components/profile bands/profile.bands.component';
import { Link, withRouter } from 'react-router-dom';
import CustomButton from '../../components/custom-button/custom-button.component';

import './profile-page.styles.scss';

//<Profile />
//<ProfileContent />
const ProfilePage = () => (
  <div className='profile'>
    <AccountDetails />

    <div className="addBandButton">
      <Link to="/profile/newband" className='button'>
        <CustomButton> Add a Band </CustomButton>
      </Link>
    </div>

    <GetBandsByUserId />
  </div>
);

export default withRouter(ProfilePage);
