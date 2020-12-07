import React from 'react';

import AccountDetails from '../../components/profile-account-details/account-details.component';
import ProfileContent from '../../components/profile-content/profile-content.component';
import { withRouter } from 'react-router-dom';

import './profile-page.styles.scss';

//<Profile />

const ProfilePage = () => (
  <div className='profile'>
    <AccountDetails />
    <ProfileContent />
  </div>
);

export default withRouter(ProfilePage);
