export const paginate = (
  totalItems,
  pageSize = 10,
  currentPage = 1,
  maxPages = 100,
) => {
  // total pages
  let totalPages = Math.ceil(totalItems / pageSize);

  // check range
  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  let startPage, endPage;
  if (totalPages <= maxPages) {
    // total pages less than max so show all pages
    startPage = 1;
    endPage = totalPages;
  } else {
    // total pages more than max so calculate start and end pages
    let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
    let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;

    if (currentPage <= maxPagesBeforeCurrentPage) {
      // current page near the start
      startPage = 1;
      endPage = maxPages;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      // current page near the end
      startPage = totalPages - maxPages + 1;
      endPage = totalPages;
    } else {
      // current page somewhere in the middle
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  let startIndex = (currentPage - 1) * pageSize;
  let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1) + 1;

  let pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
    (i) => startPage + i,
  );

  return {
    totalItems: totalItems,
    currentPage: currentPage,
    pageSize: pageSize,
    totalPages: totalPages,
    startPage: startPage,
    endPage: endPage,
    startIndex: startIndex,
    endIndex: endIndex,
    pages: pages,
  };
};
