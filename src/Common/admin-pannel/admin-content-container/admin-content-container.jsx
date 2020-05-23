import React from "react";
const ContentContainer = (props) => {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center page-content-body-wrapper">
        <div className="main_content col-lg-11 col-md-12 col-sm-12 ">
        {props.children}
        </div>
      </div>
    </div>
  );
};
export default ContentContainer;
