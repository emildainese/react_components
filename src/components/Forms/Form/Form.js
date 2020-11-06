import React, { Fragment, useRef } from 'react';
import { useForm } from '../../../hooks/form';
import classes from './Form.module.scss';
import Input from './Inputs/Input';
import { initialState, formReducer } from './reducer/formReducer';

const Form = (props) => {
  const { type, withCheck, withMessage } = props;
  const showCheck = withCheck ? withCheck : true;
  const showMessage = withMessage ? withMessage : true;

  let refs = {
    usernameRef: useRef(null),
    usernameErrorRef: useRef(null),
    emailRef: useRef(null),
    emailErrorRef: useRef(null),
    passwordRef: useRef(null),
    passwordErrorRef: useRef(null),
    password2Ref: useRef(null),
    password2ErrorRef: useRef(null),
  };

  const {
    onSubmit,
    onChangeHandler,
    onBlurHandler,
    username,
    email,
    password,
    password2,
    validForm,
  } = useForm(props, initialState, formReducer, refs);

  return (
    <Fragment>
      <form className={classes.Form} onSubmit={onSubmit}>
        <FormHeader header={props.title} />
        {type === 'register' && (
          <FormControl domRef={refs.usernameRef}>
            <Input
              type="text"
              label="Username"
              name="username"
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
              value={username.value}
            />
            {showCheck && <Check />}
            {showMessage && <ErrorMessage domRef={refs.usernameErrorRef} />}
          </FormControl>
        )}
        <FormControl domRef={refs.emailRef}>
          <Input
            type="email"
            label="Email"
            name="email"
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            value={email.value}
          />
          {showCheck && <Check />}
          {showMessage && <ErrorMessage domRef={refs.emailErrorRef} />}
        </FormControl>
        <FormControl domRef={refs.passwordRef}>
          <Input
            type="password"
            name="password"
            value={password.value}
            label="Password"
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
          />
          {showCheck && <Check />}
          {showMessage && <ErrorMessage domRef={refs.passwordErrorRef} />}
        </FormControl>
        {type === 'register' && (
          <FormControl domRef={refs.password2Ref}>
            <Input
              type="password"
              name="password2"
              label="Confirm password"
              value={password2.value}
              disabled={!password.isValid}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
            />
            {showCheck && <Check />}
            {showMessage && <ErrorMessage domRef={refs.password2ErrorRef} />}
          </FormControl>
        )}
        <FormControl>
          <button
            type="submit"
            className="btn btn-violet"
            disabled={!validForm}
          >
            SUBMIT
          </button>
        </FormControl>
      </form>
    </Fragment>
  );
};

export default Form;

const FormControl = (props) => {
  return (
    <div className={classes.FormControl} ref={props.domRef}>
      {props.children}
    </div>
  );
};

const ErrorMessage = (props) => {
  return <small ref={props.domRef}>Error message</small>;
};

const Check = () => {
  return (
    <Fragment>
      <i className={`fas fa-check-circle ${classes.Check}`}></i>
      <i className={`fas fa-exclamation-circle ${classes.Exclamation}`}></i>
    </Fragment>
  );
};

const FormHeader = (props) => {
  return (
    <header className={classes.Header}>
      <h2>{props.header}</h2>
    </header>
  );
};

// refs =
//   type === 'login'
//     ? Object.keys(initialState).reduce((acc, field) => {
//         if (field === 'email' || field === 'password') {
//           acc[`${field}Ref`] = refs[`${field}Ref`];
//           acc[`${field}ErrorRef`] = refs[`${field}ErrorRef`];
//         }
//         return acc;
//       }, {})
//     : refs;

// const state =
//   type === 'login'
//     ? Object.keys(initialState).reduce((acc, field) => {
//         if (field === 'email' || field === 'password')
//           acc[field] = initialState[field];
//         return acc;
//       }, {})
//     : initialState;
