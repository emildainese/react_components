import React from "react";
import classes from "./Separator.module.scss";

const Separartor = (props) => {
  return <div className={classes.Separator} ref={props.separatorRef}></div>;
};

export default Separartor;
