import React, { useState, useEffect, useCallback } from 'react';
import classes from './HamburgerBase.module.scss';
import type from './Hamburger.module.scss';

const Hamburger = (props) => {
  const { onClick } = props;
  const [active, setActive] = useState(false);

  const toggleActive = () => {
    setActive(!active);
    // onClick(active);
    props.onClick();
  };

  // const safeClose = useCallback(() => {
  //   if (window.innerWidth >= 991 && active) {
  //     setActive(false);
  //     onClick(active);
  //   }
  // }, [active, onClick]);

  // useEffect(() => {
  //   window.addEventListener('resize', safeClose);
  //   return () => {
  //     window.removeEventListener('resize', safeClose);
  //   };
  // }, [safeClose]);

  const hamburgerType = `Hamburger${
    props.type.charAt(0).toUpperCase() + props.type.slice(1)
  }`;

  const barStyle = (
    <style
      dangerouslySetInnerHTML={{
        __html: `
    .${classes.HamburgerInner}:before,
    .${classes.HamburgerInner}:after { 
        background-color: ${props.color ? props.color : '#fafafa'}
      }`,
      }}
    />
  );

  return (
    <button
      className={`${classes.Hamburger} ${type[`${hamburgerType}`]} ${
        active ? type.IsActive : ''
      }`}
      type="button"
      onClick={toggleActive}
      style={{ ...props.style }}
    >
      <span className={`${classes.HamburgerBox} ${type.HamburgerBox}`}>
        {props.hover && <span className={type.Hover}></span>}
        {barStyle}
        <span
          className={`${classes.HamburgerInner} ${type.HamburgerInner}`}
          style={{
            backgroundColor: `${props.color ? props.color : '#fafafa'}`,
          }}
        ></span>
      </span>
    </button>
  );
};

export default Hamburger;
