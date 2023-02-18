import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {colors} from "../../constants/colors";

export const SubmitButton = (props) => {
  const {children, disabled, color, onPress, style = {}} = props;
  const backgroundColor = disabled
    ? colors.lightGray
    : color || colors.primary

  return (
    <TouchableOpacity style={{...styles.button, ...style, backgroundColor}} onPress={!disabled ? onPress : null}>
      <Text style={disabled ? styles.textDisabled : styles.text}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDisabled: {
    color: colors.grey,
  },
  text: {
    color: colors.white,
  },
})