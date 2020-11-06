import { useState, useEffect, useReducer } from 'react';
import classes from '../components/Forms/Form/Form.module.scss';

export const useForm = (props, initialState, formReducer, references) => {
  const { withMessage, type } = props;

  const refers =
    type === 'login'
      ? Object.keys(initialState).reduce((acc, field) => {
          if (field === 'email' || field === 'password') {
            acc[`${field}Ref`] = references[`${field}Ref`];
            acc[`${field}ErrorRef`] = references[`${field}ErrorRef`];
          }
          return acc;
        }, {})
      : references;

  const formState =
    type === 'login'
      ? Object.keys(initialState).reduce((acc, field) => {
          if (field === 'email' || field === 'password')
            acc[field] = initialState[field];
          return acc;
        }, {})
      : initialState;

  const [state, dispatch] = useReducer(formReducer, formState);
  const { username, email, password, password2, validForm } = state;

  const {
    usernameRef,
    usernameErrorRef,
    emailRef,
    emailErrorRef,
    passwordRef,
    passwordErrorRef,
    password2Ref,
    password2ErrorRef,
  } = refers;

  const [refs, setRefs] = useState({});

  useEffect(() => {
    setRefs({
      usernameRef,
      usernameErrorRef,
      emailRef,
      emailErrorRef,
      passwordRef,
      passwordErrorRef,
      password2Ref,
      password2ErrorRef,
    });
    // eslint-disable-next-line
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(username, email, password, password2);
    dispatch({ type: 'CLEAR_FORM' });
    clearCheck();
  };

  const clearCheck = () => {
    if (type === 'login') {
      emailRef.current.classList.remove(classes.Success);
      passwordRef.current.classList.remove(classes.Success);
    } else {
      usernameRef.current.classList.remove(classes.Success);
      emailRef.current.classList.remove(classes.Success);
      passwordRef.current.classList.remove(classes.Success);
      password2Ref.current.classList.remove(classes.Success);
    }
  };

  const onChangeHandler = (e) => {
    dispatch({
      type: 'INPUT_CHANGE',
      field: e.target.name,
      value: e.target.value,
    });
    validationHandler(e);
  };

  const onBlurHandler = (e) => validationHandler(e);

  const validationHandler = (e) => {
    dispatch({
      type: 'VALIDATE_FIELD',
      field: e.target.name,
      isValid: validateInput(e, withMessage, {
        validator: state[e.target.name].validator,
        psw: e.target.name === 'password2' ? password.value : null,
        errorMsg: state[e.target.name].errorMsg,
        inputRef: refs[`${e.target.name}Ref`],
        errorRef: refs[`${e.target.name}ErrorRef`],
      }),
    });
    dispatch({ type: 'VALIDATE_FORM' });
  };

  return {
    onSubmit,
    onChangeHandler,
    onBlurHandler,
    username,
    email,
    password,
    password2,
    validForm,
  };
};

const validateInput = (event, withMessage, config) => {
  const { validator, errorMsg, inputRef, errorRef, psw } = config;
  const current = inputRef.current;

  let isValid;
  if (!psw) isValid = validator(event.target.value.trim());
  if (psw) isValid = validator(event.target.value.trim(), psw);

  if (!isValid) {
    if (current.classList.contains(classes.Success)) {
      current.classList.remove(classes.Success);
    }
    current.classList.add(classes.Error);
    current.querySelector('input').focus();
    if (withMessage) {
      errorRef.current.textContent = errorMsg;
    }
  } else {
    if (current.classList.contains(classes.Error)) {
      current.classList.remove(classes.Error);
    }
    current.classList.add(classes.Success);
    if (withMessage) {
      errorRef.current.textContent = '';
    }
  }
  return isValid;
};
