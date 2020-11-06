import React, { useState, useEffect, useCallback } from 'react';

const TableInput = React.forwardRef((props, ref) => {
  const { idx, hdr } = props;

  return (
    <td key={idx}>
      <input
        type="text"
        ref={ref}
        data-idx={idx}
        style={{ width: `${hdr.clientWidth - 20}px` }}
      />
    </td>
  );
});

const TableSearch = (props) => {
  const { headers, inputs, onSearch } = props;

  const [searchInputs, setSearchInputs] = useState(null);
  const [refs, setRefs] = useState({});

  const getRef = useCallback((id) => {
    if (!refs.hasOwnProperty(id)) {
      refs[id] = React.createRef();
    }
    return refs[id];
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Set The Inputs Refs
  useEffect(() => {
    setRefs(
      headers.forEach((header) => {
        let inputId = 'inp' + header.accessor;
        inputs[inputId] = getRef(inputId);
      }),
    );
  }, [getRef, headers, inputs]);

  useEffect(() => {
    setSearchInputs(
      headers.map((header, idx) => {
        const hdr = header.headerRef.current; //Get header ref
        let inputId = 'inp' + header.accessor;
        return (
          <TableInput
            key={idx}
            hdr={hdr}
            data-idx={idx}
            idx={idx}
            ref={inputs[inputId]}
          />
        );
      }),
    );
  }, [headers, refs, inputs, getRef]);

  return <tr onChange={onSearch}>{searchInputs}</tr>;
};

export default TableSearch;
