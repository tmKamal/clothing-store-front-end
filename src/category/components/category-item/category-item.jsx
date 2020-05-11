import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../../common/components/UIElements/avatar/avatar";
import Card from "../../../common/components/UIElements/card/card";
import "./category-item.scss"

const CategoryItem = props => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}/items`}>
          <div className="user-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default CategoryItem;