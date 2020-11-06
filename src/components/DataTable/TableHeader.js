import React from 'react';
import HeaderCell from './HeaderCell';

const TableHeader = (props) => {
  const { headers } = props;
  const refs = {};

  headers.sort((a, b) => {
    if (a.index > b.index) return 1;
    return -1;
  });

  const getRef = (id) => {
    if (!refs.hasOwnProperty(id)) {
      refs[id] = React.createRef();
    }
    return refs[id];
  };

  const headerView = headers.map((header, idx) => {
    const cleanTitle = header.accessor;

    return (
      <HeaderCell
        key={cleanTitle}
        idx={idx}
        header={header}
        ref={getRef(cleanTitle)}
        sortby={props.sortby}
        descending={props.descending}
        onDragStart={props.onDragStart}
        onDragOver={props.onDragOver}
        onDrop={props.onDrop}
      >
        {props.children}
      </HeaderCell>
    );
  });

  return headerView;
};

export default TableHeader;
