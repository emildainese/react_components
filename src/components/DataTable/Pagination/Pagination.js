import React, { useState, useRef } from 'react';
import './Pagination.scss';
// import PageSelector from './PageSelector';

const Pagination = (props) => {
  const totalRecord = props.totalRecord;
  const pages = Math.ceil(totalRecord / props.pageLength);

  const [currentPage, setCurrentPage] = useState(props.currentPage || 1);
  const [pageLength, setPageLength] = useState(props.pageLength);

  const inputRef = useRef(null);
  const currentInputRef = useRef(null);

  const onGoToPage = (pageNum) => {
    if (pageNum === currentPage) return;
    if (inputRef.current) {
      inputRef.current.value = pageNum;
    }
    setCurrentPage(pageNum);
    props.onGoToPage(pageNum);
  };

  const onPrevPage = (e) => {
    if (currentPage === 1) return;
    onGoToPage(currentPage - 1);
  };

  const onNextPage = (e) => {
    if (currentPage > pages - 1) return;
    onGoToPage(currentPage + 1);
  };

  const onCurrentPageChange = (e) => {
    let currentPage = currentInputRef.current.value;
    if (currentPage >= pages) {
      currentPage = pages;
    }
    setCurrentPage(currentPage);
    props.onGoToPage(currentPage);
  };

  const onPageLengthChange = (e) => {
    const pageLength = inputRef.current.value;
    setPageLength(pageLength);
    props.onPageLengthChange(pageLength);
  };

  const getPaginationButtons = (text) => {
    let classNames = 'pagination-btn';
    if (currentPage === +text) {
      classNames += ' current-page';
    }
    let html = (
      <button
        key={`btn-${text}`}
        id={`btn-${text}`}
        className={classNames}
        onClick={(e) => onGoToPage(text)}
      >
        {text}
      </button>
    );
    return html;
  };

  const pageSelector = (
    <span className="page-selector">
      Rows per page:{' '}
      <input
        type="number"
        ref={inputRef}
        min="1"
        defaultValue={pageLength}
        onChange={onPageLengthChange}
      />
    </span>
  );

  const prevButton = (
    <button className="pagination-btn prev" onClick={onPrevPage}>
      {'<'}
    </button>
  );

  const nextButton = (
    <button className="pagination-btn next" onClick={onNextPage}>
      {'>'}
    </button>
  );

  const buttons = [];
  if (props.type === 'long') {
    for (let i = 1; i <= pages; i++) {
      buttons.push(getPaginationButtons(i));
    }
  } else if (props.type === 'short') {
    let input = (
      <input
        key="currentPageInput"
        className="current-page-input"
        type="number"
        max={pages}
        defaultValue={currentPage}
        ref={currentInputRef}
        onChange={onCurrentPageChange}
      />
    );
    buttons.push(input);
  }

  return (
    <div className="pagination">
      {pageSelector}
      {prevButton}
      {buttons}
      {nextButton}
    </div>
  );
};

export default Pagination;

/* <PageSelector
        onPageLengthChange={props.onPageLengthChange}
        pageLength={props.pageLength}
        ref={inputRef}
      /> */
