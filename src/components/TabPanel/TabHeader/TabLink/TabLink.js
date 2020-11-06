import React from 'react';
import classes from './TabLink.module.scss';

const TabLink = (props) => {
  return (
    <button
      className={`${classes.TabLink} ${props.active ? classes.Active : ''}`}
      onClick={(e) => props.setActiveItem(e.target.id)}
      id={props.id}
      ref={props.tabRef}
    >
      {props.name}
    </button>
  );
};

export default TabLink;
