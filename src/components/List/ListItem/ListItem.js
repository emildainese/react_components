import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button/Button';
import Ripple from '../../Button/Ripple/Ripple';
import './ListItem.scss';

const ListItem = (props) => {
  return (
    <li className="list-group-item">
      {props.ripple && <Ripple color="#ccc" />}
      {props.text}
      <Button
        className="btn btn-danger"
        onClick={() => props.onDeleteItem(props.id)}
      >
        <i className="fa fa-times"></i>
      </Button>
    </li>
  );
};

ListItem.propsType = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onDeleteItem: PropTypes.func,
};

export default ListItem;
