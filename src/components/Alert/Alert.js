import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import { CSSTransition } from 'react-transition-group';

import './Alert.scss';

const AlertContent = (props) => {
  return (
    <Fragment>
      <div className="alert-header">
        <h2>{props.title ? props.title : 'Alert Message'}</h2>{' '}
        <i className="fas fa-times" onClick={props.closeAlert}></i>
      </div>
      <div className="alert-body">
        <p>{props.message}</p>
      </div>
      <div className="alert-footer">
        <div className="alert-action">
          <Button
            className={`btn btn-${props.className.split('-')[1]}`}
            onClick={props.closeAlert}
          >
            CLOSE
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

const Alert = (props) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (props.error) setShowAlert(true);
  }, [props.error]);

  const closeAlert = () => {
    setShowAlert(false);
    props.hideAlert();
  };

  return (
    <CSSTransition
      in={showAlert}
      timeout={props.timeout ? props.timeout : 300}
      classNames="alert"
      mountOnEnter
      unmountOnExit
    >
      <div className={`alert ${props.className}`} style={props.style}>
        <AlertContent
          {...props}
          message={props.message}
          closeAlert={closeAlert}
        />
      </div>
    </CSSTransition>
  );
};

Alert.propsTypes = {
  error: PropTypes.bool.isRequired,
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
  closeAlert: PropTypes.func.isRequired,
  title: PropTypes.string,
  action: PropTypes.object,
};

export default Alert;
