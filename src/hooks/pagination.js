import { useState } from 'react';
// siblingRange (google)  -> how many digits to display either side of current page
// boundaryRange (google) -> how many digits to display adjacent to the start and end page number

// Mantenere le variabili il più locali possibile!!!!!
// let max = 5; //Nefanda!!!Orrore!!! Stroutrup Teach!!!

export const usePagination = (
  count,
  currentPage = 1,
  lower = 2,
  upper = 5,
  boundaryOffset = 3, // boundaryOffset è un breakpoint per la paginazione
) => {
  const maxVisible = upper;
  const min = lower;
  const [active, setActive] = useState(true);
  const [page, setPage] = useState(currentPage);
  const [max, setMax] = useState(upper);
  const [range, setRange] = useState([min, max]);

  const onPageChange = (e) => {
    const currPage = parseInt(e.target.id);
    setPage(currPage);
    setActive(true);
    updateChangeRange(currPage);
  };

  const updateChangeRange = (page) => {
    //Max Visible
    if (page === maxVisible) {
      setMax(maxVisible);
      setRange([maxVisible - 2, maxVisible + 1]);
    }
    //Lower Bound and Upper Bound
    if (page === 1) {
      setMax(maxVisible);
      setRange([min, maxVisible]);
    } else if (page === count) {
      setMax(count - 2);
      setRange([count - maxVisible, count - 2]);
    }
    //Forward
    if (page > maxVisible && count - page > boundaryOffset && page !== count) {
      setMax(page);
      setRange([page - 2, page + 1]);
    } else if (
      page > maxVisible &&
      count - page <= boundaryOffset &&
      page !== count
    ) {
      setMax(count - maxVisible);
      setRange([count - maxVisible, count - 2]);
    }
    //Backward
    if (page < maxVisible && page <= boundaryOffset && page !== 1) {
      setMax(maxVisible);
      setRange([min, maxVisible]);
    } else if (page < maxVisible && page > boundaryOffset && page !== 1) {
      setMax(page);
      setRange([page - 2, page + 1]);
    }
  };

  //Forward Direction
  const updateForwardRange = () => {
    if (page < maxVisible && page > boundaryOffset) {
      setMax(page + 1);
      setRange([page - 1, page + 2]);
    } else if (page < maxVisible && page <= boundaryOffset) {
      setRange([min, maxVisible]);
    }
    if (page === maxVisible) {
      setMax(page + 1);
      setRange([page - 1, page + 2]);
    }
    if (page > maxVisible && count - page > boundaryOffset) {
      setMax(page + 1);
      setRange([page - 1, page + 2]);
    } else if (page > maxVisible && count - page <= boundaryOffset) {
      setRange([count - maxVisible, count - 2]);
    }
  };

  //Backward Direction
  const updateBackwardRange = () => {
    if (page === count) {
      setMax(count - maxVisible + 1);
    }
    if (page === maxVisible) {
      setRange([page - 3, page]);
    } else if (page > maxVisible && count - page > boundaryOffset) {
      setMax(page - 1);
      setRange([page - 3, page]);
    } else if (page > maxVisible && count - page <= boundaryOffset) {
      setRange([count - maxVisible, count - 2]);
    }
    if (page === count - maxVisible + min) {
      setMax(page - 1);
      setRange([page - 3, page]);
    }
  };

  const nextPage = () => {
    if (page < count) {
      setPage(page + 1);
      setActive(page);
      updateForwardRange();
    } else {
      setPage(count);
      setActive(page);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setActive(page);
      updateBackwardRange();
    } else {
      setPage(1);
      setActive(1);
    }
  };

  return {
    max,
    page,
    active,
    range,
    prevPage,
    nextPage,
    onPageChange,
  };
};
