import React from "react";
const AdminWrapper = (props) => {
  return (
    <div id="wrapper" className="toggled"> 
        {props.children}
        
    </div>
  );
};
export default AdminWrapper;