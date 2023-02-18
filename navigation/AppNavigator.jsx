import {NavigationContainer} from "@react-navigation/native";
import {useSelector} from "react-redux";

import {MainNavigator} from "./MainNavigator";
import {AuthScreen} from "../screens/AuthScreen";
import {StartUpScreen} from "../screens/StartUpScreen";

export const AppNavigator = (props) => {
  const isAuth = useSelector(state => !!state.auth.token);
  const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);

  return (
    <NavigationContainer>
      {isAuth && <MainNavigator />}
      {!isAuth && didTryAutoLogin && <AuthScreen />}
      {!isAuth && !didTryAutoLogin && <StartUpScreen />}
    </NavigationContainer>
  )
}