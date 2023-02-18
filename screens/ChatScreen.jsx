import {ImageBackground, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, View, Platform} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Feather} from '@expo/vector-icons';

import backgroundImage from "../assets/images/droplet.jpeg"
import {colors} from "../constants/colors";
import {useCallback, useState} from "react";

export const ChatScreen = props => {
  const [messageText, setMessageText] = useState("");

  const sendMessage = useCallback(() => {
    setMessageText("");
  }, [messageText])

  const onTextChangeHandler = text => setMessageText(text)

  const PlusButton = () => (
    <TouchableOpacity style={styles.mediaButton} onPress={() => console.log('pressed')}>
      <Feather name="plus" size={24} color={colors.blue}/>
    </TouchableOpacity>
  )

  const CameraButton = () => (
    <TouchableOpacity style={styles.mediaButton} onPress={() => console.log('pressed')}>
      <Feather name="camera" size={24} color={colors.blue}/>
    </TouchableOpacity>
  )

  const SendButton = () => (
    <TouchableOpacity
      style={{...styles.mediaButton, ...styles.sendButton}}
      onPress={sendMessage}
    >
      <Feather name="send" size={20} color={colors.white}/>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.backgroundImage}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={100}
      >
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        </ImageBackground>
        <View style={styles.inputContainer}>
          <PlusButton/>
          <TextInput
            style={styles.textBox}
            value={messageText}
            onChangeText={onTextChangeHandler}
            onSubmitEditing={sendMessage}
          />
          {!messageText ? <CameraButton/> : <SendButton/>}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  backgroundImage: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  textBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: colors.lightGray,
    marginHorizontal: 15,
    paddingHorizontal: 12,
  },
  mediaButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 35,
  },
  sendButton: {
    backgroundColor: colors.blue,
    borderRadius: 50,
    padding: 8,
  }
})