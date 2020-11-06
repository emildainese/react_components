import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './AccordionItem.module.scss';

const AccordionItem = (props) => {
  const [active, setActive] = useState(false);

  const toggleActive = () => {
    setActive(!active);
  };

  return (
    <li onClick={toggleActive}>
      <button className={classes.AccordionControl}>
        <span className={classes.AccordionTitle}>
          {props.title}
          <i
            className={`fas fa-caret-down ${classes.Arrow} ${
              active ? classes.Active : ''
            }`}
          ></i>
        </span>
        <p
          className={`${classes.AccordionPanel} ${
            active ? classes.ActivePanel : ''
          }`}
          style={{ height: `${active ? `${props.height}rem` : 0}` }}
        >
          {props.content}
        </p>
      </button>
    </li>
  );
};

AccordionItem.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
};

export default AccordionItem;
