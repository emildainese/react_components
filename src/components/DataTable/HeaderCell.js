import React from 'react';

const HeaderCell = React.forwardRef((props, ref) => {
  const { header, idx } = props;

  let title = header.title;
  let cleanTitle = header.accessor;
  let width = header.width;
  let icon = null;

  //Set the header ref
  header.headerRef = ref;

  if (props.sortby === idx) {
    icon = props.descending ? (
      <i className="fas fa-caret-down"></i>
    ) : (
      <i className="fas fa-caret-up"></i>
    );
  }

  return (
    <th
      key={cleanTitle}
      style={{ width: width }}
      data-col={cleanTitle}
      ref={ref}
      onDragStart={(e) => props.onDragStart(e, idx)}
      onDragOver={props.onDragOver}
      onDrop={(e) => props.onDrop(e, idx)}
    >
      <span draggable data-col={cleanTitle} className="header-cell">
        {title} {icon}
      </span>
    </th>
  );
});

export default HeaderCell;
