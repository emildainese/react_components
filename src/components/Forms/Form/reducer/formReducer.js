import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '../../../../util/formValidation';

export const initialState = {
  username: {
    value: '',
    validator: validateUsername,
    errorMsg: 'Invalid Username - Min lenght 4 characters',
    isValid: false,
  },
  email: {
    value: '',
    validator: validateEmail,
    errorMsg: 'Invalid Email',
    isValid: false,
  },
  password: {
    value: '',
    validator: validatePassword,
    errorMsg: 'Invalid Password - Min length 6',
    isValid: false,
  },
  password2: {
    value: '',
    validator: validateConfirmPassword,
    errorMsg: "Invalid Confirm Password - Passwords doesn't match",
    isValid: false,
  },
  validForm: false,
};

export const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      return {
        ...state,
        [action.field]: {
          ...state[action.field],
          value: action.value,
        },
      };
    case 'VALIDATE_FIELD':
      console.log(state);
      return {
        ...state,
        [action.field]: {
          ...state[action.field],
          isValid: action.isValid,
        },
      };
    case 'VALIDATE_FORM':
      return {
        ...state,
        validForm: Object.keys(state).reduce((acc, field) => {
          if (field !== 'validForm') acc = acc && state[field].isValid;
          return acc;
        }, true),
      };
    case 'CLEAR_FORM':
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
