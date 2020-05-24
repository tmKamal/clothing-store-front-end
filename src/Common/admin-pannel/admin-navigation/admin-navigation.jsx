import React, { useState } from "react";

import AdminBackDrop from "../admin-backdrop/admin-backdrop";
const AdminNavigation = (props) => {
  const [userPopup, setUserPopup] = useState(false);
  const popupOpener = () => {
    setUserPopup(!userPopup);
    console.log("cant be happnes");
  };
  const popupCloser = () => {
    console.log("clicked");
    setUserPopup(false);
  };
  return (
    <React.Fragment>
      {userPopup && <AdminBackDrop click={popupCloser}></AdminBackDrop>}
      <div className="row">
        <div className="col-sm-12 page-nav">
          <div className="container">
            <button className="admin-navigation__menu-btn" onClick={props.tog}>
              <i className="material-icons crMenu">menu</i>
            </button>
            <ul>
              <li>
                <a href="contactus.html">
                  <i className="material-icons top-nav-icon">search</i>
                </a>
              </li>
              <li>
                <a href="index.html">
                  <i className="material-icons top-nav-icon">
                    notifications_none
                  </i>
                </a>
              </li>
              <li className="drop-user" onClick={popupOpener}>
                <a href="#">
                  User
                  <i className="material-icons top-nav-icon">account_circle</i>
                </a>

                {userPopup && (
                  <div className="popup-user ">
                    <ul>
                      <li>
                        <a href="#">Profile</a>
                      </li>
                      <li>
                        <a href="#">Sign-Out</a>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default AdminNavigation;
