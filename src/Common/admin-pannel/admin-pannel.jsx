import React, { useState } from "react";
import SideBar from "./admin-sidebar/admin-sidebar";
import AdminNavigation from "./admin-navigation/admin-navigation";
import "./admin-pannel.scss";

const AdminPannel = (props) => {
  const [opener, setOpener] = useState(true);
  const sidebarOpener = () => {
    setOpener(!opener);
    document.getElementById("wrapper").classList.toggle("toggled");
  };
  return (
    <React.Fragment>
      <SideBar></SideBar>
      <AdminNavigation tog={sidebarOpener}></AdminNavigation>
      {/* <div id="page-content-wrapper">
        <div className="container-fluid">
          <div className="page-content-body-wrapper">
            <div className="row info-cards-wrapper">
              <InfoCard></InfoCard>
              <InfoCard></InfoCard>
              <InfoCard></InfoCard>
              <InfoCard></InfoCard>
            </div>
          </div>
        </div>
      </div> */}

      
    </React.Fragment>
  );
};
export default AdminPannel;
