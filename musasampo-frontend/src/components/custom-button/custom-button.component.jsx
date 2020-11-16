import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({
  children,
  inverted,
  ...otherProps
}) => (
    <button
      className={`${inverted ? 'inverted' : ''} custom-button`}
      {...otherProps}
    >
      {children}
    </button>
  );

  //comment

export default CustomButton;
