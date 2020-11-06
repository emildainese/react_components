import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './Select.module.scss';
import Selected from './Selected';
import Options from './Options';

const Select = (props) => {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState('');

  const toggleActive = () => {
    setActive(!active);
  };

  const reset = () => {
    setValue('');
  };

  const onChange = (value) => {
    setValue(value);
    setActive(false);
    props.onChange(value);
  };

  return (
    <div className={classes.FormField}>
      <div className={classes.FormFieldControl}>
        <div className={classes.Select}>
          <Selected
            value={value}
            active={active}
            toggleActive={toggleActive}
            arrowColor={props.arrowColor}
            reset={reset}
            setActive={setActive}
            placeholder={props.placeholder ? props.placeholder : 'Select'}
            clearable={props.clearable ? props.clearable : true}
          />
          <Options
            {...props}
            active={active}
            onChange={onChange}
            filterable={props.filterable ? props.filterable : false}
            sortable={props.sortable ? props.sortable : false}
          />
        </div>
      </div>
    </div>
  );
};

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  clearable: PropTypes.bool,
  filterable: PropTypes.bool,
};

export default Select;
