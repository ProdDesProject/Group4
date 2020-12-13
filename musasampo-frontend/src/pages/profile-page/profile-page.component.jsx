import React from 'react';

import AccountDetails from '../../components/profile-account-details/account-details.component';
import ProfileContent from '../../components/profile-content/profile-content.component';
import GetBandsByUserId from '../../components/profile bands/profile.bands.component';
import { withRouter } from 'react-router-dom';

import './profile-page.styles.scss';

//<Profile />
//<ProfileContent />
const ProfilePage = () => (
  <div className='profile'>
    <AccountDetails />
    <ProfileContent />
    <GetBandsByUserId/>
  </div>
);

export default withRouter(ProfilePage);
