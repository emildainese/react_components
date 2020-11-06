export const wizardReducer = (state, action) => {
  switch (action.type) {
    case 'PAGE1_CHANGE':
      return {
        ...state,
        firstName: action.firstName,
        lastName: action.lastName,
      };
    case 'PAGE2_CHANGE':
      return {
        ...state,
        email: action.email,
        sex: action.sex,
      };
    case 'PAGE3_CHANGE':
      return {
        ...state,
        color: action.color,
        employed: action.employed,
        note: action.note,
      };
    default:
      return state;
  }
};
