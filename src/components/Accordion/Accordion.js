import React from 'react';
import PropTypes from 'prop-types';
import classes from './Accordion.module.scss';
import AccordionItem from './AccordionItem/AccordionItem';

const Accordion = (props) => {
  const items = accordionConfig.map((item, idx) => (
    <AccordionItem
      key={idx}
      title={item.title}
      content={item.content}
      height={item.height}
    />
  ));

  return <ul className={classes.Accordion}>{items}</ul>;
};

Accordion.propTypes = {
  items: PropTypes.object.isRequired,
};

export default Accordion;

const accordionConfig = [
  {
    title: 'Panel 1',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, ad?',
    height: 2,
  },
  {
    title: 'Panel2',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt voluptates asperiores consequuntur nostrum! Ratione, ducimus.',
    height: 3,
  },
  {
    title: 'Panel3',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt voluptates asperiores consequuntur nostrum! Ratione, ducimus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt voluptates asperiores consequuntur nostrum! Ratione, ducimus.',
    height: 4,
  },
];
