import React from "react";
import classes from "./ListItem.module.scss";

const ListItem = (props) => {
  const { name, email, age } = props.data;
  return (
    <div className={`${classes.Item} ${props.active ? classes.isActive : ""}`}>
      <div className={classes.Id}>{props.idx}</div>
      <img
        src={props.url ? props.url : imgUrl}
        alt={props.alt ? props.alt : "Image"}
      />
      <div className={classes.Content}>
        <h4> {name} </h4> <small> {email} </small>
      </div>
      <div className={classes.Footer}> {age} </div>
    </div>
  );
};

export default ListItem;

const imgUrl =
  "https://cdn4.vectorstock.com/i/1000x1000/46/73/person-gray-photo-placeholder-man-material-design-vector-23804673.jpg";
