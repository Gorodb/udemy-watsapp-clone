import {StyleSheet, Text, TextInput, View} from "react-native";

import {colors} from "../../constants/colors";
import {FontAwesome} from "@expo/vector-icons";

export const Input = (props) => {
  const {icon, label, iconSize = 15, errorText, onInputChanged, id = "", ...overProps} = props;

  const onChangeText = text => {
    onInputChanged(id, text)
  }

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        {icon && <props.iconPack name={icon} size={iconSize} style={styles.icon}/>}
        <TextInput {...overProps} style={styles.input} onChangeText={onChangeText} />
      </View>
      {errorText && <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorText}</Text>
      </View>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: colors.errorText,
    fontSize: 13,
    fontFamily: "regular",
    letterSpacing: 0.3,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 2,
    backgroundColor: colors.nearlyWhite,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    color: colors.grey,
  },
  label: {
    marginVertical: 8,
    fontFamily: "bold",
    letterSpacing: 0.3,
    color: colors.textColor
  },
  input: {
    color: colors.textColor,
    flex: 1,
    fontFamily: "regular",
    letterSpacing: 0.3,
    paddingTop: 0,
  }
})
