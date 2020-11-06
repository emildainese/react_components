import React, { Fragment } from "react";
import classes from "./Table.module.scss";

import TableHead from "./TableHead/TableHead";
import TableBody from "./TableBody/TableBody";
import Pagination from "../Pagination/Pagination";

import { usePaginate } from "../../hooks/paginate";
import { makeid } from "../../util/helper";

const Table = (props) => {
  const {
    totalItems,
    totalPages,
    currentPage,
    currentData,
    onPageChange,
  } = usePaginate(tableData, props.pageSize);

  const data = props.pagination ? currentData : tableData;

  return (
    <Fragment>
      <table className={classes.Table}>
        <TableHead headers={headers} />
        <TableBody
          tableData={data}
          pageSize={props.pageSize}
          totalItems={totalItems}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </table>
      {props.pagination && (
        <Pagination count={totalPages} onPageChange={onPageChange} />
      )}
    </Fragment>
  );
};

export default Table;

const seedTable = (max) => {
  const tableData = [];
  for (let i = 1; i <= max; ++i) {
    tableData.push({
      index: i,
      name: `Name${makeid(5)}`,
      age: Math.floor(Math.random() * 100) + 1,
      email: `test${makeid(3)}@test.com`,
      phone: `${Math.floor(Math.random() * 1000) + 100}/${Math.floor(
        Math.random() * 1000000 + 100000
      )}`,
      passsword: makeid(6),
    });
  }
  return tableData;
};

const headers = ["#", "Name", "Age", "Email", "Phone", "Password"];
const tableData = seedTable(95);
