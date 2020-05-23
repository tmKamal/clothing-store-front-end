import React from 'react';
const InfoCard =props=>{
    return (<div className="col-xl-3 col-md-6  mb-2">
    <div className="info-card-container">
      <div className=" info-card-header row">
        <div className="col-3 info-card-icon">
          <i className="material-icons info-card-icon-customized">
            attach_money
          </i>
        </div>
        <div className="col-9 info-card-title">
          <h5>Revenue</h5>
          <h3>10,000</h3>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-10 info-card-footer">
          <i className="material-icons info-card-footer-icon">
            calendar_today
          </i>
          <span>This Month</span>
        </div>
      </div>
    </div>
  </div>)
}
export default InfoCard;