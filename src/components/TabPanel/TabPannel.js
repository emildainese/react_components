import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './TabPannel.module.scss';
import TabHeader from './TabHeader/TabHeader';
import Tabs from './Tabs/Tabs';

const tabHeader = [
  { name: 'Result', active: true },
  { name: 'Histogram', active: false },
  { name: 'Chart', active: false },
];

const tabs = [
  { title: 'Result', content: 'Display the result' },
  { title: 'Hystogram', content: 'Histogram of data distribution' },
  { title: 'Chart', content: 'Chart of data' },
];

const TabPannel = (props) => {
  const [header, setHeader] = useState(props.header ? props.header : tabHeader);
  const [active, setActive] = useState(header.map((item) => item.active));

  const setActiveItem = (name) => {
    let updatedHeader = header.map((item) => {
      if (item.name === name) {
        item.active = true;
      } else {
        item.active = false;
      }
      return item;
    });
    setHeader(updatedHeader);
    setActive(header.map((item) => item.active));
  };

  return (
    <div className={classes.TabPannel}>
      <TabHeader
        items={header}
        setActiveItem={setActiveItem}
        highlighter={props.highlighter}
      />
      <Tabs tabs={tabs} active={active} />
    </div>
  );
};

TabPannel.propTypes = {
  header: PropTypes.array.isRequired,
  tabs: PropTypes.array.isRequired,
  highlighter: PropTypes.bool,
};

export default TabPannel;
