import React, { useState, useEffect } from 'react';
import classes from './TabHeader.module.scss';

import TabLink from './TabLink/TabLink';

const TabHeader = (props) => {
  const [widths, setWidths] = useState([]);

  const refs = [];
  const tabHeader = props.items.map((item, idx) => {
    refs[idx] = React.createRef();
    return (
      <TabLink
        name={item.name}
        key={idx}
        id={item.name}
        active={item.active}
        setActiveItem={props.setActiveItem}
        tabRef={refs[idx]}
      />
    );
  });

  useEffect(() => {
    setWidths(refs.map((ref) => ref.current.offsetWidth));
    // eslint-disable-next-line
  }, []);

  const highlighterStep = props.items.findIndex((item) => item.active === true);

  const offset = widths.reduce((acc, curr, idx) => {
    if (idx < highlighterStep) {
      acc += curr;
    }
    return acc;
  }, 0);

  return (
    <div className={classes.TabHeader}>
      {tabHeader}
      {props.highlighter && (
        <span
          className={classes.Highlighter}
          style={{
            width: `${widths[highlighterStep]}px`,
            transform: `translateX(${offset}px)`,
          }}
        ></span>
      )}
    </div>
  );
};

export default TabHeader;
