import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';

import './DataTable.scss';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableToolbar from './TableToolbar';
import TableSearch from './TableSearch';
import Pagination from './Pagination/Pagination';

const DataTable = (props) => {
  const initialState = {
    headers: props.headers,
    data: props.data ? props.data : [],
    inputs: {},
    keyField: props.keyField || 'id',
    noData: props.noData || 'No Data',
    width: props.width || '100%',
    sortby: null,
    descending: null,
    pagination: props.pagination || {},
  };

  //Table State
  const [search, setSearch] = useState(false);
  const [state, setState] = useState(initialState);
  const { headers, data, keyField, noData, pagination } = state;

  //Pagination
  const [pageData, setPageData] = useState(props.data);
  const [totalRecords, setTotalRecords] = useState(props.data.length);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLength, setPageLength] = useState(
    props.pagination.pageLength || 5,
  );

  //Inline Editing
  const [editState, setEditState] = useState({
    edit: { row: 0, rowId: 0, cell: 0 },
  });

  //Sorting
  const onSort = (e) => {
    const data = [...state.data];
    let colIdx = ReactDOM.findDOMNode(e.target).cellIndex;
    let colTitle = e.target.dataset.col;
    const descending = !state.descending;
    data.sort((a, b) => {
      let sortVal = 0;
      if (a[colTitle] < b[colTitle]) {
        sortVal = -1;
      } else if (a[colTitle] > b[colTitle]) {
        sortVal = 1;
      }
      if (descending) {
        sortVal = sortVal * -1;
      }
      return sortVal;
    });
    setState({ ...state, data: data, sortby: colIdx, descending: descending });
  };

  //Drag and Drop
  const onDragStart = (e, source) => {
    e.dataTransfer.setData('text/plain', source);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, target) => {
    e.preventDefault();
    const source = e.dataTransfer.getData('text/plain');

    const header = [...state.headers];
    let sourceHeader = header[source];
    let targetHeader = header[target];

    const data = [...state.data];
    let sourceData = data[source];
    let targetData = data[target];

    //Swap Headers
    let temp = sourceHeader.index;
    sourceHeader.index = targetHeader.index;
    targetHeader.index = temp;

    //Swap Data
    temp = sourceData;
    sourceData = targetData;
    targetData = temp;

    setState({ ...state, headers, data });
  };

  //Searching
  const onSearch = (e) => {
    let searchData = props.data.filter((row) => {
      let show = false;
      for (let i = 0; i < headers.length; i++) {
        const fieldName = headers[i].accessor;
        const fieldValue = row[fieldName];
        //console.log('key: ', fieldName, ' value: ', fieldValue);
        let inputId = 'inp' + fieldName;
        const input = state.inputs[inputId].current;
        if (!fieldValue === '') {
          show = true;
        } else {
          show =
            fieldValue.toString().toLowerCase().indexOf(input.value) !== -1;
          if (!show) break;
        }
      }
      return show;
    });
    setState({ ...state, data: searchData });
    setPageData(searchData);
    setTotalRecords(searchData.length);
    if (pagination.enable) {
      onGoToPage(1);
    }
  };

  const onToggleSearch = () => {
    if (search) setSearch(false);
    else setSearch(true);
  };

  //Pagination
  const getPageData = useCallback(
    (pageNum, pageLength) => {
      const startOfRecords = (pageNum - 1) * pageLength;
      const endOfRecords = startOfRecords + pageLength;
      const dataPage = data; //fare un copia
      const pageData = dataPage.slice(startOfRecords, endOfRecords);
      return pageData;
    },
    [data],
  );

  const onPageLengthChange = (pageLength) => {
    setPageLength(pageLength);
    onGoToPage(currentPage);
  };

  const onGoToPage = useCallback(
    (pageNum) => {
      const pageData = getPageData(pageNum, pageLength);
      setPageData(pageData);
      setCurrentPage(pageNum);
    },
    [getPageData, pageLength],
  );

  useEffect(() => {
    if (pagination.enable) {
      onGoToPage(currentPage);
    }
  }, [currentPage, onGoToPage, pagination]);

  //Inline Editing
  const onShowEditor = (e) => {
    const id = e.target.dataset.id;
    setEditState({
      edit: {
        row: parseInt(e.target.dataset.id - 1, 10),
        rowId: parseInt(id, 10),
        cell: e.target.cellIndex,
      },
    });
  };

  //Get focus on input cell
  let editInputRef = useRef(null);
  useEffect(() => {
    if (editInputRef.current) {
      editInputRef.current.focus();
    }
  });

  const onUpdate = (e) => {
    e.preventDefault();
    const input = e.target.firstChild;
    const header = state.headers[editState.edit.cell]; //fare copie
    const rowId = editState.edit.rowId;
    setEditState({ edit: { row: 0, rowId: 0, cell: 0 } });
    props.onUpdate && props.onUpdate(header.accessor, rowId, input.value);
  };

  const onFormReset = (e) => {
    if (e.keyCode === 27) {
      setEditState({ edit: { row: 0, rowId: 0, cell: 0 } });
    }
  };

  const title = props.title || 'Data Table';

  let table = (
    <table className="data-inner-table">
      <caption className="data-table-caption">{title}</caption>
      <thead onClick={onSort}>
        <tr>
          <TableHeader
            headers={state.headers}
            sortby={state.sortby}
            descending={state.descending}
            onDragOver={onDragOver}
            onDragStart={onDragStart}
            onDrop={onDrop}
          />
        </tr>
      </thead>
      <tbody onDoubleClick={onShowEditor}>
        {search && (
          <TableSearch
            headers={state.headers}
            onSearch={onSearch}
            inputs={state.inputs}
          />
        )}
        {data.length > 0 ? (
          <TableBody
            pagination={pagination}
            pageData={pageData}
            keyField={keyField}
            headers={headers}
            data={data}
            editState={editState}
            edit={props.edit}
            onFormReset={onFormReset}
            onUpdate={onUpdate}
            ref={editInputRef}
          />
        ) : (
          <tr colSpan={headers.length}>
            <td>{noData}</td>
          </tr>
        )}
      </tbody>
    </table>
  );

  return (
    <div className={`${props.className}`} style={props.style}>
      {pagination.enable && (
        <Pagination
          type={pagination.type}
          totalRecord={totalRecords}
          pageLength={pageLength}
          currentPage={currentPage}
          onPageLengthChange={onPageLengthChange}
          onGoToPage={onGoToPage}
        />
      )}
      <TableToolbar onToggleSearch={onToggleSearch} />
      {table}
    </div>
  );
};

export default DataTable;
