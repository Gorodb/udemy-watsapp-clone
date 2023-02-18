import {useState} from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

import {PageContainer} from "../components/page-container/PageContainer";
import {SignInForm, SignUpForm} from "../components/signInUpForms";
import logo from "../assets/images/logo.png";
import {colors} from "../constants/colors";

export const AuthScreen = props => {
  const [isSignUp, setIsSignUp] = useState(false);
  const behavior = Platform.OS === 'ios' ? "height" : undefined;

  return (
    <SafeAreaView style={styles.container}>
      <PageContainer>
        <ScrollView>
          <KeyboardAvoidingView
            behavior={behavior}
            style={styles.keyboardAvoidingView}
            keyboardVerticalOffset={160}
          >
            <View style={styles.imageContainer}>
              <Image source={logo} style={styles.image}/>
            </View>
            {isSignUp ? <SignUpForm/> : <SignInForm/>}
            <TouchableOpacity onPress={() => setIsSignUp(prevState => !prevState)} style={styles.textContainer}>
              <Text style={styles.text}>Switch to {!isSignUp ? "sign up" : "sign in"}</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </PageContainer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "50%",
    resizeMode: "contain"
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
  },
  textContainer: {
    marginTop: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.link
  }
})