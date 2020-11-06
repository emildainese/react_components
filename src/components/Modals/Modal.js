import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './Modal.scss';
import Backdrop from './Backdrop/Backdrop';
import Button from '../Button/Button';

const ModalContent = (props) => {
  const content = (
    <div className={`modal ${props.modalClass}`} style={props.style}>
      <header className="modal-header">{props.header}</header>
      <div className="modal-body">
        <form
          onSubmit={props.onSubmit ? props.onSubmit : (e) => e.preventDefault()}
        >
          <div className={`modal-content ${props.contentClass}`}>
            {props.children}
          </div>
          <footer className={`modal-footer ${props.footerClass}`}>
            {props.footer}
            <Button onClick={props.close} className="btn btn-danger" ripple>
              DISMISS
            </Button>
          </footer>
        </form>
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById('modal'));
};

const Modal = (props) => {
  return (
    <Fragment>
      {props.showModal && (
        <Backdrop show={props.showModal} closeModal={props.close} />
      )}
      <CSSTransition
        in={props.showModal}
        mountOnEnter
        unmountOnExit
        timeout={props.timeout}
        classNames="modal"
      >
        <ModalContent {...props} />
      </CSSTransition>
    </Fragment>
  );
};

export default Modal;
