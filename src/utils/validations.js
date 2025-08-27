
export const validateName = (name) => /^[A-Za-z ]+$/.test(name);

export const validateUsername = (username) => /^[a-zA-Z0-9._-]+$/.test(username);

export const validatePassword = (password, username) =>
  /^[a-zA-Z0-9._-]+$/.test(password) && password !== username;

export const validateConfirmPassword = (password, confirm) =>
  password === confirm;

export const validateEmail = (email) =>
  /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);

export const validatePhone = (phone) =>
  /^\+\d{1,3}\d{10}$/.test(phone);
