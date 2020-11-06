import React from 'react';
import './SlideMenu.scss';
import DropdownItem from '../../DropdownItem/DropdownItem';

const elementHeight = 3.5;

const SlideMenu = (props) => {
  const computedStyle = slideMenuStyle(props, 0.5, 0.5);

  return (
    <ul className="dropdown-menu-list" style={{ ...computedStyle }}>
      {props.dropdownMenu.map((item, idx) => (
        <DropdownItem
          name={item.name}
          key={idx}
          height={elementHeight}
          menuType="slide"
        />
      ))}
    </ul>
  );
};

export default SlideMenu;

const slideMenuStyle = (props, transitionTime, animationTime) => {
  return {
    top: `${-props.stroke}rem `,
    height: `${props.stroke}rem`,
    transform: `${
      props.slide ? `translateY(${props.stroke}rem)` : 'translateY(0)'
    }`,
    transition: `transform ${transitionTime}s ease-out`,
    zIndex: `${-props.zIndex}`,
    animation: `${props.slide ? `setZIndex ${animationTime}s forwards` : ''}`,
  };
};
