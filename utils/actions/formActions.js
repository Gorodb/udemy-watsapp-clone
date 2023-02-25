import {validateEmail, validatePassword, validateString, validateLength} from "../validationConstraint";

export const validateInput = (inputId, inputValue) => {
  switch (inputId) {
    case "firstName":
    case "lastName":
      return validateString(inputId, inputValue)
    case "email":
      return validateEmail(inputId, inputValue)
    case "password":
      return validatePassword(inputId, inputValue)
    case "about":
      return validateLength(inputId, inputValue, 0,150, true)
    default:
      return undefined
  }
}