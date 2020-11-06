import React, { Fragment } from "react";
import imm from "../../assets/image/imm.jpg";
import Ripple from "../Button/Ripple/Ripple";
import Button from "../Button/Button";
import "./Card.scss";

const CardContent = (props) => {
  return (
    <Fragment>
      <div className="card-header">
        <img src={props.src ? props.src : imm} alt="pc" />
        {props.ripple && <Ripple color="rgba(0,0,0,.5)" />}
      </div>
      <div className="card-body">
        <h2 className="card-title">{props.title}Card Title</h2>
        <p className="card-content">
          {props.body}
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis vero
          accusantium inventore deserunt minima eligendi.
        </p>
      </div>
      <div className="card-footer">
        <div className="card-action">
          <Button className="btn btn-default" ripple color="rgba(0,0,0,.5)">
            Show
          </Button>
          {props.footer}
        </div>
      </div>
    </Fragment>
  );
};

const Card = (props) => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      <CardContent {...props} />
    </div>
  );
};

export default Card;
