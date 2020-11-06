import React, { useState } from 'react';

const PageSelector = React.forwardRef((props, ref) => {
  const [inputValue, setInputValue] = useState(props.pageLength);

  const onPageLengthChange = (e) => {
    setInputValue(e.target.value);
    props.onPageLengthChange(inputValue);
  };

  return (
    <span className="page-selector">
      Rows per page:{' '}
      <input
        type="number"
        ref={ref}
        min="1"
        value={inputValue}
        onChange={onPageLengthChange}
      />
    </span>
  );
});

export default PageSelector;
