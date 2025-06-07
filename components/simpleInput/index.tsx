import { Colors } from '@/constants/Colors';
import { horizontalScale, verticalScale } from '@/utils/metrices';
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextStyle,
  ViewStyle,
  TextInputProps,
} from 'react-native';

interface SimpleInputProps extends TextInputProps {
  label?: string;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorMessage?: string;
  renderLeft?: () => React.ReactNode;
  renderRight?: () => React.ReactNode;
  isPassword?: boolean;
}

const SimpleInput: React.FC<SimpleInputProps> = ({
  label,
  labelStyle,
  containerStyle,
  inputContainerStyle,
  inputStyle,
  errorMessage,
  renderLeft,
  renderRight,
  isPassword = false,
  ...textInputProps
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <View style={[styles.inputContainer, inputContainerStyle]}>
        {renderLeft && renderLeft()}
        <TextInput
          secureTextEntry={isPassword}
          style={[styles.input, inputStyle]}
          placeholderTextColor={Colors.placeholder}
          {...textInputProps}
        />
        {renderRight && renderRight()}
      </View>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    color: Colors.darkGray,
    marginBottom: 5,
    textAlign: 'left',
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: verticalScale(10),
    borderWidth: 1,
    borderColor: '#C4C4C4',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    paddingHorizontal: horizontalScale(10),
    borderRadius: 10,
    minHeight: verticalScale(47),
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    color: Colors.black,
    marginHorizontal: horizontalScale(5),
    flex: 1,
    height: '100%',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: verticalScale(5),
  },
});

export default SimpleInput;
