import React from 'react';

import './form-input.styles.scss';

{/*reusable component for the login and signup components*/ }
const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className='group'>
    <input className='form-input' onChange={handleChange} {...otherProps} />
    {label ? (
      <label
        className={`${otherProps.value.length ? 'shrink' : ''
          } form-input-label`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
