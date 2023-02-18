import {useCallback, useEffect, useReducer, useState} from "react";
import {useDispatch} from "react-redux";
import {Feather} from "@expo/vector-icons";
import {ActivityIndicator, Alert, StyleSheet} from "react-native";

import {SubmitButton} from "../buttons/SubmitButton";
import {Input} from "../input/Input";
import {validateInput} from "../../utils/actions/formActions";
import {reducer} from "../../utils/reducers/formReducer";
import {signIn} from "../../utils/actions/authActions";
import {colors} from "../../constants/colors";

const isTestMode = true;

const initialState = {
  inputValues: {
    email: isTestMode ? "rvakazov@gmail.com" : "",
    password: isTestMode ? "123456" : "",
  },
  inputValidities: {
    email: false,
    password: false,
  },
  formIsValid: isTestMode,
}

export const SignInForm = (props) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const {inputValidities: {email, password}} = formState;

  const inputChangeHandler = useCallback((inputId, inputValue) => {
    const validationResult = validateInput(inputId, inputValue);
    dispatchFormState({inputId, validationResult, inputValue});
  }, [dispatchFormState])

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred", error);
      setError("");
    }
  }, [error])

  const authHandler = useCallback(async () => {
    const {email, password} = formState.inputValues
    try {
      setIsLoading(true);
      const action = signIn(email, password);
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
        label="Email"
        icon="mail"
        id="email"
        iconPack={Feather}
        autoCapitalize="none"
        keyboardType="email-address"
        onInputChanged={inputChangeHandler}
        value={formState.inputValues.email}
        errorText={email}
      />
      <Input
        label="Password"
        id="password"
        icon="lock"
        iconPack={Feather}
        secureTextEntry
        autoCapitalize="none"
        onInputChanged={inputChangeHandler}
        value={formState.inputValues.password}
        errorText={password}
      />
      {
        isLoading
          ? <ActivityIndicator size="small" color={colors.primary} style={styles.loading}/>
          : <SubmitButton
            onPress={authHandler}
            disabled={!formState.formIsValid}
            style={{marginTop: 20}}
          >Sign in</SubmitButton>
      }
    </>
  )
}

const styles = StyleSheet.create({
  loading: {
    marginTop: 10,
  }
})
