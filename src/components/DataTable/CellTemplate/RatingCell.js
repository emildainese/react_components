import React from 'react';
import { Link } from 'react-router-dom';

const RatingCell = (props) => {
  const { row } = props;
  return (
    <div className="rating">
      <div
        style={{
          backgroundColor: '#007bff',
          textAlign: 'center',
          height: '1.9em',
          width: (row.rating / 5) * 201 + 'px',
          margin: '3px 0 4px 0',
        }}
      >
        <Link
          to={`/showchart/${row.id}`}
          style={{ textDecoration: 'none', color: '#fafafa' }}
        >
          {row.rating}
        </Link>
      </div>
    </div>
  );
};

export default RatingCell;
