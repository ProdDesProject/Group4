import React from 'react';

import './form-input2.styles.scss';

{/*reusable component for the login and signup components*/ }
const FormInput2 = ({ handleChange, label, ...otherProps }) => (
  <div className='group2'>
    <input className='form-input2' onChange={handleChange} {...otherProps} />
  </div>
);

export default FormInput2;
