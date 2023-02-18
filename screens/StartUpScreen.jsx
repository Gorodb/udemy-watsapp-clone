import {useEffect} from "react";
import {ActivityIndicator, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch} from "react-redux";

import {colors} from "../constants/colors";
import {commonStyles} from "../constants/commonStyles";
import {authenticate, setDidTryAutoLogin} from "../store/slices/authSlice";
import {getUserData} from "../utils/actions/userActions";

export const StartUpScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem("userData").then(async (storedAuthInfo) => {
      if (!storedAuthInfo) {
        dispatch(setDidTryAutoLogin());
        return;
      }

      const {token, uid, expiryDate: expiryDateString} = JSON.parse(storedAuthInfo);
      const expiryDate = new Date(expiryDateString);
      if (expiryDate < new Date() || !token || !uid) {
        dispatch(setDidTryAutoLogin());
        return;
      }

      const userData = await getUserData(uid)
      dispatch(authenticate({token, userData}))
    })
  }, [dispatch])

  return (
    <View style={commonStyles.center}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  )
}
