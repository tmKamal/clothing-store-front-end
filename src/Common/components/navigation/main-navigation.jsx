import React, {useState } from "react";
import { Link } from "react-router-dom";
import MainHeader from "./main-header";
import NavLinks from "./nav-links";
import SideDrawer from "./side-drawer";
import Backdrop from './backdrop';

import "./main-navigation.scss";

const MainNavigation = (props) => {

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const drawerOpener = () => {
    setDrawerIsOpen(true);
  };
  
  const drawerCloser=()=>{
    setDrawerIsOpen(false);
  }
  
  return (
    <React.Fragment>
      
        <SideDrawer onClick={drawerCloser} show={drawerIsOpen}>
          <nav className="main-navigation__drawer-nav">
            <NavLinks></NavLinks>
          </nav>
        </SideDrawer>
      
      {drawerIsOpen?(
        <Backdrop onClick={drawerCloser}></Backdrop>
      ):null}
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={drawerOpener}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Clothing Store</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks></NavLinks>
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};
export default MainNavigation;
