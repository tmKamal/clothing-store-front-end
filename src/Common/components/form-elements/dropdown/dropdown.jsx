import React from "react";
import "./dropdown.scss";


const Dropdown = (props) => {

  return (
    <div
      className={`form-control`}
    >
      <label htmlFor={props.id}>{props.label}</label>

      <select className="select-css" id={props.id} onChange={props.changer}>
        {props.menuArr.map((op) => (
          <option
            key={op.id}
            value={op.id}
            
          >{op.name} </option>
        ))}
        
      </select>
    </div>
  );
};

export default Dropdown;
