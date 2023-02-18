import {useCallback, useEffect, useReducer, useState} from "react";
import {Feather, FontAwesome} from "@expo/vector-icons";
import {Alert, ActivityIndicator, StyleSheet} from "react-native";
import {useDispatch} from "react-redux";

import {SubmitButton} from "../buttons/SubmitButton";
import {Input} from "../input/Input";
import {validateInput} from "../../utils/actions/formActions";
import {reducer} from "../../utils/reducers/formReducer";
import {signUp} from "../../utils/actions/authActions";
import {colors} from "../../constants/colors";

const initialState = {
  inputValues: {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  },
  inputValidities: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  },
  formIsValid: false,
}

export const SignUpForm = (props) => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const {inputValidities: {firstName, lastName, email, password}} = formState;

  const inputChangeHandler = useCallback((inputId, inputValue) => {
    const validationResult = validateInput(inputId, inputValue);
    dispatchFormState({inputId, validationResult, inputValue});
  }, [dispatchFormState]);

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred", error);
      setError("");
    }
  }, [error])

  const authHandler = useCallback(async () => {
    const {firstName, lastName, email, password} = formState.inputValues
    try {
      setIsLoading(true);
      const action = signUp(firstName, lastName, email, password);
      setError(null);
      setIsLoading(false);
      await dispatch(action);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  }, [dispatch, formState])

  return (
    <>
      <Input
        label="First name"
        id="firstName"
        icon="user-o"
        iconPack={FontAwesome}
        onInputChanged={inputChangeHandler}
        errorText={firstName}
      />
      <Input
        label="Last name"
        id="lastName"
        icon="user-o"
        iconPack={FontAwesome}
        onInputChanged={inputChangeHandler}
        errorText={lastName}
      />
      <Input
        label="Email"
        id="email"
        icon="mail"
        iconPack={Feather}
        onInputChanged={inputChangeHandler}
        autoCapitalize="none"
        keyboardType="email-address"
        errorText={email}
      />
      <Input
        label="Password"
        id="password"
        icon="lock"
        iconPack={Feather}
        onInputChanged={inputChangeHandler}
        secureTextEntry
        autoCapitalize="none"
        errorText={password}
      />
      {
        isLoading
          ? <ActivityIndicator size="small" color={colors.primary} style={styles.loading} />
          : <SubmitButton
            onPress={authHandler}
            disabled={!formState.formIsValid}
            style={{marginTop: 20}}
          >Sign up</SubmitButton>
      }
    </>
  )
}

const styles = StyleSheet.create({
  loading: {
    marginTop: 10,
  }
})