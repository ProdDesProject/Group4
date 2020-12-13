import React from 'react';
import './switch.styles.scss';

{/*reusable component for the switch that replaces the checkbox*/ }
const Switch = ({ handleChange, label, ...otherProps }) => (
    <div class="switch">
        <input type="checkbox" onChange={handleChange} {...otherProps}/>
        <label for="switch"></label>
    </div>
    );
  
export default Switch;