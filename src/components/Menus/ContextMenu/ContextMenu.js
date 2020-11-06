import React, { Fragment } from 'react';
import './ContextMenu.scss';
import useContextMenu from '../../../hooks/contextMenu';

const ContextMenu = (props) => {
  const { xPos, yPos, menu } = useContextMenu(props.outerRef);

  if (menu) {
    return (
      <ul className="context-menu" style={{ top: yPos, left: xPos }}>
        <li className="context-menu-item">
          <button onClick={(e) => e.preventDefault()}>
            Item1 <i className="far fa-trash-alt"></i>
          </button>
        </li>
        <li className="context-menu-item">
          <button onClick={(e) => e.preventDefault()}>
            Item2 <i className="fas fa-save"></i>
          </button>
        </li>
        <li className="context-menu-item">
          <button onClick={(e) => e.preventDefault()}>
            Item3 <i className="fas fa-redo-alt"></i>
          </button>
        </li>
      </ul>
    );
  }
  return <Fragment></Fragment>;
};

export default ContextMenu;
