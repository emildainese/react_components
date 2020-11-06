import React from 'react';
import Tab from './Tab/Tab';

const Tabs = (props) => {
  const tabs = props.tabs.map((tab, idx) => {
    return (
      <Tab
        key={idx}
        title={tab.title}
        content={tab.content}
        active={props.active[idx]}
      />
    );
  });
  return tabs;
};

export default Tabs;
