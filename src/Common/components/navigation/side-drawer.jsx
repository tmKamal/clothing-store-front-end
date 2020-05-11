import React from "react";
import ReactDom from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./side-drawer.scss";

const SideDrawer = (props) => {
  const drawerContent = (
    <CSSTransition in={props.show} timeout={200} classNames='slide-in-left' mountOnEnter unmountOnExit>
      <aside onClick={props.onClick} className="side-drawer">{props.children}</aside>
    </CSSTransition>
  );/*  You could find the related css to this transition in index.css  */
  return ReactDom.createPortal(
    drawerContent,
    document.getElementById("drawer-hook")
  );
  //This portal will help to render this drawer insider the drawer hook div element inside index.html
};

export default SideDrawer;
