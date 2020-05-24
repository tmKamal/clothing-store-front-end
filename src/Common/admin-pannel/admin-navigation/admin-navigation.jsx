import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import AdminBackDrop from "../admin-backdrop/admin-backdrop";
const AdminNavigation = (props) => {
  const auth = useContext(AuthContext);
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
              <li className="drop-user" onClick={popupOpener}>
                
                  User
                  <i className="material-icons top-nav-icon">account_circle</i>
                

                {userPopup && (
                  <div className="popup-user ">
                    <ul>
                    <NavLink to="/">
                        <li>Home</li>
                      </NavLink>
                      <NavLink to="/">
                        <li onClick={auth.logout}>Sign-Out</li>
                      </NavLink>
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
