import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";

import "./FoldMenu.scss";
const FoldMenu = (props) => {
  const [inState, setInState] = useState(false);

  const menu = menuConfig.map((item, idx) => {
    let element = null;
    switch (item.type) {
      case "menu-button":
        element = (
          <CSSTransition
            in={inState}
            timeout={300}
            key={idx}
            classNames="slide-in"
            mountOnEnter
            unmountOnExit
          >
            <li className="menu-list-item">
              <button>
                {item.name}{" "}
                {item.iconClass !== "" && <i className={item.iconClass}></i>}
              </button>
            </li>
          </CSSTransition>
        );
        break;
      case "menu-link":
        element = (
          <CSSTransition
            in={inState}
            timeout={500}
            key={idx}
            classNames="slide-in"
            mountOnEnter
            unmountOnExit
          >
            <li className="menu-list-item">
              <Link to={item.to}>
                {item.name}{" "}
                {item.iconClass !== "" && <i className={item.iconClass}></i>}
              </Link>
            </li>
          </CSSTransition>
        );
        break;
      default:
        throw new Error("Invalid Element Type");
    }
    return element;
  });

  return (
    <div className="fold-menu">
      <input type="checkbox" id="chk1" />
      <div className="menu">
        <span>{props.title ? props.title : ""}</span>
        <div className="bars">
          <label
            htmlFor="chk1"
            className="fas fa-cogs"
            onClick={() => setInState(true)}
          ></label>
          <label
            htmlFor="chk1"
            className="fa fa-times"
            onClick={() => setInState(false)}
          ></label>
        </div>
      </div>
      <ul className="menu-list">{menu}</ul>
    </div>
  );
};

export default FoldMenu;

const menuConfig = [
  {
    name: "Nozzle",
    type: "menu-button",
    iconClass: "",
  },
  {
    name: "Sprue",
    type: "menu-button",
    iconClass: "",
  },
  {
    name: "Runner",
    type: "menu-button",
    iconClass: "",
  },
  {
    name: "Gate",
    type: "menu-button",
    iconClass: "",
  },
  {
    name: "Cavity",
    type: "menu-button",
    iconClass: "",
  },
];
