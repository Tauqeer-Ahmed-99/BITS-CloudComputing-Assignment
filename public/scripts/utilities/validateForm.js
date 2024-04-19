import { isEmail } from "./utils.js";

const validateForm = (formName, form) => {
  const isEmailValid = isEmail(form.email);
  const isPasswordValid =
    formName === "login" ? form.password.length > 0 : form.password.length >= 8;
  const isConfirmPasswordValid =
    formName === "signup" ? form.confirmPassword === form.password : true;

  const formErrors = {
    email: !isEmailValid,
    password: !isPasswordValid,
    confirmPassword: !isConfirmPasswordValid,
  };

  return [Object.values(formErrors).some((error) => error), formErrors];
};

export default validateForm;
