import React, { createContext, useReducer } from 'react';
import { wizardReducer } from './wizard-reducer';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  sex: '',
  color: '',
  employed: false,
  note: '',
};

export const WizardContext = createContext(initialState);

export const WizardProvider = (props) => {
  const [wizardState, dispatch] = useReducer(wizardReducer, initialState);

  const page1InputHandler = (firstName, lastName) => {
    dispatch({
      type: 'PAGE1_CHANGE',
      firstName,
      lastName,
    });
  };

  const page2InputHandler = (email, sex) => {
    dispatch({
      type: 'PAGE2_CHANGE',
      sex,
      email,
    });
  };

  const page3InputHandler = (color, employed, note) => {
    dispatch({
      type: 'PAGE3_CHANGE',
      color,
      employed,
      note,
    });
  };

  return (
    <WizardContext.Provider
      value={{
        firstName: wizardState.firstName,
        lastName: wizardState.lastName,
        email: wizardState.email,
        sex: wizardState.sex,
        color: wizardState.color,
        employed: wizardState.employed,
        note: wizardState.note,
        page1InputHandler,
        page2InputHandler,
        page3InputHandler,
      }}
    >
      {props.children}
    </WizardContext.Provider>
  );
};
