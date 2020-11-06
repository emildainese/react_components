import React from 'react';

const TableBody = React.forwardRef((props, ref) => {
  const { pagination, pageData, keyField, data, headers, editState } = props;

  let renderData = pagination ? pageData : data;

  //Render Table Body
  let tableBodyContent = renderData.map((row, rowIdx) => {
    const id = row[keyField];
    const edit = props.edit && { ...editState.edit }; //For Inline Editing
    const tds = headers.map((header, idx) => {
      const alt = 'alt';
      let content = row[header.accessor];
      const cell = header.cell;
      if (cell) {
        if (typeof cell === 'object') {
          if (cell.type === 'image' && content) {
            content = <img style={cell.style} alt={alt} src={content} />;
          }
        } else if (typeof cell === 'function') {
          content = cell(row);
        }
      }
      //Inlie Editing
      if (props.edit) {
        if (
          header.dataType &&
          (header.dataType === 'number' || header.dataType === 'string') &&
          header.accessor !== keyField
        ) {
          if (edit && edit.row === rowIdx && edit.cell === idx) {
            content = (
              <form onSubmit={props.onUpdate}>
                <input
                  type="text"
                  defaultValue={content}
                  onKeyUp={props.onFormReset}
                  ref={ref}
                />
              </form>
            );
          }
        }
      }

      return (
        <td key={idx} data-id={id} data-row={rowIdx}>
          {content}
        </td>
      );
    });

    return <tr key={rowIdx}>{tds}</tr>;
  });

  return tableBodyContent;
});

export default TableBody;
