import React from 'react';
import classes from './ImageSpan.module.scss';
import { imageSpanConfig } from './config/config';

const ImageSpan = (props) => {
  const imageSpanItems = renderImageItems(imageSpanConfig);
  return <div className={classes.ImageSpan}>{imageSpanItems}</div>;
};

export default ImageSpan;

const renderImageItems = (config) => {
  const imageSpanItems = config.map((item, idx) => {
    let title;
    if (typeof item.h2 === 'object') {
      const { value, span, i } = item.h2;
      title = (
        <h2>
          {value && value} {span && <span>{span}</span>}
          {i && <i className={i}></i>}
        </h2>
      );
    } else if (typeof item.h2 === 'string') {
      title = <h2>{item.h2}</h2>;
    }
    return (
      <div className={classes[item.class]} key={idx}>
        {title}
        <p>{item.p}</p>
      </div>
    );
  });
  return imageSpanItems;
};
