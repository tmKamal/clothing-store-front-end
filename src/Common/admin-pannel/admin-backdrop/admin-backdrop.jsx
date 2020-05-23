import React from "react";
import ReactDOM from "react-dom";
import "./admin-backdrop.scss";
const AdminBackDrop = (props) => {
  return ReactDOM.createPortal(<div className="admin-backdrop" onClick={props.click}></div>,document.getElementById('admin-backdrop-hook'));
};
export default AdminBackDrop;
