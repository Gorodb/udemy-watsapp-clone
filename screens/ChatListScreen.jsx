import {Button, StyleSheet, Text, View} from "react-native";

export const ChatListScreen = props => {
  return (
    <View style={styles.container}>
      <Text>Chat list screen</Text>
      <Button title={"Chat"} onPress={() => props.navigation.navigate("ChatScreen")} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})