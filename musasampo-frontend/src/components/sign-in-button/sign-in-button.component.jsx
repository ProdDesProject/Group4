import React from 'react';

import './sign-in-button.styles.scss';

const SignInButton = ({
  children,
  inverted,
  ...otherProps
}) => (
    <button
      className={`${inverted ? 'inverted' : ''} sign-in-button`}
      {...otherProps}
    >
      {children}
    </button>
  );

  //comment

export default SignInButton;
