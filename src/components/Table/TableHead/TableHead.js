import React from 'react';
import classes from './TableHead.module.scss';

const TableHead = (props) => {
  return (
    <thead className={classes.TableHead}>
      <tr>
        {props.headers.map((field, idx) => (
          <th key={idx} id={idx}>
            {field}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
