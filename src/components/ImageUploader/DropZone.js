import React from 'react';
import classes from './DropZone.module.scss';

const DropZone = (props) => {
  const fileName = props.file ? props.file.name : 'No Image Uploaded!';
  return (
    <div
      className={`${classes.DropZone} ${
        props.dragging === true ? classes.inDropZone : ''
      }`}
      onDrag={props.onDrag}
      onDragStart={props.onDragStart}
      onDragEnd={props.onDragEnd}
      onDragOver={props.onDragOver}
      onDragEnter={props.onDragEnter}
      onDragLeave={props.onDragLeave}
      onDrop={props.onDrop}
    >
      <div className={classes.Content}>
        Upload Image or{' '}
        <span
          onClick={props.onSelectFileClick}
          className={`${classes.SelectFile} `}
        >
          Select Image
        </span>
      </div>
      <span className={classes.FileName}>{fileName}</span>
      <i className="fas fa-upload fa-3x"></i>
      {props.children}
    </div>
  );
};

export default DropZone;
