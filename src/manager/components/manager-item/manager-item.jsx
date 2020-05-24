import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../../Common/components/UIElements/avatar/avatar";
import Card from "../../../Common/components/UIElements/card/card";
import "./manager-items.scss";

const UserItems = props => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to="/all-managers">
          <div className="user-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h4>{props.email}</h4>
            
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItems;
