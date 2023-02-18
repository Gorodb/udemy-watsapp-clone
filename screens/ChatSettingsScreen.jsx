import {StyleSheet, Text, View} from "react-native";

export const ChatSettingsScreen = props => {
  return (
    <View style={styles.container}>
      <Text>Chat settings screen</Text>
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