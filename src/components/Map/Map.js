import React, { useEffect, useRef } from 'react';
import classes from './Map.module.scss';

const Map = (props) => {
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });
    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);

  return (
    <div className={classes.MapContainer}>
      <div
        ref={mapRef}
        className={`${classes.Map} ${props.className}`}
        style={props.style}
      ></div>
    </div>
  );
};

export default Map;
