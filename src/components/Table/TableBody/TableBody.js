import React from 'react';
import classes from './TableBody.module.scss';

//Dipende dalla struttura dei dati in input
const TableBody = (props) => {
  const numCols = Object.keys(props.tableData[0]).length;

  const { numEmptyRows, emptyRows } = fillTable(
    numCols,
    props.totalItems,
    props.pageSize,
  );

  return (
    <tbody className={classes.TableBody}>
      {props.tableData.map((data, idx) => (
        <tr key={idx} className={classes.TableRow} id={idx}>
          {Object.values(data).map((field, idx) => (
            <td key={idx} className={classes.TableData}>
              {field}
            </td>
          ))}
        </tr>
      ))}
      {numEmptyRows &&
        parseInt(props.currentPage) === props.totalPages &&
        emptyRows}
    </tbody>
  );
};

export default TableBody;

const fillTable = (numCols, totalItems, pageSize) => {
  let numEmptyRows = null;
  if (totalItems % pageSize !== 0) {
    numEmptyRows = pageSize - (totalItems % pageSize);
  }

  let emptyRows = [];
  if (numEmptyRows) {
    let emptyCells = null;
    for (let i = 0; i < numEmptyRows; ++i) {
      emptyCells = [];
      for (let j = 0; j < numCols; ++j) {
        emptyCells.push(
          <td key={j} className={classes.TableData}>
            Nill
          </td>,
        );
      }
      emptyRows.push(
        <tr key={i} className={classes.TableRow}>
          {emptyCells}
        </tr>,
      );
    }
  }

  return { numEmptyRows, emptyRows };
};
