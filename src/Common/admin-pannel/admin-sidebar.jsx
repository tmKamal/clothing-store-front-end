import React,{useContext} from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from '../../context/auth-context';
const SideBar = (props) => {
    const auth = useContext(AuthContext);
  return (
    <div id="sidebar-wrapper">
      <div className="logo-side-bar ">
        <img src="img/logo.png" alt="logo"></img>
      </div>
      <div className="first-list-item">
        <ul className="navigation_section list-container">
          {((auth.role==='admin')||(auth.role==='manager'))&&<NavLink to="/users" exact>
            <li className="navigation_item">
              <div className="row">
                <div className="col-2 icon-containerSidebar">
                  <i className="material-icons crsidebarIcon">mail_outline</i>
                </div>
                <div className="col-10 sidebarText">ALL USERS</div>
              </div>
            </li>
          </NavLink>}

          {((auth.role==='admin')||(auth.role==='manager'))&&<NavLink to="/new-product" exact>
            <li className="navigation_item">
              <div className="row">
                <div className="col-2 icon-containerSidebar">
                  <i className="material-icons crsidebarIcon">mail_outline</i>
                </div>
                <div className="col-10 sidebarText">NEW PRODUCT</div>
              </div>
            </li>
          </NavLink>}
          {((auth.role==='admin')||(auth.role==='manager'))&&<NavLink to="/new-category" exact>
            <li className="navigation_item">
              <div className="row">
                <div className="col-2 icon-containerSidebar">
                  <i className="material-icons crsidebarIcon">mail_outline</i>
                </div>
                <div className="col-10 sidebarText">NEW CATEGORY</div>
              </div>
            </li>
          </NavLink>}
          {auth.role==='admin'&&<NavLink to="/new-manager" exact>
            <li className="navigation_item">
              <div className="row">
                <div className="col-2 icon-containerSidebar">
                  <i className="material-icons crsidebarIcon">mail_outline</i>
                </div>
                <div className="col-10 sidebarText">ADD MANAGER</div>
              </div>
            </li>
          </NavLink>}

          {auth.role==='manager'&&<NavLink to="/password/new" exact>

          <li className="navigation_item">
            <div className="row">
              <div className="col-2 icon-containerSidebar">
                <i className="material-icons crsidebarIcon">trending_up</i>
              </div>
              <div className="col-10 sidebarText">CHANGE PASSWORD</div>
            </div>
          </li>
          </NavLink>}
        </ul>
      </div>
      <div className="last-list-item">
        <ul className="navigation_section list-container">
        <NavLink to='/auth'>
						
          <li onClick={auth.logout} className="navigation_item">
            <div className="row">
              <div className="col-2 icon-containerSidebar">
                <i className="material-icons crsidebarIcon">exit_to_app</i>
              </div>
              <div className="col-10 sidebarText">LOG OUT</div>
            </div>
          </li>
					</NavLink>
        </ul>
      </div>
    </div>
  );
};
export default SideBar;
