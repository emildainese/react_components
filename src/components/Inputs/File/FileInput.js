import React from 'react';
import PropTypes from 'prop-types';
import classes from './FileInput.module.scss';

const FileInput = (props) => {
  return (
    <div className={classes.FormField}>
      <div className={classes.FormFieldControl}>
        <label className={classes.File}>
          <input
            type="file"
            id="file"
            aria-label="File browser example"
            onChange={(e) => props.onChange(e.target.files[0])}
          />
          <span className={classes.FileCustom}></span>
        </label>
      </div>
    </div>
  );
};

FileInput.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default FileInput;
