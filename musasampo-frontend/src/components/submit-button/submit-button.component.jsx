import React from 'react';

import './submit-button.styles.scss';

const SubmitButton = ({
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

export default SubmitButton;
