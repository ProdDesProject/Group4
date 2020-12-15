
import React from 'react';
import './switch.styles.scss';

{/*reusable component for the switch that replaces the checkbox*/ }
const Switch = ({ checked, onChange, label, ...otherProps }) => 
{

    return (
    <div class="switch">
        <input 
            type = "checkbox" 
            checked = {checked}
            onChange = {(e) => onChange(e.target.checked)} 
            {...otherProps}
        />
        <label htmlFor="switch"></label>
    </div>
    );
};
  
export default Switch;