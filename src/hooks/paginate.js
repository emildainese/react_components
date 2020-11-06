import { useState } from 'react';
import { paginate } from '../util/paginate';

export const usePaginate = (tableData, pageSize = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const pagination = paginate(tableData.length, pageSize, currentPage);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = pagination.totalPages;
  const totalItems = pagination.totalItems;

  const currentData = tableData.slice(
    pagination.startIndex,
    pagination.endIndex,
  );

  return { totalItems, totalPages, currentPage, currentData, onPageChange };
};
