import React, { useState } from 'react';
import TextInput from '../TextInputs/TextInput';
import classes from './Options.module.scss';
import Checkbox from '../Checkbox/Checkbox';
import Fade from '../../Effects/Fade/Fade';

const Options = (props) => {
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState(false);

  let options = [...props.options];
  let optionsContent = null;

  const onSort = () => {
    setSort(!sort);
  };

  if (filter) {
    options = options.filter((option) =>
      option.toLowerCase().includes(filter.toLowerCase()),
    );
  }

  if (sort) {
    optionsContent = <OptionsContent {...props} options={options.sort()} />;
  } else {
    optionsContent = <OptionsContent {...props} options={options} />;
  }

  return (
    <Fade in={props.active}>
      <div
        className={`${classes.OptionsBox} ${
          props.active ? classes.Active : ''
        }`}
      >
        <div className={classes.Inputs}>
          <div className={classes.Filter}>
            {props.filterable && (
              <TextInput label="Filter" onChange={setFilter} />
            )}
          </div>
          <div className={classes.Sort}>
            {props.sortable && (
              <Checkbox label="Descending" onChange={onSort} />
            )}
          </div>
        </div>
        {optionsContent}
      </div>
    </Fade>
  );
};

const OptionsContent = (props) => {
  const options = props.options.map((option, idx) => (
    <div
      className={classes.Option}
      key={idx}
      onClick={() => props.onChange(option)}
    >
      <label htmlFor={props.label.toLowerCase()}>{option}</label>
    </div>
  ));
  return options;
};

export default Options;
//Note
//Non sovrascrivere mai lo stato se voglio la reversibilità, filtrare e ordinare prima di renderizzare il componente
