import React from 'react';

const TableToolbar = (props) => {
  return (
    <div className="toolbar">
      <button className="btn btn-primary" onClick={props.onToggleSearch}>
        Search
      </button>
    </div>
  );
};

export default TableToolbar;
