import React from 'react';
import PropTypes from 'prop-types';
import classes from './ImageGrid.module.scss';
import { images } from './images/images';

//Masonry CSS form more advance layout

const ImageGrid = (props) => {
  const layout = props.layout ? props.layout : [0, 4, 8, 12, 16];
  const imgs = props.images ? props.images : images;

  let columns = [];
  for (let i = 0; i < layout.length - 1; ++i) {
    columns.push(
      <div key={i} className={classes.Column}>
        {imgs.slice(layout[i], layout[i + 1]).map((image, idx) => (
          <figure key={idx} className={classes.ImageItem}>
            <img src={image.url} alt={image.alt} />
          </figure>
        ))}
      </div>
    );
  }
  return <div className={classes.Row}>{columns}</div>;
};

ImageGrid.propTypes = {
  layout: PropTypes.array.isRequired,
  images: PropTypes.array.isRequired,
};

export default ImageGrid;
