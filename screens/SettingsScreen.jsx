import {useCallback, useReducer, useState} from "react";
import {ActivityIndicator, StyleSheet} from "react-native";
import {Feather, FontAwesome} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";

import {PageTitle} from "../components/page-title/PageTitle";
import {Input} from "../components/input/Input";
import {PageContainer} from "../components/page-container/PageContainer";
import {validateInput} from "../utils/actions/formActions";
import {reducer} from "../utils/reducers/formReducer";
import {colors} from "../constants/colors";
import {SubmitButton} from "../components/buttons/SubmitButton";
import {updateSignedInUserData, userLogout} from "../utils/actions/authActions";

export const SettingsScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);
  const initialState = {
    inputValues: {
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      email: userData.email || "",
      about: userData.about || "",
    },
    inputValidities: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      about: undefined,
    },
    formIsValid: false,
  }

  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const {inputValidities: {firstName, lastName, email, about}} = formState;

  const inputChangeHandler = useCallback((inputId, inputValue) => {
    const validationResult = validateInput(inputId, inputValue);
    dispatchFormState({inputId, validationResult, inputValue});
  }, [dispatchFormState]);

  const saveHandler = async () => {
    const { inputValues } = formState;
    try {
      setIsLoading(true);
      await updateSignedInUserData(userData.uid, inputValues)
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PageContainer style={styles.container}>
      <PageTitle text="Settings screen"/>

      <Input
        initialValue={userData.firstName}
        label="First name"
        id="firstName"
        icon="user-o"
        iconPack={FontAwesome}
        onInputChanged={inputChangeHandler}
        errorText={firstName}
      />
      <Input
        initialValue={userData.lastName}
        label="Last name"
        id="lastName"
        icon="user-o"
        iconPack={FontAwesome}
        onInputChanged={inputChangeHandler}
        errorText={lastName}
      />
      <Input
        initialValue={userData.email}
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
        initialValue={userData.about}
        label="About"
        id="about"
        icon="user-o"
        iconPack={FontAwesome}
        onInputChanged={inputChangeHandler}
        errorText={about}
      />
      {
        isLoading
          ? <ActivityIndicator size="small" color={colors.primary} style={styles.loading} />
          : <SubmitButton
            onPress={saveHandler}
            disabled={!formState.formIsValid}
            style={{marginTop: 20}}
          >Save</SubmitButton>
      }
      <SubmitButton
        onPress={() => dispatch(userLogout())}
        style={{marginTop: 20}}
        color={colors.red}
      >Logout</SubmitButton>
    </PageContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})