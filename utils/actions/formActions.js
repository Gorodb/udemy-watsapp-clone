import {validateEmail, validatePassword, validateString} from "../validationConstraint";

export const validateInput = (inputId, inputValue) => {
  switch (inputId) {
    case "firstName":
    case "lastName":
      return validateString(inputId, inputValue)
    case "email":
      return validateEmail(inputId, inputValue)
    case "password":
      return validatePassword(inputId, inputValue)
    default:
      return undefined
  }
}