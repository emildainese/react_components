//-------------------------------------------------------------
export const validate = (fields) => {
  const { username, email, password, password2 } = fields;
  //Clean Input
  const usernameValue = username.trim();
  const emailValue = email.trim();
  const passwordValue = password.trim();
  const password2Value = password2.trim();

  let isValid = true;

  //Register Form
  if (username && password2) {
    isValid =
      isValid &&
      validateUsername(usernameValue) &&
      validateEmail(emailValue) &&
      validatePassword(passwordValue, 6, 20) &&
      validateConfirmPassword(passwordValue, password2Value);
    //Login Form
  } else {
    isValid =
      isValid &&
      validateEmail(emailValue) &&
      validatePassword(passwordValue, 6, 20);
  }

  return isValid;
};

// Validators
//-------------------------------------------------------------
export const validateUsername = (userName, min = 4, max = 20) => {
  if (isEmpty(userName)) return false;
  if (userName.length < min || userName.length > max) return false;
  return isLetters(userName);
};

//-------------------------------------------------------------
export const validateFirstName = (firstName) => {
  if (isEmpty(firstName)) return false;
  return isLetters(firstName);
};

//-------------------------------------------------------------
export const validateLastName = (lastName) => {
  if (isEmpty(lastName)) return false;
  return isLetters(lastName);
};

//-------------------------------------------------------------
export const validatePassword = (password, min = 6, max = 20) => {
  if (isEmpty(password)) return false;
  return validateLength(password, min, max);
};

//-------------------------------------------------------------
export const validateConfirmPassword = (password2, password) => {
  if (isEmpty(password2)) return false;
  return password2 === password;
};

//-------------------------------------------------------------
export const validateEmail = (email) => {
  if (isEmpty(email)) return false;
  if (!isEmail(email)) return false;
  return true;
};

//-------------------------------------------------------------
const isEmpty = (value) => {
  if (value.length === 0) {
    return true;
  }
  return false;
};

//-------------------------------------------------------------
const isLetters = (value) => {
  if (/^[a-zA-Z ]+$/.test(value)) {
    return true;
  }
  return false;
};

//-------------------------------------------------------------
const validateLength = (value, minLength, maxLength) => {
  if (value.length >= minLength && value.length < maxLength) {
    return true;
  } else if (value.length < minLength) {
    return false;
  }
  return false;
};

//-------------------------------------------------------------
const isEmail = (value) => {
  const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return matchRegEx(regEx, value, 'Must be a valid email address');
};

//-------------------------------------------------------------
const matchRegEx = (regEx, value) => {
  if (value.match(regEx)) {
    return true;
  } else {
    return false;
  }
};
