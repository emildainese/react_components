import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ListItem from './ListItem/ListItem';
import Button from '../Button/Button';
import './List.scss';

const List = (props) => {
  const state = props.items
    ? props.items
    : [
        { id: 1, text: 'JavaScript' },
        { id: 2, text: 'React' },
        { id: 3, text: 'Node.js' },
        { id: 4, text: 'Angular' },
      ];

  const [items, setItems] = useState(state);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(items));
  }, [items]);

  const onDeleteItem = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const onAddItem = () => {
    const text = prompt('Enter some text');
    if (text) {
      setItems((items) => [...items, { id: Math.random().toFixed(6), text }]);
    }
  };

  return (
    <div className="container" style={{ marginTop: '1rem' }}>
      <ul className="list-group">
        <TransitionGroup className="list">
          {items.map((item) => (
            <CSSTransition timeout={500} key={item.id} classNames="item">
              <ListItem
                ripple
                onDeleteItem={onDeleteItem}
                text={item.text}
                id={item.id}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ul>
      <Button className="btn btn-primary" onClick={onAddItem}>
        Add Item
      </Button>
    </div>
  );
};

List.propsType = {
  items: PropTypes.array.isRequired,
};

export default List;
