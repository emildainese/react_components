import React from 'react';
import classes from './Tab.module.scss';

//Può esserci di tutto all'interno
const Tab = (props) => {
  return (
    <div className={`${classes.Tab} ${props.active ? classes.ActiveTab : ''}`}>
      <h3 className={classes.TabHeader}>{props.title}</h3>
      <p className={classes.TabContent}>{props.content}</p>
    </div>
  );
};

export default Tab;
