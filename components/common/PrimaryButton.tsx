import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { moderateScale } from '@/utils/metrices';

type ButtonProps = {
  isOutlined?: Boolean;
  text: String;
  onPress?: () => any;
  style?: ViewStyle;
  textStyle?: TextStyle;
  renderIcon?: () => React.ReactNode;
};

const PrimaryButton = ({
  isOutlined,
  text,
  onPress,
  style,
  textStyle,
  renderIcon,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[isOutlined ? styles.container : styles.outlineContainer, style]}
    >
      <View style={styles.innerContainer}>
        <Text
          style={[
            styles.text,
            textStyle,
            isOutlined ? { color: Colors.white } : { color: '#0F172A' },
          ]}
        >
          {text || 'Button'}
        </Text>
        {renderIcon && renderIcon()}
      </View>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 53,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  outlineContainer: {
    width: '100%',
    height: 53,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: moderateScale(12),
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins-Bold',
  },
});
